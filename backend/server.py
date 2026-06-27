from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import time
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import asyncio
import feedparser
from html import unescape


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="LEGENDS UNITED API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# ------------- Simple in-memory rate limiting -------------
_rate_buckets: dict = {}

def _rate_limit(ip: str, key: str, limit: int, window_sec: int) -> bool:
    """Returns True if allowed, False if rate-limited."""
    now = time.time()
    bucket_key = f"{key}:{ip}"
    history = _rate_buckets.get(bucket_key, [])
    # purge old entries
    history = [t for t in history if now - t < window_sec]
    if len(history) >= limit:
        _rate_buckets[bucket_key] = history
        return False
    history.append(now)
    _rate_buckets[bucket_key] = history
    return True

def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ------------- Models -------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=10, max_length=4000)
    # honeypot field - bots fill it
    company: Optional[str] = Field(default=None, max_length=120)

    @field_validator("name", "subject")
    @classmethod
    def strip_text(cls, v: str) -> str:
        return v.strip()

    @field_validator("message")
    @classmethod
    def strip_message(cls, v: str) -> str:
        return v.strip()


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    ip: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"   # new | read | replied


class NewsArticle(BaseModel):
    id: str
    title: str
    summary: str
    link: str
    source: str
    published: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None


# ------------- Routes -------------
@api_router.get("/")
async def root():
    return {"message": "LEGENDS UNITED API — Building the Future Through Technology."}


@api_router.get("/health")
async def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in status_checks:
        if isinstance(c.get('timestamp'), str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return status_checks


# -------- Contact form --------
@api_router.post("/contact")
async def create_contact_message(payload: ContactMessageCreate, request: Request):
    ip = _client_ip(request)

    # Honeypot trap
    if payload.company and payload.company.strip():
        # silently pretend success
        return {"success": True, "message": "Thanks — we'll be in touch."}

    # Rate limit: max 5 submissions per IP per 10 minutes
    if not _rate_limit(ip, "contact", limit=5, window_sec=600):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")

    msg = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        ip=ip,
        user_agent=request.headers.get("user-agent"),
    )
    doc = msg.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_messages.insert_one(doc)

    # Email-notification hook (future): send via Resend/SendGrid/SMTP here
    logger.info(f"New contact message from {msg.email} — subject: {msg.subject}")

    return {"success": True, "id": msg.id, "message": "Message received. We'll get back to you soon."}


# -------- Cyber News --------
NEWS_FEEDS = [
    ("The Hacker News", "https://feeds.feedburner.com/TheHackersNews", "Threat Intel"),
    ("Krebs on Security", "https://krebsonsecurity.com/feed/", "Investigation"),
    ("BleepingComputer", "https://www.bleepingcomputer.com/feed/", "News"),
    ("Dark Reading", "https://www.darkreading.com/rss.xml", "Enterprise"),
    ("Schneier on Security", "https://www.schneier.com/feed/atom/", "Analysis"),
]

# Curated ethical hacking spotlight pieces (editorial layer)
ETHICAL_HACKING_SPOTLIGHT = [
    {
        "id": "eh-1",
        "title": "Inside a Bug Bounty: How Hackers Earned $250,000 Reporting a Single Flaw",
        "summary": "A deep look at responsible disclosure programs and the real-world impact ethical hackers have on global security infrastructure.",
        "link": "https://www.hackerone.com/top-hackers",
        "source": "Spotlight",
        "category": "Ethical Hacking",
        "published": None,
        "image": None,
    },
    {
        "id": "eh-2",
        "title": "From Script Kiddie to Red Teamer: A Modern Roadmap",
        "summary": "What it actually takes today to move from CTF challenges into professional offensive security — tools, certifications, and mindset.",
        "link": "https://www.offsec.com/courses/pen-200/",
        "source": "Spotlight",
        "category": "Career",
        "published": None,
        "image": None,
    },
    {
        "id": "eh-3",
        "title": "The Possibilities of AI-Powered Penetration Testing",
        "summary": "Large language models are starting to reshape recon, payload crafting, and vulnerability triage. Where it helps — and where it breaks.",
        "link": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        "source": "Spotlight",
        "category": "AI Security",
        "published": None,
        "image": None,
    },
]

_TAG_RE = re.compile(r"<[^>]+>")

def _clean_html(text: str, max_len: int = 280) -> str:
    if not text:
        return ""
    cleaned = unescape(_TAG_RE.sub("", text)).strip()
    cleaned = re.sub(r"\s+", " ", cleaned)
    if len(cleaned) > max_len:
        cleaned = cleaned[: max_len - 1].rstrip() + "…"
    return cleaned

# very small in-memory cache to avoid hammering RSS
_news_cache = {"ts": 0, "data": []}
_NEWS_CACHE_TTL = 600  # 10 min

def _fetch_feeds_sync(limit_per_feed: int = 6) -> List[dict]:
    items: List[dict] = []
    for source_name, url, category in NEWS_FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:limit_per_feed]:
                article = {
                    "id": getattr(entry, "id", entry.get("link", "")) or str(uuid.uuid4()),
                    "title": _clean_html(entry.get("title", ""), max_len=200),
                    "summary": _clean_html(entry.get("summary", entry.get("description", "")), max_len=260),
                    "link": entry.get("link", "#"),
                    "source": source_name,
                    "category": category,
                    "published": entry.get("published", entry.get("updated", None)),
                    "image": None,
                }
                items.append(article)
        except Exception as e:
            logger.warning(f"Failed to fetch feed {source_name}: {e}")
            continue
    return items


@api_router.get("/news/cyber", response_model=List[NewsArticle])
async def get_cyber_news(limit: int = 30):
    now = time.time()
    if _news_cache["data"] and now - _news_cache["ts"] < _NEWS_CACHE_TTL:
        items = _news_cache["data"]
    else:
        loop = asyncio.get_event_loop()
        try:
            items = await asyncio.wait_for(
                loop.run_in_executor(None, _fetch_feeds_sync, 6),
                timeout=12,
            )
            _news_cache["data"] = items
            _news_cache["ts"] = now
        except Exception as e:
            logger.error(f"News fetch failed: {e}")
            items = _news_cache["data"]

    # Always merge curated spotlights first
    spotlight = ETHICAL_HACKING_SPOTLIGHT
    combined = spotlight + items
    return combined[:limit]


# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

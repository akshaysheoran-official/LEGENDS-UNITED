// Tiny zero-dependency static server for Railway.
// Serves /build with SPA fallback to index.html.
// Avoids dependency conflicts with `serve` / path-to-regexp pins.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = parseInt(process.env.PORT || "3000", 10);
const BUILD_DIR = path.resolve(__dirname, "build");

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".map": "application/json; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
};

function send(res, status, body, headers = {}) {
    res.writeHead(status, headers);
    res.end(body);
}

function serveFile(res, filePath, status = 200) {
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    const cacheable = /\.(js|css|woff2?|png|jpg|jpeg|gif|webp|svg|ico)$/i.test(filePath);
    const headers = {
        "Content-Type": type,
        "Cache-Control": cacheable ? "public, max-age=31536000, immutable" : "no-cache",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
    };
    res.writeHead(status, headers);
    const stream = fs.createReadStream(filePath);
    stream.on("error", () => { try { res.end(); } catch {} });
    stream.pipe(res);
}

const server = http.createServer((req, res) => {
    try {
        const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
        // Prevent directory traversal
        const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");
        let filePath = path.join(BUILD_DIR, safePath);

        if (!filePath.startsWith(BUILD_DIR)) {
            return send(res, 403, "Forbidden");
        }

        fs.stat(filePath, (err, stats) => {
            if (!err && stats.isDirectory()) {
                filePath = path.join(filePath, "index.html");
            }
            fs.access(filePath, fs.constants.R_OK, (e) => {
                if (e) {
                    // SPA fallback: any unknown route -> index.html
                    const fallback = path.join(BUILD_DIR, "index.html");
                    return serveFile(res, fallback, 200);
                }
                serveFile(res, filePath, 200);
            });
        });
    } catch (e) {
        send(res, 500, "Internal Server Error");
    }
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`[legends-united] static server listening on 0.0.0.0:${PORT}`);
    console.log(`[legends-united] serving ${BUILD_DIR}`);
});

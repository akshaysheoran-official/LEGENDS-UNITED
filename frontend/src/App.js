import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { RootLayout } from "@/components/layout/RootLayout";

import Home from "@/pages/Home";
import About from "@/pages/About";
import DevResources from "@/pages/DevResources";
import CyberNews from "@/pages/CyberNews";
import FutureTools from "@/pages/FutureTools";
import Projects from "@/pages/Projects";
import Roadmap from "@/pages/Roadmap";
import Changelog from "@/pages/Changelog";
import JoinTeam from "@/pages/JoinTeam";
import Community from "@/pages/Community";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

function App() {
    return (
        <ThemeProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route element={<RootLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/developer-resources" element={<DevResources />} />
                            <Route path="/cyber-news" element={<CyberNews />} />
                            <Route path="/future-tools" element={<FutureTools />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/changelog" element={<Changelog />} />
                            <Route path="/join-team" element={<JoinTeam />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Toaster position="top-right" richColors closeButton />
            </div>
        </ThemeProvider>
    );
}

export default App;

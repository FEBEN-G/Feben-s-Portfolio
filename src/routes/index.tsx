import { createFileRoute } from "@tanstack/react-router";
import { Background } from "../components/portfolio/Background";
import { Nav } from "../components/portfolio/Nav";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Projects } from "../components/portfolio/Projects";
import { Experience } from "../components/portfolio/Experience";
import { Certificates } from "../components/portfolio/Certificates";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";
import { Settings } from "../components/portfolio/Settings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feben — Full Stack Developer & ML Enthusiast" },
      {
        name: "description",
        content:
          "Portfolio of Feben — a full stack developer and machine learning enthusiast crafting fast, elegant, production-ready web experiences.",
      },
      { property: "og:title", content: "Feben — Full Stack Developer & ML Enthusiast" },
      {
        property: "og:description",
        content:
          "Portfolio of Feben — a full stack developer and machine learning enthusiast crafting fast, elegant, production-ready web experiences.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh">
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <Settings />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Background } from "../components/portfolio/Background";
import { Nav } from "../components/portfolio/Nav";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Skills } from "../components/portfolio/Skills";
import { ML } from "../components/portfolio/ML";
import { Projects } from "../components/portfolio/Projects";
import { Experience } from "../components/portfolio/Experience";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";

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
          "Selected projects, experience, and an active machine-learning journey. Built with care.",
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
        <Skills />
        <ML />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

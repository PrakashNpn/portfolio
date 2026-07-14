import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Tech from "@/components/sections/Tech";
import AiWorkflow from "@/components/sections/AiWorkflow";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";
import NeuralNetwork from "@/components/canvas/NeuralNetwork";

export default function Home() {
  return (
    <>
      {/* Neural-network backdrop for the WHOLE page — fixed, behind all content.
          A dark base + faint cosmic texture + two soft glows (violet top, teal
          corner) sit under a live node/edge mesh, for a "machine intelligence" feel. */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-primary" />
      <div aria-hidden className="fixed inset-0 -z-10 bg-hero-pattern opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_0%,rgba(145,94,255,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(45%_40%_at_88%_92%,rgba(0,206,168,0.08),transparent_70%)]"
      />
      <NeuralNetwork className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />

      <div className="relative z-0">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Tech />
        <AiWorkflow />
        <Works />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

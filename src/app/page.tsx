import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ConstructionWork from "@/components/ConstructionWork";
import DesignBrochure from "@/components/DesignBrochure";
import Planning from "@/components/Planning";
import Showcase from "@/components/Showcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <ConstructionWork />
        <DesignBrochure />
        <Planning />
        <Showcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

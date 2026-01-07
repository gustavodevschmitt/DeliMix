import HeroCarousel from "@/components/home/hero-carousel";
import MenuShortcuts from "@/components/home/menu-shortcuts";
import MenuItems from "@/components/menu-items";
import AboutSection from "@/sections/about-section";

export default function Home() {
  return (
    <section>
      <HeroCarousel />
      <MenuShortcuts />
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <AboutSection />

        <MenuItems />
      </div>
    </section>
  );
}

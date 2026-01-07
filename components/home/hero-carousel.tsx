"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";

const slides = [
  { src: "/banner.png", alt: "Pizza artesanal da DeliMix" },
  { src: "/01.png", alt: "Ingredientes frescos da DeliMix" },
  { src: "/02.png", alt: "Equipe preparando pratos" },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleSelectSlide = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="relative mx-auto w-full 3xl:max-w-7xl">
      <div className="relative h-[320px] w-full overflow-hidden rounded-none md:h-[420px] lg:h-[520px] 3xl:rounded-b-xl">
        <div className="h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide) => (
              <div
                key={slide.src}
                className="relative min-w-full h-full"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  priority={slide.src === slides[0].src}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/Logo.png"
            alt="Logo DeliMix"
            height={280}
            width={280}
            priority
            className="h-36 w-36 object-contain drop-shadow-2xl sm:h-48 sm:w-48 md:h-60 md:w-60"
          />
        </div>

        <div className="absolute top-1/2 right-3 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex">
          {[FaInstagram, FaXTwitter, FaLinkedinIn, FaWhatsapp].map(
            (Icon, index) => (
              <Button
                key={index}
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/80 text-foreground shadow"
                asChild
              >
                <Link href="#" aria-label="Rede social">
                  <Icon size={18} />
                </Link>
              </Button>
            )
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Selecionar slide ${index + 1}`}
              onClick={() => handleSelectSlide(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition",
                index === currentSlide ? "bg-primary" : "bg-white/60"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;

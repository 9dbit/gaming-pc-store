"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Slide = { id: string; mobile: string; desktop: string; alt: string };

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="heroCarousel" aria-label="NEXRIG campaigns">
      <div className="heroViewport">
        {slides.map((slide, i) => (
          <article className={`heroSlide ${i === active ? "isActive" : ""}`} key={slide.id}>
            <picture>
              <source media="(min-width: 760px)" srcSet={slide.desktop} />
              <img
                src={slide.mobile}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.src !== slide.desktop) img.src = slide.desktop;
                }}
              />
            </picture>
            <Link href="/category/all" className="heroClick" aria-label="Shop NEXRIG products" />
          </article>
        ))}
      </div>
      <div className="heroDots" aria-label="Hero navigation">
        {slides.map((slide, i) => (
          <button key={slide.id} onClick={() => setActive(i)} className={i === active ? "active" : ""} aria-label={`Show banner ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

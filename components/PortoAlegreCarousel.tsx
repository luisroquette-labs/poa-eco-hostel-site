"use client";

import { useRef, useState } from "react";
import { asset } from "../app/base";
import { portoAlegrePhotos } from "../app/content";

export default function PortoAlegreCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  function show(index: number) {
    const next = Math.max(0, Math.min(portoAlegrePhotos.length - 1, index));
    trackRef.current?.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActive(next);
  }

  function syncActive() {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let closest = 0;
      let distance = Infinity;
      Array.from(track.children).forEach((child, index) => {
        const bounds = child.getBoundingClientRect();
        const nextDistance = Math.abs(bounds.left + bounds.width / 2 - center);
        if (nextDistance < distance) {
          closest = index;
          distance = nextDistance;
        }
      });
      setActive(closest);
    });
  }

  return (
    <section className="panel city-gallery" id="cidade-em-imagens">
      <div className="page-width city-gallery__shell">
        <div className="city-gallery__heading">
          <div><p className="eyebrow eyebrow--light">06 · 20 olhares sobre a cidade</p><h2>Porto Alegre, quadro a quadro.</h2></div>
          <div className="city-gallery__intro">
            <p>Deslize por ruas, parques, patrimônio e pelas luzes do Guaíba. Todas as fotografias são reais e têm autoria identificada.</p>
            <div className="city-gallery__controls">
              <span aria-live="polite"><strong>{String(active + 1).padStart(2, "0")}</strong> / {portoAlegrePhotos.length}</span>
              <button type="button" onClick={() => show(active - 1)} disabled={active === 0} aria-label="Foto anterior">←</button>
              <button type="button" onClick={() => show(active + 1)} disabled={active === portoAlegrePhotos.length - 1} aria-label="Próxima foto">→</button>
            </div>
          </div>
        </div>
        <div className="city-gallery__track" ref={trackRef} onScroll={syncActive} tabIndex={0} aria-label="Carrossel de fotografias de Porto Alegre">
          {portoAlegrePhotos.map((photo, index) => (
            <figure className={photo.portrait ? "city-gallery__card city-gallery__card--portrait" : "city-gallery__card"} key={photo.src}>
              <img src={asset(photo.src)} alt={photo.alt} loading={index < 2 ? "eager" : "lazy"} />
              <figcaption>
                <span><small>{photo.theme}</small><strong>{photo.title}</strong></span>
                <a href={photo.source} target="_blank" rel="noreferrer" aria-label={`Crédito de ${photo.title}: ${photo.author}, ${photo.license}`}>{photo.author} · {photo.license} ↗</a>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="city-gallery__hint" aria-hidden="true"><span>↔</span> Arraste para percorrer</p>
      </div>
    </section>
  );
}

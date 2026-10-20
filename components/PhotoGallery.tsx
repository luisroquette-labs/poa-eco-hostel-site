"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { asset } from "../app/base";
import { links, type GalleryCategory, type GalleryPhoto } from "../app/content";
import Arrow from "./Arrow";

const filters: Array<{ value: "todas" | GalleryCategory; label: string }> = [
  { value: "todas", label: "Todas" },
  { value: "casa", label: "A casa" },
  { value: "quartos", label: "Quartos" },
  { value: "piscina", label: "Piscina" },
  { value: "convivencia", label: "Convivência" },
  { value: "detalhes", label: "Detalhes" },
];

export default function PhotoGallery({ photos, preview = false }: { photos: GalleryPhoto[]; preview?: boolean }) {
  const [filter, setFilter] = useState<"todas" | GalleryCategory>("todas");
  const [active, setActive] = useState<number | null>(null);
  const visible = useMemo(() => {
    const filtered = filter === "todas" ? photos : photos.filter((photo) => photo.category === filter);
    return preview ? filtered.slice(0, 9) : filtered;
  }, [filter, photos, preview]);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => value === null ? null : (value + 1) % visible.length);
      if (event.key === "ArrowLeft") setActive((value) => value === null ? null : (value - 1 + visible.length) % visible.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, visible.length]);

  const move = (direction: -1 | 1) => setActive((value) => value === null ? null : (value + direction + visible.length) % visible.length);

  return (
    <>
      {!preview && (
        <div className="gallery-filters" role="group" aria-label="Filtrar fotos">
          {filters.map((item) => (
            <button key={item.value} type="button" className={filter === item.value ? "is-active" : ""} aria-pressed={filter === item.value} onClick={() => { setFilter(item.value); setActive(null); }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className={`photo-wall${preview ? " photo-wall--preview" : ""}`}>
        {visible.map((photo, index) => (
          <button className={`photo-tile photo-tile--${index % 8}`} type="button" key={photo.src} onClick={() => setActive(index)} aria-label={`Ampliar: ${photo.alt}`}>
            <img src={asset(photo.src)} alt={photo.alt} loading={index < 6 ? "eager" : "lazy"} />
            <span><strong>{String(index + 1).padStart(2, "0")}</strong>{photo.alt}</span>
          </button>
        ))}
      </div>

      {preview && (
        <div className="gallery-preview-actions">
          <Link className="button button--cream" href="/galeria">Ver as 50 fotos <Arrow /></Link>
          <a className="text-link text-link--light" href={links.directBooking} target="_blank" rel="noreferrer">Consultar datas <Arrow /></a>
        </div>
      )}

      {active !== null && visible[active] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualizador de fotos" onClick={() => setActive(null)}>
          <button className="lightbox__close" type="button" onClick={() => setActive(null)} aria-label="Fechar foto">×</button>
          <button className="lightbox__arrow lightbox__arrow--left" type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Foto anterior">←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={asset(visible[active].src)} alt={visible[active].alt} />
            <figcaption><span>{active + 1} / {visible.length}</span>{visible[active].alt}</figcaption>
          </figure>
          <button className="lightbox__arrow lightbox__arrow--right" type="button" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Próxima foto">→</button>
        </div>
      )}
    </>
  );
}

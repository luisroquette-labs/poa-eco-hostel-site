"use client";

import { useMemo, useRef, useState } from "react";
import { nearbyPlaces } from "../app/content";

const hostel = { title: "POA Eco Hostel", coordinates: [-51.2215221, -30.0394151] as const };

const routeUrl = (coordinates: readonly [number, number], walking: boolean, embed = false) => {
  const origin = `${hostel.coordinates[1]},${hostel.coordinates[0]}`;
  const destination = `${coordinates[1]},${coordinates[0]}`;
  const params = embed
    ? new URLSearchParams({ output: "embed", saddr: origin, daddr: destination, dirflg: walking ? "w" : "d" })
    : new URLSearchParams({ api: "1", origin, destination, travelmode: walking ? "walking" : "driving" });
  return `https://www.google.com/maps${embed ? "" : "/dir/"}?${params}`;
};

export default function LocationMap() {
  const [activeId, setActiveId] = useState<string>(nearbyPlaces[0].id);
  const [listAtEnd, setListAtEnd] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const activePlace = useMemo(() => nearbyPlaces.find((place) => place.id === activeId) ?? nearbyPlaces[0], [activeId]);
  const walking = activePlace.duration.includes("a pé");

  const updateScrollHint = () => {
    const list = listRef.current;
    if (list) setListAtEnd(list.scrollTop + list.clientHeight >= list.scrollHeight - 8);
  };

  const scrollPlaces = () => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({ top: listAtEnd ? 0 : list.scrollTop + list.clientHeight * 0.72, behavior: "smooth" });
  };

  return (
    <div className="location-explorer">
      <div className="location-explorer__map-wrap">
        <iframe
          key={activePlace.id}
          className="location-explorer__map"
          title={`Rota no Google Maps: ${hostel.title} até ${activePlace.title}`}
          src={routeUrl(activePlace.coordinates, walking, true)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="location-explorer__active" aria-live="polite">
          <span>{activePlace.category}</span>
          <strong>{activePlace.title}</strong>
          <small>{activePlace.distance} · {activePlace.duration}</small>
          <a href={routeUrl(activePlace.coordinates, walking)} target="_blank" rel="noreferrer">Abrir rota <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div className="location-explorer__rail" aria-label="Lugares próximos ao POA Eco Hostel">
        <div className="location-explorer__rail-head">
          <span>Explore Porto Alegre</span>
          <strong>12 lugares para começar</strong>
        </div>
        <ol ref={listRef} onScroll={updateScrollHint}>
          {nearbyPlaces.map((place, index) => (
            <li key={place.id}>
              <button className={place.id === activeId ? "is-active" : ""} type="button" onClick={() => setActiveId(place.id)}>
                <span className="location-card__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="location-card__copy"><small>{place.category}</small><strong>{place.title}</strong><em>{place.distance} · {place.duration}</em></span>
                <span className="location-card__arrow" aria-hidden="true">↗</span>
              </button>
            </li>
          ))}
        </ol>
        <button
          className={`location-scroll-hint${listAtEnd ? " is-up" : ""}`}
          type="button"
          aria-label={listAtEnd ? "Voltar ao início da lista de lugares" : "Rolar para ver mais lugares"}
          onClick={scrollPlaces}
        >
          <svg viewBox="0 0 24 48" aria-hidden="true">
            <path d="m7 9 5-5 5 5M7 39l5 5 5-5" />
            <rect x="9" y="14" width="6" height="20" rx="3" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

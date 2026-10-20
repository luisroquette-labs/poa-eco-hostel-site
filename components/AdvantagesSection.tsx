import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "../app/base";
import { advantages, amenities, bookingProof, links } from "../app/content";
import Arrow from "./Arrow";

function AmenityIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    wifi: <><path d="M3 9a14 14 0 0 1 18 0" /><path d="M6.5 12.5a9 9 0 0 1 11 0" /><path d="M10 16a4 4 0 0 1 4 0" /><circle cx="12" cy="19" r="1" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    car: <><path d="m4 15 1.5-6h13l1.5 6" /><path d="M3 15h18v4H3z" /><path d="M6 19v2M18 19v2" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20c0-4 2-6 5.5-6s5.5 2 5.5 6" /><path d="M14 15c3.8-.8 6.5 1.2 6.5 5" /></>,
    chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function AdvantagesSection() {
  return (
    <>
      <section className="panel advantages-panel" id="vantagens">
        <div className="page-width advantages-layout advantages-layout--proof">
          <div className="advantages-heading">
            <div>
              <p className="eyebrow">01 · Por que ficar aqui</p>
              <h2>Mais que uma cama. Uma casa para viver Porto Alegre.</h2>
            </div>
            <div className="advantages-heading__copy">
              <p>Piscina, cozinha, jardim e espaços compartilhados no bairro mais vivo da cidade — com a experiência confirmada por quem já se hospedou.</p>
              <div className="inline-actions">
                <a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Consultar datas <Arrow /></a>
                <Link className="text-link" href="/galeria">Ver a casa real <Arrow /></Link>
              </div>
            </div>
          </div>

          <div className="booking-proof" aria-label={`Avaliação no Booking.com: ${bookingProof.overall} de 10, ${bookingProof.label}, baseada em ${bookingProof.reviewCount}`}>
            <a className="booking-proof__summary" href={links.booking} target="_blank" rel="noreferrer">
              <span className="booking-proof__score">{bookingProof.overall}</span>
              <span><strong>{bookingProof.label}</strong><small>{bookingProof.reviewCount}</small></span>
            </a>
            <div className="booking-proof__scores">
              {bookingProof.scores.slice(0, 4).map((score) => <div key={score.label}><span>{score.label}</span><strong>{score.value}</strong></div>)}
            </div>
            <small className="booking-proof__source"><span className="booking-wordmark booking-wordmark--small">Booking<span>.com</span></span><br />consultado em {bookingProof.checkedAt}</small>
          </div>
        </div>
      </section>

      <section className="panel advantages-details-panel" id="estrutura" aria-labelledby="advantages-details-title">
        <div className="page-width advantages-details-layout">
          <div className="advantages-details__heading">
            <div>
              <p className="eyebrow">01 · Estrutura e comodidades</p>
              <h2 id="advantages-details-title">A casa trabalha a favor da sua viagem.</h2>
            </div>
            <p>Espaços para descansar, cozinhar, conhecer gente e aproveitar os dias sem sair de casa.</p>
          </div>

          <div className="advantages-bento">
            {advantages.map((advantage, index) => (
              <article className={`advantage-photo advantage-photo--${index + 1}`} key={advantage.title}>
                <img src={asset(advantage.image)} alt={advantage.alt} loading="lazy" />
                <div><span>0{index + 1}</span><h3>{advantage.title}</h3><p>{advantage.description}</p></div>
              </article>
            ))}
            <div className="amenity-grid">
              {amenities.map((amenity) => (
                <article key={amenity.title}>
                  <AmenityIcon name={amenity.icon} />
                  <div><h3>{amenity.title}</h3><p>{amenity.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { bookingProof, bookingReviewHighlights, links } from "../app/content";
import Arrow from "./Arrow";

const scoreNumber = (score: string) => Number(score.replace(",", "."));
const displayScore = (score: string, progress: number) => (scoreNumber(score) * progress).toFixed(1).replace(".", ",");

function BookingWordmark() {
  return <span className="booking-wordmark" aria-label="Booking.com">Booking<span>.com</span></span>;
}

export default function BookingSocialProof() {
  const ratingsRef = useRef<HTMLElement>(null);
  const [scoreProgress, setScoreProgress] = useState(0);

  useEffect(() => {
    const section = ratingsRef.current;
    if (!section) return;

    let frame = 0;
    const duration = 1300;
    const animate = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setScoreProgress(1);
        return;
      }

      const startedAt = performance.now();
      const tick = (now: number) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        setScoreProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animate();
    }, { threshold: 0.35 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section className="panel booking-ratings-panel" id="avaliacoes" ref={ratingsRef}>
        <div className="page-width booking-ratings-layout">
          <div className="booking-ratings__heading">
            <div>
              <p className="eyebrow">02 · Avaliações verificadas</p>
              <h2>Quem fica, conta.</h2>
            </div>
            <div className="booking-ratings__intro">
              <BookingWordmark />
              <p>Notas publicadas por hóspedes após a estadia. Os números abaixo foram conferidos diretamente na página do POA Eco Hostel.</p>
              <a className="text-link" href={links.bookingReviews} target="_blank" rel="noreferrer">Conferir todas no Booking.com <Arrow /></a>
            </div>
          </div>

          <div className="booking-ratings__board">
            <a className="booking-ratings__overall" href={links.bookingReviews} target="_blank" rel="noreferrer" aria-label={`${bookingProof.overall} de 10 no Booking.com, com ${bookingProof.reviewCount}`}>
              <span className="booking-ratings__number" aria-hidden="true">{displayScore(bookingProof.overall, scoreProgress)}</span>
              <span><strong>{bookingProof.label}</strong><small>{bookingProof.reviewCount}</small></span>
              <em>Ver avaliações ↗</em>
            </a>
            <div className="booking-ratings__scores" aria-label="Notas por categoria no Booking.com">
              {bookingProof.scores.map((score) => (
                <div className="booking-rating" key={score.label} aria-label={`${score.label}: ${score.value}`}>
                  <span><strong>{score.label}</strong><b aria-hidden="true">{displayScore(score.value, scoreProgress)}</b></span>
                  <i aria-hidden="true"><span style={{ width: `${scoreNumber(score.value) * scoreProgress * 10}%` }} /></i>
                </div>
              ))}
            </div>
            <div className="booking-ratings__couples">
              <span>Viagens a dois</span>
              <strong aria-label={bookingProof.couplesLocation}>{displayScore(bookingProof.couplesLocation, scoreProgress)}</strong>
              <p>Nota dada por casais à localização.</p>
            </div>
          </div>
          <p className="booking-ratings__date">Fonte: Booking.com · consulta em {bookingProof.checkedAt}. As notas podem mudar com novas avaliações.</p>
        </div>
      </section>

      <section className="panel review-voices-panel" id="depoimentos">
        <div className="page-width review-voices__heading">
          <div><p className="eyebrow eyebrow--light">03 · A voz de quem já ficou</p><h2>{bookingProof.reviewCount}. Muitas histórias.</h2></div>
          <div><p>Estes são resumos fiéis dos dez relatos destacados publicamente pelo Booking.com. Passe o cursor para pausar.</p><a className="button button--cream" href={links.bookingReviews} target="_blank" rel="noreferrer">Ler as {bookingProof.reviewCount} <Arrow /></a></div>
        </div>
        <div className="review-marquee" aria-label="Destaques de avaliações publicadas no Booking.com">
          <div className="review-marquee__track">
            {[0, 1].map((copy) => (
              <div className="review-marquee__group" aria-hidden={copy === 1 ? "true" : undefined} key={copy}>
                {bookingReviewHighlights.map((review, index) => (
                  <article className="review-card" key={`${copy}-${review.name}`}>
                    <header><span>{review.name.slice(0, 1)}</span><div><strong>{review.name}</strong><small>🇧🇷 {review.country}</small></div><b>{String(index + 1).padStart(2, "0")}</b></header>
                    <p>{review.summary}</p>
                    <footer><span>{review.theme}</span><small>Síntese da avaliação</small></footer>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="page-width review-voices__footer"><BookingWordmark /><span>Avaliações verificadas de hóspedes reais</span><a href={links.bookingReviews} target="_blank" rel="noreferrer">Ver fonte ↗</a></div>
      </section>
    </>
  );
}

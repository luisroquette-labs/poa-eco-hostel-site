import type { Metadata } from "next";
import { asset } from "../base";
import { links } from "../content";
import Arrow from "../../components/Arrow";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = { title: "Social" };

const gallery = [
  ["/assets/common-area.jpg", "Área de convivência do hostel"],
  ["/assets/pool-garden.jpg", "Jardim e piscina do hostel"],
  ["/assets/room-shared.jpg", "Quarto compartilhado do hostel"],
  ["/assets/room-private.jpg", "Quarto privativo do hostel"],
];

export default function SocialPage() {
  return (
    <main className="panel-page">
      <section className="panel route-hero social-hero">
        <SiteHeader />
        <div className="page-width social-intro"><p className="eyebrow">POA Eco Hostel · Social</p><h1>A casa é feita de <em>encontros.</em></h1><p>Veja os espaços reais do hostel e acompanhe a rotina da casa no perfil oficial.</p><a className="button button--dark" href={links.instagram} target="_blank" rel="noreferrer">Abrir Instagram <Arrow /></a></div>
      </section>

      <section className="panel gallery-panel">
        <div className="page-width gallery-grid">
          {gallery.map(([src, alt], index) => <figure key={src} className={`gallery-item gallery-item--${index + 1}`}><img src={asset(src)} alt={alt} loading="lazy" /><figcaption>{String(index + 1).padStart(2, "0")} · {alt}</figcaption></figure>)}
        </div>
      </section>

      <section className="panel booking-panel">
        <div className="page-width booking-layout"><div><p className="eyebrow">02 · Fale com a casa</p><h2>Uma dúvida antes de reservar?</h2><p>A equipe atende pelo WhatsApp e ajuda você a escolher a acomodação.</p></div><div className="booking-actions"><a className="button button--dark" href={links.whatsapp} target="_blank" rel="noreferrer">Conversar no WhatsApp <Arrow /></a><a className="button button--outline" href={links.directBooking} target="_blank" rel="noreferrer">Consultar disponibilidade <Arrow /></a></div></div>
        <SiteFooter />
      </section>
    </main>
  );
}

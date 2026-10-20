import type { Metadata } from "next";
import { asset } from "../base";
import { links, rooms, stayFacts } from "../content";
import Arrow from "../../components/Arrow";
import RoomCard from "../../components/RoomCard";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = { title: "Hospedagem" };

export default function HospedagemPage() {
  return (
    <main className="panel-page">
      <section className="panel route-hero route-hero--rooms">
        <SiteHeader />
        <div className="page-width route-hero__layout">
          <div className="copy-block">
            <p className="eyebrow">POA Eco Hostel · Hospedagem</p>
            <h1>Seu lugar na <em>Cidade Baixa.</em></h1>
            <p>Um quarto só seu ou uma cama para fazer novas conexões. Escolha seu jeito de ficar na nossa casa.</p>
            <a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Consultar disponibilidade <Arrow /></a>
          </div>
          <div className="photo-frame route-hero__photo"><img src={asset("/assets/room-private.jpg")} alt="Quarto privativo do POA Eco Hostel" /></div>
        </div>
      </section>

      <section className="panel catalog-panel">
        <div className="page-width panel-stack">
          <div className="section-heading"><div><p className="eyebrow">01 · Privativos</p><h2>Privacidade sem perder a casa.</h2></div></div>
          <div className="room-grid room-grid--two">
            {rooms.slice(0, 2).map((room) => <RoomCard key={room.title} room={room} href={links.directBooking} />)}
          </div>
        </div>
      </section>

      <section className="panel catalog-panel catalog-panel--warm">
        <div className="page-width panel-stack">
          <div className="section-heading"><div><p className="eyebrow">02 · Mais opções</p><h2>Da suíte à cama compartilhada.</h2></div></div>
          <div className="room-grid room-grid--two">
            {rooms.slice(2).map((room) => <RoomCard key={room.title} room={room} href={links.directBooking} />)}
          </div>
        </div>
      </section>

      <section className="panel stay-info-panel">
        <div className="page-width stay-info-layout">
          <div className="copy-block">
            <p className="eyebrow">03 · Antes de chegar</p>
            <h2>Sem surpresa na sua estadia.</h2>
            <p>Os horários e regras essenciais para você planejar a viagem. Condições de cancelamento e pré-pagamento variam conforme a acomodação escolhida.</p>
            <a className="text-link" href={links.booking} target="_blank" rel="noreferrer">Conferir políticas no Booking.com <Arrow /></a>
          </div>
          <dl className="stay-facts">
            {stayFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="panel booking-panel">
        <div className="page-width booking-layout">
          <div><p className="eyebrow">04 · Datas e valores</p><h2>Veja o que está disponível para a sua viagem.</h2><p>Preços e disponibilidade são informados em tempo real pelo canal de reservas.</p></div>
          <div className="booking-actions"><a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Abrir reservas <Arrow /></a><a className="button button--outline" href={links.whatsapp} target="_blank" rel="noreferrer">Tirar uma dúvida <Arrow /></a></div>
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}

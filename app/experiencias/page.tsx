import type { Metadata } from "next";
import { asset } from "../base";
import { links } from "../content";
import Arrow from "../../components/Arrow";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = { title: "Experiências" };

const places = [
  ["Cidade Baixa", "Bares, restaurantes, música e a vida noturna do bairro onde a casa está."],
  ["Parque da Redenção", "Um dos encontros clássicos de Porto Alegre para caminhar, descansar e tomar chimarrão."],
  ["Centro e Guaíba", "Mercado Público, arquitetura histórica, cultura e o pôr do sol às margens do Guaíba."],
];

export default function ExperienciasPage() {
  return (
    <main className="panel-page">
      <section className="panel route-hero route-hero--experience">
        <SiteHeader />
        <div className="page-width route-hero__layout">
          <div className="copy-block"><p className="eyebrow">POA Eco Hostel · Guia local</p><h1>Viva Porto Alegre <em>como ponto de partida.</em></h1><p>A casa fica na Cidade Baixa, perto de cultura, parques, gastronomia e da energia que movimenta a cidade.</p><a className="button button--dark" href={links.whatsapp} target="_blank" rel="noreferrer">Pedir uma dica à equipe <Arrow /></a></div>
          <div className="photo-frame route-hero__photo"><img src={asset("/assets/hero-house.jpg")} alt="Fachada do POA Eco Hostel" /></div>
        </div>
      </section>

      <section className="panel places-panel">
        <div className="page-width panel-stack">
          <div className="section-heading"><div><p className="eyebrow">01 · No entorno</p><h2>Três jeitos de começar.</h2></div></div>
          <div className="place-grid">{places.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="panel local-panel">
        <div className="page-width split-layout split-layout--reverse">
          <div className="photo-frame photo-frame--wide"><img src={asset("/assets/pool-garden.jpg")} alt="Jardim do POA Eco Hostel" loading="lazy" /></div>
          <div className="copy-block"><p className="eyebrow">02 · Entre um passeio e outro</p><h2>Volte para o jardim.</h2><p>A piscina e as áreas de convivência fazem da casa uma pausa tranquila entre os planos na cidade.</p><a className="text-link" href={links.directBooking} target="_blank" rel="noreferrer">Planejar minha estadia <Arrow /></a></div>
        </div>
      </section>

      <section className="panel booking-panel">
        <div className="page-width booking-layout"><div><p className="eyebrow">03 · Próxima parada</p><h2>Seu lugar na Cidade Baixa começa aqui.</h2><p>Escolha a acomodação e consulte as datas no canal direto.</p></div><div className="booking-actions"><a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Consultar datas <Arrow /></a></div></div>
        <SiteFooter />
      </section>
    </main>
  );
}

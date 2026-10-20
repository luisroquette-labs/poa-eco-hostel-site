import Link from "next/link";
import { asset } from "./base";
import { galleryPhotos, links, rooms } from "./content";
import Arrow from "../components/Arrow";
import RoomCard from "../components/RoomCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import HostelModel3D from "../components/HostelModel3D";
import LocationMap from "../components/LocationMap";
import PhotoGallery from "../components/PhotoGallery";
import AdvantagesSection from "../components/AdvantagesSection";
import PortoAlegreStory from "../components/PortoAlegreStory";
import PortoAlegreCarousel from "../components/PortoAlegreCarousel";
import BookingSocialProof from "../components/BookingSocialProof";

export default function Home() {
  return (
    <main className="panel-page">
      <section className="panel hero hero--pastel" id="inicio">
        <SiteHeader keelway />
        <div className="hero-model-layout">
          <div className="keelway-hero__content">
            <h1><span>O seu local para curtir</span><span>A Cidade Baixa</span></h1>
            <p>Quartos privados e compartilhados, jardim, piscina e espaços de convivência — tudo em um só lugar para viver Porto Alegre.</p>
            <div className="hero-actions">
              <a className="keelway-cta" href={links.directBooking} target="_blank" rel="noreferrer">Consultar disponibilidade</a>
              <Link className="hero-gallery-link" href="/galeria">Ver 50 fotos reais <Arrow /></Link>
            </div>
          </div>
          <div className="hero-model" id="maquete">
            <div className="hero-model__label"><span>Maquete 3D</span> interativa</div>
            <p className="hero-model__note">Recriação aproximada, sem escala métrica.</p>
            <HostelModel3D />
          </div>
        </div>
      </section>

      <section className="panel gallery-showcase" id="galeria">
        <div className="page-width gallery-showcase__layout">
          <div className="gallery-showcase__heading">
            <div><p className="eyebrow eyebrow--light">50 fotos reais · A casa por inteiro</p><h2>A casa não cabe em uma foto.</h2></div>
            <p>Abra, percorra e veja os ambientes como eles são — da fachada aos quartos, do jardim à piscina.</p>
          </div>
          <PhotoGallery photos={galleryPhotos} preview />
        </div>
      </section>

      <AdvantagesSection />

      <BookingSocialProof />

      <section className="panel location-panel" id="localizacao">
        <div className="page-width location-layout">
          <div className="location-heading">
            <div>
              <p className="eyebrow">04 · 12 lugares para explorar</p>
              <h2>Porto Alegre começa aqui.</h2>
            </div>
            <div className="location-heading__copy">
              <p>Explore o mapa real, compare distâncias e descubra cultura, parques, a Orla e os dois grandes estádios da cidade.</p>
              <address>Rua Luiz Afonso, 276 · Cidade Baixa</address>
              <div className="inline-actions">
                <a className="button button--dark" href={links.maps} target="_blank" rel="noreferrer">Abrir no Google Maps <Arrow /></a>
                <a className="text-link" href={links.directBooking} target="_blank" rel="noreferrer">Reservar perto de tudo <Arrow /></a>
              </div>
            </div>
          </div>
          <LocationMap />
        </div>
      </section>

      <PortoAlegreStory />

      <PortoAlegreCarousel />

      <section className="panel story-panel" id="casa">
        <div className="page-width split-layout">
          <div className="photo-frame photo-frame--tall">
            <img src={asset("/assets/pool-garden.jpg")} alt="Jardim e piscina do POA Eco Hostel" loading="lazy" />
            <span>Jardim + piscina</span>
          </div>
          <div className="copy-block">
            <p className="eyebrow">07 · A casa</p>
            <h2>Uma pausa verde no meio da cidade.</h2>
            <p>Uma casa histórica com áreas de convivência, jardim e piscina — base para explorar a Cidade Baixa e voltar para um lugar que convida à conversa.</p>
            <div className="inline-actions"><a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Consultar datas <Arrow /></a><Link className="text-link" href="/experiencias">Conhecer a região <Arrow /></Link></div>
          </div>
        </div>
      </section>

      <section className="panel rooms-panel" id="hospedagem">
        <div className="page-width panel-stack">
          <div className="section-heading">
            <div><p className="eyebrow">08 · Hospedagem</p><h2>Seu jeito de ficar.</h2></div>
            <Link className="text-link" href="/hospedagem">Ver todos os quartos <Arrow /></Link>
          </div>
          <div className="room-grid room-grid--three">
            {rooms.slice(0, 3).map((room) => <RoomCard key={room.title} room={room} href={links.directBooking} />)}
          </div>
        </div>
      </section>

      <section className="panel community-panel" id="convivencia">
        <img className="panel-bg" src={asset("/assets/common-area.jpg")} alt="Área comum do POA Eco Hostel" loading="lazy" />
        <div className="panel-bg-shade" />
        <div className="page-width community-copy">
          <p className="eyebrow eyebrow--light">09 · Convivência</p>
          <h2>Chegue por Porto Alegre. Fique pelas conexões.</h2>
          <p>A experiência combina privacidade quando você precisa e espaços coletivos quando quer trocar histórias, dicas e planos.</p>
          <div className="inline-actions"><a className="button button--cream" href={links.directBooking} target="_blank" rel="noreferrer">Reservar minha estadia <Arrow /></a><Link className="text-link text-link--light" href="/social">Ver a vida na casa <Arrow /></Link></div>
        </div>
      </section>

      <section className="panel booking-panel" id="reservas">
        <div className="page-width booking-layout">
          <div>
            <p className="eyebrow">10 · Sua estadia</p>
            <h2>A Cidade Baixa está te esperando.</h2>
            <p>Consulte datas e acomodações no canal direto. Se preferir conversar antes, fale com a equipe pelo WhatsApp.</p>
          </div>
          <div className="booking-actions">
            <a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Reservar direto <Arrow /></a>
            <a className="button button--outline" href={links.whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
            <a className="quiet-link" href={links.booking} target="_blank" rel="noreferrer">Ou reservar pelo Booking.com</a>
          </div>
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}

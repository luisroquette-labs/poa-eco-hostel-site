import type { Metadata } from "next";
import { asset } from "../base";
import { galleryPhotos, links } from "../content";
import Arrow from "../../components/Arrow";
import PhotoGallery from "../../components/PhotoGallery";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Galeria de fotos",
  description: "Veja 50 fotos reais dos quartos, piscina, jardim e áreas de convivência do POA Eco Hostel.",
};

export default function GaleriaPage() {
  return (
    <main className="panel-page gallery-page">
      <section className="panel gallery-hero">
        <SiteHeader />
        <div className="page-width gallery-hero__copy">
          <p className="eyebrow">50 fotos reais · sem banco de imagens</p>
          <h1>Veja a casa<br /><em>antes de chegar.</em></h1>
          <p>Quartos, jardim, piscina, encontros e detalhes de uma casa que tem personalidade própria.</p>
          <a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Consultar disponibilidade <Arrow /></a>
        </div>
        <div className="gallery-hero__rail" aria-hidden="true">
          {galleryPhotos.slice(0, 8).map((photo) => <img key={photo.src} src={asset(photo.src)} alt="" />)}
        </div>
      </section>

      <section className="gallery-library" aria-labelledby="gallery-title">
        <div className="page-width gallery-library__heading">
          <div><p className="eyebrow">A casa por inteiro</p><h2 id="gallery-title">Escolha um canto.<br />Entre na foto.</h2></div>
          <p>Clique em qualquer imagem para ampliar. Use as setas do teclado para continuar.</p>
        </div>
        <PhotoGallery photos={galleryPhotos} />
      </section>

      <section className="panel booking-panel">
        <div className="page-width booking-layout">
          <div><p className="eyebrow">Gostou do que viu?</p><h2>Agora escolha quando viver essa casa.</h2><p>A disponibilidade e os valores aparecem no canal direto de reservas.</p></div>
          <div className="booking-actions"><a className="button button--dark" href={links.directBooking} target="_blank" rel="noreferrer">Reservar direto <Arrow /></a><a className="button button--outline" href={links.whatsapp} target="_blank" rel="noreferrer">Falar com a equipe <Arrow /></a></div>
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}

import Link from "next/link";
import Arrow from "./Arrow";
import { links } from "../app/content";
import PortoAlegreTimeline from "./PortoAlegreTimeline";

export default function PortoAlegreStory() {
  return (
    <>
      <section className="panel city-story" id="porto-alegre">
        <div className="page-width city-story__layout">
          <div className="city-story__lead">
            <p className="eyebrow">05 · Porto Alegre</p>
            <h2>Uma cidade feita de encontros.</h2>
          </div>
          <div className="city-story__copy">
            <p>Porto Alegre reconhece 26 de março de 1772 como sua fundação. Dos primeiros casais açorianos às comunidades negras, indígenas, europeias e às migrações contemporâneas, a cidade se tornou um mosaico de sotaques, saberes e afetos.</p>
            <p>A história também vive fora dos livros: no Mercado, no Theatro São Pedro, nas canções de Lupicínio, na Feira do Livro e nas conversas à sombra da Redenção.</p>
            <div className="inline-actions">
              <a className="button button--dark" href="#porto-alegre-history">Viajar pela história <Arrow /></a>
              <Link className="text-link" href="/experiencias">Explorar a cidade <Arrow /></Link>
              <a className="text-link" href={links.directBooking} target="_blank" rel="noreferrer">Ficar na Cidade Baixa <Arrow /></a>
            </div>
          </div>
        </div>
      </section>
      <PortoAlegreTimeline />
    </>
  );
}

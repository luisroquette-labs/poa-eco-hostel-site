// Built using Hyperiux Vault: https://vault.hyperiux.com
// Source: https://21st.dev/@hyperiux/components/timeline (MIT). Content and CSS hooks adapted for Porto Alegre.
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { asset } from "../app/base";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

type Month = keyof typeof monthOrder;

type JourneyItem = {
  id: string;
  year: string;
  month: Month;
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  credit: string;
  source: string;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

const topJourneyData: JourneyItem[] = [
  {
    id: "1752-acorianos",
    year: "1752",
    month: "November",
    title: "Porto dos Casais",
    content: "Cerca de 60 famílias açorianas chegam à região e ajudam a formar o povoado às margens do Guaíba.",
    image: "/assets/porto-alegre/poa-13.jpg",
    imageAlt: "Monumento aos Açorianos em Porto Alegre",
    credit: "Carlos Nascimento · CC BY 2.0",
    source: "https://prefeitura.poa.br/pgm/memoria",
  },
  {
    id: "1835-farrapos",
    year: "1835–41",
    month: "September",
    title: "Uma cidade sitiada",
    content: "Porto Alegre resiste aos cercos da Revolução Farroupilha e recebe de Dom Pedro II o título de Leal e Valorosa.",
    image: "/assets/porto-alegre/poa-03.jpg",
    imageAlt: "Cais histórico de Porto Alegre diante do Guaíba",
    credit: "Renato Soares / MTur · domínio público",
    source: "https://prefeitura.poa.br/sites/default/files/usu_doc/sites/pgm/Revista_PGM_35_2022_FInal.pdf",
  },
  {
    id: "1869-mercado",
    year: "1869",
    month: "October",
    title: "Mercado Público",
    content: "O Mercado abre as portas e se torna ponto de comércio, gastronomia e encontro entre diferentes culturas da cidade.",
    image: "/assets/porto-alegre/poa-10.jpg",
    imageAlt: "Fachada histórica do Mercado Público de Porto Alegre",
    credit: "Hedestad · CC BY-SA 4.0",
    source: "https://prefeitura.poa.br/smde/noticias/mercado-publico-completa-149-anos-nesta-quarta-feira",
  },
  {
    id: "1935-redencao",
    year: "1935",
    month: "September",
    title: "A Redenção ganha forma",
    content: "A Exposição do Centenário Farroupilha transforma o antigo campo no Parque Farroupilha que os porto-alegrenses ocupam até hoje.",
    image: "/assets/porto-alegre/poa-02.jpg",
    imageAlt: "Pessoas caminhando pelo Parque Farroupilha",
    credit: "Hedestad · CC BY-SA 4.0",
    source: "https://prefeitura.poa.br/pgm/memoria",
  },
  {
    id: "1955-feira",
    year: "1955",
    month: "November",
    title: "Livros na praça",
    content: "A primeira Feira do Livro ocupa a Praça da Alfândega e inaugura uma tradição literária ao ar livre.",
    image: "/assets/porto-alegre/history/feira-livro.jpg",
    imageAlt: "Bancas e visitantes na Feira do Livro de Porto Alegre",
    credit: "Eugenio Hansen · CC BY 3.0",
    source: "https://prefeitura.poa.br/pgm/memoria",
  },
  {
    id: "1989-op",
    year: "1989",
    month: "January",
    title: "Democracia participativa",
    content: "Nasce o Orçamento Participativo, experiência de decisão popular que transforma Porto Alegre em referência mundial.",
    image: "/assets/porto-alegre/poa-15.jpg",
    imageAlt: "Pessoas reunidas na Orla do Guaíba",
    credit: "Otávio Astor Vaz Costa · CC BY-SA 4.0",
    source: "https://www.prefeitura.poa.br/smgov/orcamento-participativo",
  },
];

const bottomJourneyData: JourneyItem[] = [
  {
    id: "1772-freguesia",
    year: "1772–73",
    month: "March",
    title: "Nasce Porto Alegre",
    content: "A Freguesia de São Francisco do Porto dos Casais é criada em 1772; no ano seguinte, torna-se capital.",
    image: "/assets/porto-alegre/poa-08.jpg",
    imageAlt: "Catedral Metropolitana vista da Praça da Matriz",
    credit: "Arlety da Silva · CC BY-SA 4.0",
    source: "https://prefeitura.poa.br/pgm/memoria",
  },
  {
    id: "1858-theatro",
    year: "1858",
    month: "June",
    title: "Abrem-se as cortinas",
    content: "O Theatro São Pedro é inaugurado junto à Praça da Matriz e se consolida como palco da vida cultural gaúcha.",
    image: "/assets/porto-alegre/poa-18.jpg",
    imageAlt: "Interior histórico do Theatro São Pedro",
    credit: "Arlety da Silva · CC BY-SA 4.0",
    source: "https://prefeitura.poa.br/smc/noticias/passado-e-futuro-do-theatro-sao-pedro-foi-o-tema-da-imperadores",
  },
  {
    id: "1914-lupicinio",
    year: "1914",
    month: "September",
    title: "Nasce Lupicínio",
    content: "Lupicínio Rodrigues nasce na Ilhota. O compositor leva a boemia e a dor de cotovelo de Porto Alegre para o Brasil.",
    image: "/assets/porto-alegre/history/lupicinio-rodrigues.jpg",
    imageAlt: "Retrato do compositor porto-alegrense Lupicínio Rodrigues em 1968",
    credit: "Arquivo Nacional · domínio público",
    source: "https://prefeitura.poa.br/smc/noticias/debate-cultural-marca-50-anos-da-morte-de-lupicinio-rodrigues",
  },
  {
    id: "1941-enchente",
    year: "1941",
    month: "May",
    title: "A grande enchente",
    content: "As águas cobrem o Centro e desalojam cerca de um quarto da população, mudando para sempre a proteção contra cheias.",
    image: "/assets/porto-alegre/history/enchente-1941.jpg",
    imageAlt: "Vista aérea da avenida Farrapos durante a enchente de 1941",
    credit: "Museu de Porto Alegre Joaquim Felizardo · domínio público",
    source: "https://prefeitura.poa.br/pgm/memoria",
  },
  {
    id: "1958-lacador",
    year: "1958",
    month: "September",
    title: "O Laçador",
    content: "A escultura de Antônio Caringi, modelada por Paixão Côrtes, é inaugurada e se torna símbolo oficial da capital.",
    image: "/assets/porto-alegre/history/lacador.jpg",
    imageAlt: "Estátua do Laçador, símbolo oficial de Porto Alegre",
    credit: "Eduardo Beleske / PMPA",
    source: "https://prefeitura.poa.br/pgm/memoria",
  },
  {
    id: "2001-forum",
    year: "2001",
    month: "January",
    title: "Um fórum para outro mundo",
    content: "A cidade recebe o primeiro Fórum Social Mundial e reúne movimentos de dezenas de países em torno de novas formas de participação.",
    image: "/assets/porto-alegre/poa-01.jpg",
    imageAlt: "Multidão no Brique da Redenção em Porto Alegre",
    credit: "Hedestad · CC BY-SA 4.0",
    source: "https://prefeitura.poa.br/sites/default/files/usu_doc/sites/dmae/ECOS%2019.pdf",
  },
];

const allJourneyItems: JourneyItem[] = [
  ...topJourneyData,
  ...bottomJourneyData,
].sort((a, b) => {
  const yearDiff = Number.parseInt(a.year, 10) - Number.parseInt(b.year, 10);
  if (yearDiff !== 0) return yearDiff;
  return monthOrder[a.month] - monthOrder[b.month];
});

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
}

function Milestone({ item, position }: { item: JourneyItem; position: "top" | "bottom" }) {
  return (
    <article className={`city-timeline__milestone city-timeline__milestone--${position}`}>
      <div className="city-timeline__stem-wrap" aria-hidden="true">
        <span className={`city-timeline__dot jd-${item.id}`} />
        <span className={`city-timeline__stem jl-${item.id}`} />
      </div>
      <a className="city-timeline__card" href={item.source} target="_blank" rel="noreferrer">
        <figure>
          <img src={asset(item.image)} alt={item.imageAlt} draggable={false} />
          <figcaption>{item.credit}</figcaption>
        </figure>
        <div>
          <p className="city-timeline__year">{item.year}</p>
          <h3 className={`city-timeline__title title-${item.id}`}>{item.title}</h3>
          <p className={`city-timeline__description description-${item.id}`}>{item.content}</p>
        </div>
      </a>
    </article>
  );
}

export default function PortoAlegreTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const normalizedDuration = 1.2;
  const sectionStyle: CSSProperties = { color: "#f5f0df", backgroundColor: "#10271a" };

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -84 : -73;
    const lineWidth = isMobile ? "78%" : "98%";
    const lineStart = isMobile ? "top 24%" : "top 18%";
    const slideEnd = isMobile ? "88% 50%" : "94% bottom";
    const lineEnd = isMobile ? "86% 50%" : "94% bottom";

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top top", end: slideEnd, scrub: true },
      defaults: { ease: "none" },
    });

    tl.fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: slidePercent });

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: { trigger: section, start: lineStart, end: lineEnd, scrub: true },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = allJourneyItems;
    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, { opacity: 1, clearProps: "transform" });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, { scaleY: 0, transformOrigin: "bottom bottom" });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
    });

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, { type: "chars, words, lines", mask: "lines" });
      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, { type: "chars, words, lines", mask: "lines" });
    });

    const createItemTimeline = (item: JourneyItem, startPos: number, endPos: number) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];
      const isTop = topJourneyData.some((topItem) => topItem.id === item.id);

      if (!isTop) gsap.set(lineSelector, { transformOrigin: "top top" });

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: `${startPos}% 30%`, end: `${endPos}% 50%`, scrub: true },
      });

      timeline
        .to(lineSelector, { scaleY: 1, duration: normalizedDuration * 0.4 })
        .to(dotSelector, { scale: 1, duration: normalizedDuration * 0.4 }, "<")
        .fromTo(titleLines, { y: 100 }, { y: 0, delay: -0.8 * normalizedDuration, duration: normalizedDuration, stagger: 0.02, ease: "power2.out" })
        .fromTo(descriptionLines, { y: 100 }, { y: 0, duration: normalizedDuration, stagger: 0.02, ease: "power2.out" }, "<");

      return timeline;
    };

    const positions = items.map((_, index) => {
      const start = window.innerWidth < 600 ? 16 + index * 6.2 : 4 + index * 7.1;
      return [start, start + (window.innerWidth < 600 ? 12 : 18)] as const;
    });

    items.forEach((item, index) => {
      const [startPos, endPos] = positions[index];
      createItemTimeline(item, startPos, endPos);
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion], scope: sectionRef });

  return (
    <section ref={sectionRef} id="porto-alegre-history" className="city-timeline" style={sectionStyle} aria-label="Linha do tempo da história de Porto Alegre">
      <div className="city-timeline__sticky">
        <div ref={wholeSliderRef} className="city-timeline__slider">
          <div className="city-timeline__cover">
            <img src={asset("/assets/porto-alegre/poa-20.jpg")} alt="Amanhecer sobre Porto Alegre e o Guaíba" draggable={false} />
            <div><span>1752 — 2001</span><strong>Uma cidade construída por encontros</strong></div>
          </div>

          <div className="city-timeline__journey">
            <div className="city-timeline__axis" aria-hidden="true"><span /><span className="journey-line" /><span /></div>
            <div className="city-timeline__row city-timeline__row--top">
              <header><span>História viva</span><h2>Porto Alegre, passo a passo.</h2></header>
              <div className="city-timeline__items">{topJourneyData.map((item) => <Milestone key={item.id} item={item} position="top" />)}</div>
            </div>
            <div className="city-timeline__row city-timeline__row--bottom">
              <p className="city-timeline__period">12 marcos<br />250 anos</p>
              <div className="city-timeline__items">{bottomJourneyData.map((item) => <Milestone key={item.id} item={item} position="bottom" />)}</div>
            </div>
          </div>
        </div>
        <p className="city-timeline__instruction" aria-hidden="true"><span>↓</span> role para atravessar a história</p>
      </div>
    </section>
  );
}

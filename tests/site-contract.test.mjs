import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("all public routes exist", () => {
  for (const path of ["app/page.tsx", "app/hospedagem/page.tsx", "app/galeria/page.tsx", "app/experiencias/page.tsx", "app/social/page.tsx"]) {
    assert.ok(statSync(new URL(path, root)).isFile(), path);
  }
  for (const path of ["app/robots.ts", "app/sitemap.ts"]) assert.match(read(path), /export const dynamic = "force-static"/);
});

test("the site uses one content family and a dedicated geometric wordmark", () => {
  const layout = read("app/layout.tsx");
  const styles = read("app/globals.css");
  assert.match(layout, /family=Plus\+Jakarta\+Sans/);
  assert.match(layout, /family=Outfit/);
  assert.match(layout, /assets\/logo-mark\.svg\?v=2/);
  assert.match(layout, /favicon\.ico\?v=2/);
  assert.match(layout, /data-scroll-behavior="smooth"/);
  assert.ok(statSync(new URL("public/favicon.ico", root)).size > 1000);
  assert.doesNotMatch(layout, /Fraunces|Manrope|family=Inter/);
  assert.match(styles, /--display: "Plus Jakarta Sans"/);
  assert.match(styles, /--sans: "Plus Jakarta Sans"/);
  assert.match(styles, /--wordmark: "Outfit"/);
  assert.match(styles, /\.brand-wordmark.*font-family: var\(--wordmark\)/);
  assert.doesNotMatch(styles, /Fraunces|Manrope|"Inter"/);
});

test("the real-photo gallery ships all local images and an accessible lightbox", () => {
  const content = read("app/content.ts");
  const gallery = read("components/PhotoGallery.tsx");
  const sitemap = read("app/sitemap.ts");
  assert.equal((content.match(/\["\d{3}",/g) || []).length, 50);
  assert.match(gallery, /role="dialog"/);
  assert.match(gallery, /aria-modal="true"/);
  assert.match(gallery, /event\.key === "Escape"/);
  assert.match(gallery, /event\.key === "ArrowRight"/);
  assert.match(sitemap, /\/galeria/);
  assert.ok(statSync(new URL("public/assets/gallery/foto_001.jpg", root)).size > 1000);
  assert.ok(statSync(new URL("public/assets/gallery/foto_114.jpg", root)).size > 1000);
});

test("approved original assets are local", () => {
  for (const file of ["hero-house.jpg", "model-fallback-real.jpg", "gate-mural-reference.png", "pool-garden.jpg", "common-area.jpg", "room-private.jpg", "room-shared.jpg", "room-simple.jpg", "suite-classica.png", "logo-official.jpg"]) {
    assert.ok(statSync(new URL(`public/assets/${file}`, root)).size > 1000, file);
  }
});

test("the home promotes the traced, accessible 3D miniature inside the hero", () => {
  const source = read("components/HostelModel3D.tsx");
  const page = read("app/page.tsx");
  const styles = read("app/globals.css");
  assert.match(page, /hero--pastel/);
  assert.doesNotMatch(page, /hero-background\.mp4|<video/);
  assert.match(styles, /Pastel garden light/);
  assert.match(page, /className="hero-model"/);
  assert.match(page, /<HostelModel3D \/>/);
  assert.match(source, /new THREE\.WebGLRenderer/);
  assert.match(source, /setClearColor\(0x000000, 0\)/);
  assert.doesNotMatch(source, /scene\.background/);
  assert.match(source, /model-stage__gesture-hint/);
  assert.match(source, /aria-label="Arraste para girar e use a roda do mouse para aproximar ou afastar"/);
  assert.doesNotMatch(source, />Arraste para girar · role para aproximar</);
  assert.match(source, /new OrbitControls/);
  assert.match(source, /fachada:|piscina:/);
  assert.match(source, /PHOTO_EVIDENCE/);
  assert.match(source, /foto_043.*foto_044.*foto_046.*foto_055.*foto_106/);
  assert.match(source, /model-fallback-real\.jpg/);
  assert.doesNotMatch(source, /hero-house\.jpg/);
  assert.match(source, /reducedMotion\.matches/);
  assert.match(source, /Longitudinal red pergola/);
  assert.match(source, /Continuous L-shaped balcony\/parapet/);
  assert.match(source, /green ground floor; the exposed upper left elevation is white/);
  assert.match(source, /lateralEsquerda/);
  assert.match(source, /addSideOpening/);
  assert.match(source, /addAirConditioner/);
  assert.doesNotMatch(source, /\[0\.08, 2\.75, 5\.5\], \[-3\.34, 1\.49, 0\.8\], white/);
  assert.match(source, /addBowGrille/);
  assert.match(source, /addHostelDog/);
  assert.doesNotMatch(source, /Detached burgundy neighbour|const red =/);
  assert.match(source, /makePatternTexture\("paving"\)/);
  assert.match(source, /makePatternTexture\("deck"\)/);
  assert.match(source, /makePatternTexture\("roof"\)/);
  assert.match(source, /geometry\.setAttribute\("uv"/);
  assert.match(source, /addRidgeTiles/);
  assert.match(source, /const gutter =/);
  assert.match(source, /gate-mural-reference\.png/);
  assert.match(styles, /touch-action: pan-y/);
  assert.match(styles, /min-height: 44px/);
  assert.match(styles, /@keyframes gesture-rotate/);
  assert.match(page, /Recriação aproximada, sem escala métrica/);
});

test("the header presents the official artwork as one brand lockup", () => {
  const header = read("components/SiteHeader.tsx");
  const mark = read("public/assets/logo-mark.svg");
  assert.match(header, /className="brand-logo"/);
  assert.match(header, /logo-mark\.svg/);
  assert.match(header, /brand-wordmark/);
  assert.match(header, /POA/);
  assert.match(header, /Eco Hostel/);
  assert.doesNotMatch(mark, /<rect/);
  assert.doesNotMatch(header, /<span>POA Eco Hostel<\/span>/);
});

test("the 3D controls preserve canvas space with accessible icon buttons", () => {
  const model = read("components/HostelModel3D.tsx");
  const styles = read("app/globals.css");
  assert.match(model, /function ViewIcon/);
  assert.match(model, /className="sr-only"/);
  assert.match(model, /aria-label=\{rotating \? "Pausar rotação" : "Girar maquete"\}/);
  assert.match(styles, /grid-template-columns: minmax\(420px, \.7fr\) minmax\(0, 1\.3fr\)/);
  assert.match(styles, /height: min\(78svh, 760px\)/);
  assert.match(styles, /width: 42px/);
  assert.match(model, /glove-open\.png/);
  assert.match(model, /glove-grab\.png/);
  assert.match(styles, /model-stage__canvas, \.model-stage__canvas canvas \{ cursor: var\(--model-cursor-open\), grab !important/);
  assert.match(styles, /model-stage__canvas:active.*model-cursor-grab.*grabbing !important/);
  for (const file of ["glove-open.png", "glove-grab.png"]) assert.ok(statSync(new URL(`public/assets/cursors/${file}`, root)).size > 500, file);
});

test("the home explains the verified location with a real accessible map", () => {
  const page = read("app/page.tsx");
  const content = read("app/content.ts");
  const map = read("components/LocationMap.tsx");
  const styles = read("app/globals.css");
  assert.match(page, /id="localizacao"/);
  assert.match(page, /<LocationMap \/>/);
  assert.match(read("app/connectors.ts"), /maps\.app\.goo\.gl\/sFcuMk6U1eUXwM2f6/);
  for (const place of ["Parque da Redenção", "Mercado Público", "Casa de Cultura Mario Quintana", "Orla do Guaíba", "Estádio Beira-Rio", "Arena do Grêmio"]) assert.match(content, new RegExp(place));
  assert.equal((content.match(/coordinates:/g) ?? []).length, 12);
  assert.match(map, /<iframe/);
  assert.match(map, /google\.com\/maps/);
  assert.match(map, /output: "embed"/);
  assert.match(map, /saddr:/);
  assert.match(map, /daddr:/);
  assert.match(map, /aria-label=/);
  assert.match(map, /setActiveId/);
  assert.match(map, /location-scroll-hint/);
  assert.match(map, /Rolar para ver mais lugares/);
  assert.match(map, /list\.scrollTo/);
  assert.match(styles, /@keyframes location-scroll-dot/);
  assert.match(styles, /scroll-snap-type: x mandatory/);
  assert.doesNotMatch(map, /mapbox|leaflet/i);
});

test("the home celebrates Porto Alegre with the sourced HyperUIX timeline and 20 credited local photos", () => {
  const page = read("app/page.tsx");
  const content = read("app/content.ts");
  const story = read("components/PortoAlegreStory.tsx");
  const timeline = read("components/PortoAlegreTimeline.tsx");
  const carousel = read("components/PortoAlegreCarousel.tsx");
  const styles = read("app/globals.css");
  assert.match(page, /<PortoAlegreStory \/>/);
  assert.match(page, /<PortoAlegreCarousel \/>/);
  assert.match(story, /26 de março de 1772/);
  assert.match(story, /<PortoAlegreTimeline \/>/);
  assert.match(timeline, /Built using Hyperiux Vault/);
  assert.match(timeline, /21st\.dev\/@hyperiux\/components\/timeline/);
  assert.match(timeline, /ScrollTrigger/);
  assert.match(timeline, /SplitText/);
  assert.match(timeline, /12 marcos/);
  assert.match(timeline, /Feira do Livro/);
  assert.match(timeline, /Lupicínio Rodrigues/);
  assert.match(timeline, /Orçamento Participativo/);
  assert.match(timeline, /Fórum Social Mundial/);
  assert.equal((timeline.match(/id: "\d/g) ?? []).length, 12);
  assert.match(timeline, /prefeitura\.poa\.br\/pgm\/memoria/);
  for (const file of ["enchente-1941.jpg", "feira-livro.jpg", "lacador.jpg", "lupicinio-rodrigues.jpg"]) {
    assert.ok(statSync(new URL(`public/assets/porto-alegre/history/${file}`, root)).size > 1000, file);
  }
  assert.equal((content.match(/src: "\/assets\/porto-alegre\/poa-/g) ?? []).length, 20);
  for (let index = 1; index <= 20; index += 1) {
    const file = `public/assets/porto-alegre/poa-${String(index).padStart(2, "0")}.jpg`;
    assert.ok(statSync(new URL(file, root)).size > 1000, file);
  }
  assert.match(carousel, /aria-label="Carrossel de fotografias de Porto Alegre"/);
  assert.match(carousel, /aria-label="Foto anterior"/);
  assert.match(carousel, /aria-label="Próxima foto"/);
  assert.match(carousel, /photo\.author.*photo\.license/);
  assert.doesNotMatch(content, /Catedral_Metropolitana_202|Mercado_P%C3%BAblico_2021|Sun_striking_through_clouds|Theatro_S%C3%A3o_Pedro_202/);
  assert.doesNotMatch(timeline, /mercado-publico\/historico|\/smc\/theatro-sao-pedro"/);
  assert.match(styles, /scroll-snap-type: x mandatory/);
});

test("booking contract is real and placeholders stay out", () => {
  const source = ["app/connectors.ts", "app/content.ts", "app/page.tsx", "app/social/page.tsx"].map(read).join("\n");
  assert.match(source, /booking\.hqbeds\.com\.br\/poaecohostel/);
  assert.doesNotMatch(source, /youtube\.com\/embed|trainedAlgorithmicMedia|Unsplash/i);
});

test("the home explains verified advantages with current Booking proof and real photos", () => {
  const content = read("app/content.ts");
  const page = read("app/page.tsx");
  const section = read("components/AdvantagesSection.tsx");
  const styles = read("app/globals.css");
  assert.match(page, /<AdvantagesSection \/>/);
  assert.match(section, /id="vantagens"/);
  assert.equal((section.match(/<section className="panel advantages-/g) ?? []).length, 2);
  assert.match(section, /advantages-details-panel/);
  assert.match(section, /id="estrutura"/);
  assert.match(styles, /\.advantages-panel \{ height: 100svh/);
  assert.match(styles, /\.advantages-details-panel \{ height: 100svh/);
  for (const fact of ["8,2", "706 avaliações", "Localização", "9,4", "Equipe", "9,2", "Custo-benefício", "8,5", "Wi-Fi", "8,3"]) assert.match(content, new RegExp(fact));
  for (const amenity of ["Piscina ao ar livre", "Cozinha compartilhada", "Recepção 24 horas", "Estacionamento privativo", "Quartos para famílias", "Equipe multilíngue"]) assert.match(content, new RegExp(amenity));
  for (const photo of ["foto_043.jpg", "foto_028.jpg", "foto_024.jpg"]) assert.match(content, new RegExp(photo));
  assert.match(section, /Booking\.com/);
  assert.match(content, /20 out 2026/);
});

test("Booking social proof exposes every score and ten sourced review summaries", () => {
  const content = read("app/content.ts");
  const page = read("app/page.tsx");
  const section = read("components/BookingSocialProof.tsx");
  const styles = read("app/globals.css");
  assert.match(page, /<BookingSocialProof \/>/);
  assert.match(section, /id="avaliacoes"/);
  assert.match(section, /id="depoimentos"/);
  for (const fact of ["Localização", "9,4", "Limpeza", "7,5", "Custo-benefício", "8,5", "Comodidades", "7,9", "Conforto", "7,7", "Funcionários", "9,2", "Wi-Fi", "8,3", 'couplesLocation: "9,6"']) assert.match(content, new RegExp(fact));
  assert.equal((content.match(/summary:/g) ?? []).length, 10);
  assert.match(read("app/connectors.ts"), /#tab-reviews/);
  assert.match(section, /resumos fiéis dos dez relatos/);
  assert.match(section, /Ler as \{bookingProof\.reviewCount\}/);
  assert.match(section, /new IntersectionObserver/);
  assert.match(section, /requestAnimationFrame/);
  assert.match(section, /prefers-reduced-motion: reduce/);
  assert.match(section, /scoreNumber\(score\.value\) \* scoreProgress \* 10/);
  assert.match(section, /displayScore\(bookingProof\.overall, scoreProgress\)/);
  assert.match(styles, /\.booking-ratings-panel \{ height: 100svh; min-height: 0;/);
  assert.match(styles, /@keyframes review-marquee/);
  assert.match(styles, /animation-play-state: paused/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("the accommodation page shows essential stay rules before booking", () => {
  const content = read("app/content.ts");
  const page = read("app/hospedagem/page.tsx");
  for (const fact of ["A partir das 14h", "Até 12h", "Todas as idades são bem-vindas", "Não são permitidos"]) assert.match(content, new RegExp(fact));
  assert.match(page, /Antes de chegar/);
  assert.match(page, /cancelamento e pré-pagamento variam/);
  assert.match(page, /Conferir políticas no Booking\.com/);
});

test("Lovable receives mapped connectors without live redirects", () => {
  const component = read("components/LovableConnectors.tsx");
  const connectors = read("app/connectors.ts");
  const manifest = JSON.parse(read("public/lovable-connectors.json"));
  assert.match(component, /event\.preventDefault\(\)/);
  assert.match(component, /data-lovable-connector="whatsapp"/);
  assert.match(component, /className="whatsapp-bubble"/);
  for (const id of ["directBooking", "booking", "bookingReviews", "maps", "whatsapp", "instagram", "email"]) {
    assert.match(connectors, new RegExp(`${id}:`));
    assert.ok(manifest.connectors[id], id);
  }
  assert.equal(manifest.mode, "mapped-no-redirect");
});

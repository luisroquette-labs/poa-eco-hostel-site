export { lovableConnectors as links } from "./connectors";

export const nav = [
  { href: "/", label: "Início" },
  { href: "/hospedagem", label: "Hospedagem" },
  { href: "/galeria", label: "Galeria" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/experiencias", label: "Experiências" },
];

export const bookingProof = {
  overall: "8,2",
  label: "Muito bom",
  reviewCount: "706 avaliações",
  checkedAt: "20 out 2026",
  scores: [
    { label: "Localização", value: "9,4" },
    { label: "Limpeza", value: "7,5" },
    { label: "Custo-benefício", value: "8,5" },
    { label: "Comodidades", value: "7,9" },
    { label: "Conforto", value: "7,7" },
    { label: "Funcionários", value: "9,2" },
    { label: "Wi-Fi", value: "8,3" },
  ],
  couplesLocation: "9,6",
} as const;

export const bookingReviewHighlights = [
  { name: "Ednaldo", country: "Brasil", theme: "Atendimento", summary: "Equipe simpática e atendimento muito positivo." },
  { name: "Gomes", country: "Brasil", theme: "Equipe", summary: "Estadia agradável, com uma recepção atenciosa." },
  { name: "Caroline", country: "Brasil", theme: "Acolhimento", summary: "Pessoas gentis, atenciosas e uma experiência recomendada." },
  { name: "Maria", country: "Brasil", theme: "Cuidado", summary: "Acolhimento tranquilo, equipe prestativa e café disponível." },
  { name: "Jay", country: "Brasil", theme: "Estrutura", summary: "Ambiente animado, amplo e quartos bem equipados." },
  { name: "Santini", country: "Brasil", theme: "Localização", summary: "Posição central, equipe gentil e vontade de voltar." },
  { name: "Marcos", country: "Brasil", theme: "Conforto", summary: "Conforto, silêncio à noite, diversidade e atenção da equipe." },
  { name: "Daniel", country: "Brasil", theme: "Experiência", summary: "Boa equipe, ótima localização e os cães como bônus da casa." },
  { name: "Débora", country: "Brasil", theme: "Inclusão", summary: "Um lugar percebido como aconchegante, acolhedor e inclusivo." },
  { name: "Cristinatti", country: "Brasil", theme: "Conexões", summary: "As pessoas encontradas na casa foram o ponto alto da estadia." },
] as const;

export const advantages = [
  { title: "Piscina ao ar livre", description: "Disponível o ano inteiro.", image: "/assets/gallery/foto_043.jpg", alt: "Piscina do POA Eco Hostel em um dia de sol" },
  { title: "Lounge compartilhado", description: "Um espaço para descansar, trabalhar e conhecer gente.", image: "/assets/gallery/foto_028.jpg", alt: "Hóspedes na sala de convivência do POA Eco Hostel" },
  { title: "Cozinha compartilhada", description: "Mais autonomia para organizar a sua estadia.", image: "/assets/gallery/foto_024.jpg", alt: "Hóspedes reunidos à mesa da cozinha compartilhada" },
] as const;

export const amenities = [
  { icon: "wifi", title: "Wi-Fi gratuito", description: "Em toda a propriedade" },
  { icon: "clock", title: "Recepção 24 horas", description: "Atendimento contínuo" },
  { icon: "car", title: "Estacionamento privativo", description: "No local; consulte condições" },
  { icon: "people", title: "Quartos para famílias", description: "Opções para diferentes viagens" },
  { icon: "chat", title: "Equipe multilíngue", description: "Português, inglês e espanhol" },
] as const;

export const stayFacts = [
  { label: "Entrada", value: "A partir das 14h" },
  { label: "Saída", value: "Até 12h" },
  { label: "Crianças", value: "Todas as idades são bem-vindas" },
  { label: "Pets", value: "Não são permitidos" },
] as const;

export const nearbyPlaces = [
  { id: "redencao", title: "Parque da Redenção", category: "Parque", distance: "1,0 km", duration: "aprox. 13 min a pé", coordinates: [-51.2155872, -30.0370315] },
  { id: "catedral", title: "Catedral Metropolitana", category: "Arquitetura", distance: "1,3 km", duration: "aprox. 18 min a pé", coordinates: [-51.23003, -30.0338782] },
  { id: "theatro", title: "Theatro São Pedro", category: "Cultura", distance: "1,5 km", duration: "aprox. 21 min a pé", coordinates: [-51.2303757, -30.0319539] },
  { id: "mercado", title: "Mercado Público", category: "Gastronomia", distance: "2,0 km", duration: "aprox. 26 min a pé", coordinates: [-51.2282747, -30.027475] },
  { id: "quintana", title: "Casa de Cultura Mario Quintana", category: "Cultura", distance: "2,0 km", duration: "aprox. 26 min a pé", coordinates: [-51.2344781, -30.0310943] },
  { id: "margs", title: "MARGS", category: "Arte", distance: "2,0 km", duration: "aprox. 26 min a pé", coordinates: [-51.2317165, -30.0290324] },
  { id: "gasometro", title: "Usina do Gasômetro", category: "Cultura", distance: "2,5 km", duration: "aprox. 30 min a pé", coordinates: [-51.2410902, -30.0340842] },
  { id: "orla", title: "Orla do Guaíba", category: "Pôr do sol", distance: "2,6 km", duration: "aprox. 31 min a pé", coordinates: [-51.233149, -30.0544049] },
  { id: "beira-rio", title: "Estádio Beira-Rio", category: "Futebol", distance: "4,4 km", duration: "aprox. 13 min de carro", coordinates: [-51.2349178, -30.0654898] },
  { id: "ibere", title: "Fundação Iberê Camargo", category: "Arte", distance: "5,8 km", duration: "aprox. 15 min de carro", coordinates: [-51.2453919, -30.077732] },
  { id: "mct-pucrs", title: "Museu de Ciências PUCRS", category: "Ciência", distance: "6,3 km", duration: "aprox. 16 min de carro", coordinates: [-51.1760526, -30.0583918] },
  { id: "arena-gremio", title: "Arena do Grêmio", category: "Futebol", distance: "9,6 km", duration: "aprox. 23 min de carro", coordinates: [-51.1951073, -29.9740429] },
] as const;

export type PortoAlegrePhoto = {
  src: string;
  title: string;
  theme: string;
  alt: string;
  author: string;
  license: string;
  source: string;
  portrait?: boolean;
};

export const portoAlegrePhotos: PortoAlegrePhoto[] = [
  { src: "/assets/porto-alegre/poa-01.jpg", title: "Brique da Redenção", theme: "Cidade vivida", alt: "Brique da Redenção entre árvores do Parque Farroupilha", author: "Hedestad", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Brique_da_Reden%C3%A7%C3%A3o_-_Parque_Farroupilha_1.jpg" },
  { src: "/assets/porto-alegre/poa-02.jpg", title: "Parque Farroupilha", theme: "Encontros", alt: "Movimento no Brique da Redenção em Porto Alegre", author: "Hedestad", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Brique_da_Reden%C3%A7%C3%A3o_-_Parque_Farroupilha_2.jpg" },
  { src: "/assets/porto-alegre/poa-03.jpg", title: "Cais Mauá", theme: "Memória portuária", alt: "Armazéns e guindastes históricos do Cais Mauá ao entardecer", author: "Renato Soares / MTur", license: "Domínio público", source: "https://commons.wikimedia.org/wiki/File:Cais_Mau%C3%A1_by_Renato_Soares_(edited).jpg" },
  { src: "/assets/porto-alegre/poa-04.jpg", title: "Usina do Gasômetro", theme: "Cultura", alt: "Detalhe arquitetônico da Usina do Gasômetro", author: "Lenny Maidana", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Canto_da_Usina_do_Gas%C3%B4metro.jpg" },
  { src: "/assets/porto-alegre/poa-05.jpg", title: "Casa de Cultura Mario Quintana", theme: "Literatura", alt: "Pátio interno rosado da Casa de Cultura Mario Quintana sob o céu azul", author: "Rodrigo Tetsuo Argenton", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Casa_de_Cultura_Mario_Quintana_por_Rodrigo_Tetsuo_Argenton_(9).jpg", portrait: true },
  { src: "/assets/porto-alegre/poa-06.jpg", title: "Hotel Majestic", theme: "Patrimônio", alt: "Fachada da Casa de Cultura Mario Quintana, antigo Hotel Majestic", author: "Eugenio Hansen, OFS", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Casa_de_Cultura_Mario_Quintana.jpg", portrait: true },
  { src: "/assets/porto-alegre/poa-07.jpg", title: "Catedral Metropolitana", theme: "Arquitetura", alt: "Cúpula e fachada da Catedral Metropolitana de Porto Alegre", author: "Arlety da Silva", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Catedral_Metropolitana_de_Porto_Alegre_-_Porto_Alegre_-_20220324192419.jpg" },
  { src: "/assets/porto-alegre/poa-08.jpg", title: "Catedral e Praça da Matriz", theme: "Centro Histórico", alt: "Catedral Metropolitana vista da Praça da Matriz", author: "Arlety da Silva", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Catedral_Metropolitana_de_Porto_Alegre_-_Porto_Alegre_-_20220707180800.jpg" },
  { src: "/assets/porto-alegre/poa-09.jpg", title: "Detalhes do Centro Histórico", theme: "Arquitetura", alt: "Detalhe escultórico em pedra de prédio do Centro Histórico", author: "Kátia Goretti Dias Vazzoller", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Centro_Hist%C3%B3rico_-_Porto_Alegre_(20636040170).jpg", portrait: true },
  { src: "/assets/porto-alegre/poa-10.jpg", title: "Mercado Público", theme: "Sabores", alt: "Fachada histórica do Mercado Público de Porto Alegre", author: "Hedestad", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Mercado_P%C3%BAblico_de_Porto_Alegre_2021_1.jpg" },
  { src: "/assets/porto-alegre/poa-11.jpg", title: "Mercado e cidade", theme: "Gastronomia", alt: "Mercado Público integrado ao centro urbano de Porto Alegre", author: "Hedestad", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Mercado_P%C3%BAblico_de_Porto_Alegre_2021_4.jpg" },
  { src: "/assets/porto-alegre/poa-12.jpg", title: "Monumento aos Açorianos", theme: "Origens", alt: "Monumento aos Açorianos contra o céu de Porto Alegre", author: "Eugenio Hansen, OFS", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Monumento_aos_A%C3%A7orianos_2.jpg" },
  { src: "/assets/porto-alegre/poa-13.jpg", title: "Açorianos", theme: "História", alt: "Escultura do Monumento aos Açorianos em Porto Alegre", author: "Carlos Nascimento", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Monumento_aos_A%C3%A7orianos.jpg" },
  { src: "/assets/porto-alegre/poa-14.jpg", title: "MARGS", theme: "Artes", alt: "Museu de Arte do Rio Grande do Sul no Centro Histórico", author: "Espinozareynerio", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Museoarte_rio_grande.jpg" },
  { src: "/assets/porto-alegre/poa-15.jpg", title: "Orla do Guaíba", theme: "Fim de tarde", alt: "Pessoas caminhando e descansando na Orla do Guaíba", author: "Otávio Astor Vaz Costa", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Orla_do_Gua%C3%ADba_2.jpg" },
  { src: "/assets/porto-alegre/poa-16.jpg", title: "Porto Alegre e o Guaíba", theme: "Paisagem", alt: "Vista ampla de Porto Alegre junto ao Guaíba", author: "Cristine Denardi Huff", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Porto_Alegre_por_Cristine_Huff_24.jpg" },
  { src: "/assets/porto-alegre/poa-17.jpg", title: "Luz sobre o Guaíba", theme: "Horizonte", alt: "Raios de sol atravessando nuvens sobre o Guaíba", author: "Felipe Valduga", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Sun_striking_through_the_clouds_over_Guaiba_river.jpg" },
  { src: "/assets/porto-alegre/poa-18.jpg", title: "Theatro São Pedro", theme: "Palco gaúcho", alt: "Interior histórico do Theatro São Pedro", author: "Arlety da Silva", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Theatro_S%C3%A3o_Pedro_-_Porto_Alegre_-_20220622184943.jpg", portrait: true },
  { src: "/assets/porto-alegre/poa-19.jpg", title: "Theatro e Praça da Matriz", theme: "Cultura", alt: "Fachada iluminada do Theatro São Pedro", author: "Arlety da Silva", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Theatro_S%C3%A3o_Pedro_-_Porto_Alegre_-_20220622204717.jpg" },
  { src: "/assets/porto-alegre/poa-20.jpg", title: "Amanhecer no Guaíba", theme: "Cidade das águas", alt: "Amanhecer alaranjado sobre o Lago Guaíba e o cais", author: "Goleiro1", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Amanhecer_-_Lago_Gua%C3%ADba.jpg" },
];

export const rooms = [
  {
    title: "Suíte Clássica Simples",
    kind: "Privativo",
    capacity: "1–2 hóspedes",
    image: "/assets/suite-classica.png",
    description: "Cama de casal, banheiro privativo, teto de madeira e luz natural.",
  },
  {
    title: "Quarto Privado Simples",
    kind: "Privativo",
    capacity: "1–2 hóspedes",
    image: "/assets/room-simple.jpg",
    description: "Um quarto compacto e bem cuidado para quem busca privacidade sem complicação.",
  },
  {
    title: "Suíte Clássica com Vista",
    kind: "Privativo",
    capacity: "1–2 hóspedes",
    image: "/assets/room-private.jpg",
    description: "Cama de casal, banheiro privativo e janela para a rua arborizada.",
  },
  {
    title: "Dormitório Misto",
    kind: "Compartilhado",
    capacity: "Camas avulsas",
    image: "/assets/room-shared.jpg",
    description: "Beliches de madeira, roupa de cama e espaço para novas conexões.",
  },
];

export type GalleryCategory = "casa" | "convivencia" | "piscina" | "quartos" | "detalhes";

export type GalleryPhoto = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

const galleryEntries: Array<[string, GalleryCategory, string]> = [
  ["001", "casa", "Fachada verde do POA Eco Hostel cercada pelo jardim"],
  ["002", "quartos", "Quarto amarelo com janela de madeira"],
  ["003", "quartos", "Quarto amarelo com acesso ao banheiro"],
  ["004", "quartos", "Quarto privativo com cama de casal"],
  ["005", "casa", "Entrada interna com escada colorida"],
  ["006", "casa", "Corredor de entrada e escada do hostel"],
  ["007", "casa", "Detalhe da fachada curva e do jardim"],
  ["008", "casa", "Janela curva gradeada da fachada"],
  ["009", "casa", "Vista ampla da casa histórica verde"],
  ["010", "detalhes", "Mandala artesanal na parede verde"],
  ["012", "casa", "Entrada principal entre flores amarelas"],
  ["015", "casa", "Corredor externo com mural colorido"],
  ["016", "convivencia", "Estante comunitária em um arco da casa"],
  ["017", "casa", "Hall de entrada iluminado pela porta"],
  ["018", "detalhes", "Arte e plantas na decoração interna"],
  ["020", "detalhes", "Mural pintado à mão no hostel"],
  ["021", "detalhes", "Pintura botânica junto à escada"],
  ["024", "convivencia", "Hóspedes reunidos à mesa da cozinha"],
  ["026", "convivencia", "Grupo de hóspedes no jardim"],
  ["028", "convivencia", "Sala de convivência junto à janela curva"],
  ["030", "convivencia", "Hóspedes conversando na sala"],
  ["043", "piscina", "Piscina do hostel em um dia de sol"],
  ["044", "piscina", "Piscina e pergolado vermelho no jardim"],
  ["046", "piscina", "Piscina iluminada durante a noite"],
  ["051", "convivencia", "Amigos reunidos no sofá da sala"],
  ["052", "convivencia", "Encontro de hóspedes no balcão"],
  ["053", "convivencia", "Almoço compartilhado no jardim"],
  ["054", "casa", "Fachada do hostel ao anoitecer"],
  ["055", "piscina", "Piscina e área externa à noite"],
  ["059", "detalhes", "Coluna histórica envolvida pelo jardim"],
  ["063", "detalhes", "Flores cor-de-rosa do jardim"],
  ["070", "detalhes", "Vegetação junto ao pergolado"],
  ["079", "detalhes", "Joaninha em uma folha do jardim"],
  ["081", "quartos", "Dormitório com armários individuais"],
  ["083", "quartos", "Dormitório amarelo com beliches"],
  ["084", "quartos", "Dormitório amarelo iluminado pela janela"],
  ["085", "quartos", "Dormitório com banheiro privativo"],
  ["087", "quartos", "Entrada do quarto amarelo"],
  ["088", "quartos", "Quarto amarelo com armário azul"],
  ["089", "quartos", "Dormitório lilás com beliches"],
  ["090", "quartos", "Beliches e armários no quarto lilás"],
  ["094", "quartos", "Beliches no quarto laranja"],
  ["096", "quartos", "Beliche de madeira com armários"],
  ["097", "quartos", "Quarto vermelho com cama de madeira"],
  ["101", "quartos", "Cama preparada no quarto vermelho"],
  ["105", "detalhes", "Cadeira pintada à mão no jardim"],
  ["106", "piscina", "Pergolado de madeira ao lado da piscina"],
  ["107", "quartos", "Quarto azul com camas de madeira"],
  ["112", "quartos", "Quarto vermelho amplo e iluminado"],
  ["114", "quartos", "Quarto branco e azul com cama de casal"],
];

export const galleryPhotos: GalleryPhoto[] = galleryEntries.map(([file, category, alt]) => ({
  src: `/assets/gallery/foto_${file}.jpg`,
  category,
  alt,
}));

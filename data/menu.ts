export type MenuItem = {
  name: string;
  image: string;
  price: string;
};

export type Combo = {
  title: string;
  tag: string;
  note: string;
  desc: string;
  price: string;
  image: string;
};

export type Location = {
  city: string;
  address: string;
  hours: string;
  whatsapp: string;
  maps: string;
  embed: string;
  note?: string;
};

// Precios y datos marcados "a confirmar" son placeholders del brief original.
export const BAR_CATEGORIES = ["Pan", "Salchicha", "Salsas", "Extras"] as const;
export type BarCategory = (typeof BAR_CATEGORIES)[number];

export const CATS: Record<BarCategory, MenuItem[]> = {
  Pan: [
    { name: "Pan clásico", image: "/assets/products/pancho-clasico.webp", price: "incluido" },
    { name: "Pan de papa", image: "/assets/products/pancho-chili.webp", price: "+$400" },
    { name: "Pan integral", image: "/assets/products/pancho-clasico.webp", price: "+$400" },
  ],
  Salchicha: [
    { name: "Viena clásica", image: "/assets/products/pancho-clasico.webp", price: "incluida" },
    { name: "Doble viena", image: "/assets/products/pancho-chili.webp", price: "+$900" },
    { name: "Ahumada", image: "/assets/products/pancho-clasico.webp", price: "+$700" },
  ],
  Salsas: [
    { name: "Mayo clásica", image: "/assets/toppings/mayonesas.png", price: "libre" },
    { name: "Mayo de ajo", image: "/assets/toppings/mayonesas.png", price: "libre" },
    { name: "Chimichurri", image: "/assets/toppings/chimichurri.png", price: "libre" },
    { name: "Ketchup", image: "/assets/toppings/mayonesas.png", price: "libre" },
    { name: "Mostaza", image: "/assets/toppings/mayonesas.png", price: "libre" },
    { name: "Picante Bliss", image: "/assets/toppings/chimichurri.png", price: "libre" },
  ],
  Extras: [
    { name: "Cono de papas", image: "/assets/products/cono-papas-marca.png", price: "$2.800" },
    { name: "Papas con cheddar", image: "/assets/products/cono-papas.webp", price: "$3.400" },
    { name: "Coca 500ml", image: "/assets/beverages/coca-plastico.webp", price: "$1.800" },
    { name: "Coca vidrio", image: "/assets/beverages/coca-vidrio.webp", price: "$1.500" },
    { name: "Stella lata", image: "/assets/beverages/stella-artois.png", price: "$2.200" },
  ],
};

export const TOPPINGS_ONLY: MenuItem[] = [
  { name: "Lluvia de papas pay o papas al hilo", image: "/assets/toppings/papas-fritas.png", price: "libre" },
  { name: "Cebolla caramelizada", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Queso cheddar fundido", image: "/assets/toppings/mayonesas.png", price: "+$600" },
  { name: "Panceta o tocino crocante en trocitos", image: "/assets/toppings/papas-fritas.png", price: "+$600" },
  { name: "Jalapeños", image: "/assets/toppings/chimichurri.png", price: "+$400" },
  { name: "Verdeo", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Salsa criolla (tomate, cebolla y aceite)", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Chucrut", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Pico de gallo", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Nacho chips o Doritos picados", image: "/assets/toppings/papas-fritas.png", price: "+$400" },
  { name: "Pepinillos agridulces en rodajas", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Queso crema con cebollita de verdeo", image: "/assets/toppings/mayonesas.png", price: "+$500" },
  { name: "Palta o guacamole", image: "/assets/toppings/mayonesas.png", price: "+$700" },
  { name: "Salsa barbacoa", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Morrones asados o salteados", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Choclo en granos", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Salsa provenzal (ajo y perejil)", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Queso parmesano o rallado fino", image: "/assets/toppings/mayonesas.png", price: "+$400" },
  { name: "Huevo revuelto o huevo hilado", image: "/assets/toppings/mayonesas.png", price: "+$500" },
  { name: "Salsa picante o ají molido salteado", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Cebolla morada en tiras finas", image: "/assets/toppings/chimichurri.png", price: "libre" },
  { name: "Aceitunas verdes o negras picadas", image: "/assets/toppings/chimichurri.png", price: "+$400" },
];

export const COMBOS: Combo[] = [
  {
    title: "COMBO BLISS",
    tag: "El más pedido",
    note: "para uno",
    desc: "Pancho clásico + cono de papas + Coca 500ml.",
    price: "$6.900",
    image: "/assets/products/pancho-clasico.webp",
  },
  {
    title: "COMBO CHILI",
    tag: "Picante",
    note: "para uno",
    desc: "Pancho chili con cheddar + papas con marca + gaseosa.",
    price: "$7.600",
    image: "/assets/products/pancho-chili.webp",
  },
  {
    title: "DOBLE VIENA",
    tag: "Con hambre",
    note: "porción doble",
    desc: "Doble salchicha, 4 toppings a elección + papas pay.",
    price: "$8.200",
    image: "/assets/products/pancho-clasico.webp",
  },
  {
    title: "PUNTO DOBLE",
    tag: "Para compartir",
    note: "para dos",
    desc: "Dos panchos, cono grande de papas y dos latas.",
    price: "$12.400",
    image: "/assets/products/cono-papas-marca.png",
  },
];

const embed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;

export const LOCATIONS: Location[] = [
  {
    city: "San Nicolás de los Arroyos",
    address: "Bartolomé Mitre 133",
    hours: "Lun a Jue 11 a 24hs · Vie y Sáb 11 a 7hs · Dom 18 a 24hs",
    whatsapp: "https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2Fe9pr7p%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaflQuZH8BXZ34T5c3EcuBsZc-5AP7yQa2-YjJw6_mOVHZxk84XN1UCTf8cF0g_aem_h8If6LbwAJKiBFSUIB7MdA&e=AUCIYuQmGaqDl3_19u7iwrHr3tLIoGBkd20-QUH5SAm5pRZQ17x6GtGTdJ--L26dIL-2vY0CYOwpEiGIH6mUhNXd-RPFLs0VBj4k4V3nsjTx6sZ_eYerWYqs3xHzteJnvr71B74",
    maps: "https://maps.google.com/?q=Bartolomé+Mitre+133+San+Nicolás+de+los+Arroyos",
    embed: embed("Bartolomé Mitre 133, San Nicolás de los Arroyos, Buenos Aires"),
    note: "Consumo en el local · Pedidos para llevar",
  },
];

export const TABS = ["El pancho", "Toppings", "La barra", "Combos", "Nosotros", "Sucursales"] as const;
export type Tab = (typeof TABS)[number];

export const SECTION_IDS: Record<Tab, string> = {
  "El pancho": "sec-pancho",
  "La barra": "sec-barra",
  Toppings: "sec-toppings",
  Combos: "sec-combos",
  Nosotros: "sec-nosotros",
  Sucursales: "sec-sucursales",
};

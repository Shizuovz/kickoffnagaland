import argentinaImg from "@/assets/jersey-argentina.jpg";
import brazilImg from "@/assets/jersey-brazil.jpg";
import franceImg from "@/assets/jersey-france.jpg";
import japanImg from "@/assets/jersey-japan.jpg";

export const teams = [
  "Argentina",
  "Brazil",
  "France",
  "Germany",
  "Portugal",
  "England",
  "Italy",
  "Netherlands",
  "Spain",
  "Japan",
  "Croatia",
  "Morocco",
];

export const products = [
  {
    id: "france-2024-home-fff-stadium",
    img: franceImg,
    team: "France",
    season: "2024 Home",
    name: "FFF Stadium Edition",
    price: "$120",
    priceValue: 120,
    badge: "New Arrival",
    palette: "Navy / White",
    fit: "Stadium Fit",
  },
  {
    id: "argentina-2024-home-afa-authentic",
    img: argentinaImg,
    team: "Argentina",
    season: "2024 Home",
    name: "AFA Authentic Three-Star",
    price: "$160",
    priceValue: 160,
    badge: null,
    palette: "Sky / White",
    fit: "Match Fit",
  },
  {
    id: "japan-2024-special-samurai-blue",
    img: japanImg,
    team: "Japan",
    season: "2024 Special",
    name: "Samurai Blue Kit",
    price: "$140",
    priceValue: 140,
    badge: "Limited",
    palette: "Blue / Crimson",
    fit: "Stadium Fit",
  },
  {
    id: "brazil-2024-home-cbf-selecao",
    img: brazilImg,
    team: "Brazil",
    season: "2024 Home",
    name: "CBF Selecao Edition",
    price: "$120",
    priceValue: 120,
    badge: null,
    palette: "Canary / Green",
    fit: "Stadium Fit",
  },
  {
    id: "argentina-1994-archive-la-plata",
    img: argentinaImg,
    team: "Argentina",
    season: "1994 Archive",
    name: "La Plata Retro Home",
    price: "$135",
    priceValue: 135,
    badge: "Archive",
    palette: "Sky / Black",
    fit: "Relaxed Fit",
  },
  {
    id: "france-1998-archive-les-bleus",
    img: franceImg,
    team: "France",
    season: "1998 Archive",
    name: "Les Bleus Trophy Shirt",
    price: "$150",
    priceValue: 150,
    badge: "Collectors",
    palette: "Royal / Red",
    fit: "Relaxed Fit",
  },
  {
    id: "brazil-2002-archive-r9-finals",
    img: brazilImg,
    team: "Brazil",
    season: "2002 Archive",
    name: "R9 Finals Edition",
    price: "$155",
    priceValue: 155,
    badge: "Restocked",
    palette: "Yellow / Blue",
    fit: "Match Fit",
  },
  {
    id: "japan-2022-away-origami",
    img: japanImg,
    team: "Japan",
    season: "2022 Away",
    name: "Origami White Kit",
    price: "$118",
    priceValue: 118,
    badge: null,
    palette: "White / Blue",
    fit: "Stadium Fit",
  },
];

export type Product = (typeof products)[number];

export function productPath(product: Product) {
  return `/products/${product.id}`;
}

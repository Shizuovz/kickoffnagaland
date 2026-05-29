import argentinaAwayBackImg from "@/assets/products/argentina-a-back.jpeg";
import argentinaAwayFrontImg from "@/assets/products/argentina-a-front.jpeg";
import argentinaHomeBackImg from "@/assets/products/argentina-h-back.jpeg";
import argentinaHomeFrontImg from "@/assets/products/argentina-h-front.jpeg";
import brazilAwayBackImg from "@/assets/products/brazil-a-back.jpeg";
import brazilAwayFrontImg from "@/assets/products/brazil-a-front.jpeg";
import englandHomeBackImg from "@/assets/products/england-h-back.jpeg";
import englandHomeFrontImg from "@/assets/products/england-home-f.jpeg";
import franceHomeBackImg from "@/assets/products/france-h-back.jpeg";
import franceHomeFrontImg from "@/assets/products/france-h-front.jpeg";
import germanyAwayBackImg from "@/assets/products/germany-a-back.jpeg";
import germanyAwayFrontImg from "@/assets/products/germany-a-front.jpeg";
import germanyHomeBackImg from "@/assets/products/germany-h-back.jpeg";
import germanyHomeFrontImg from "@/assets/products/germany-h-front.jpeg";
import japanAwayBackImg from "@/assets/products/japan-a-back.jpeg";
import japanAwayFrontImg from "@/assets/products/japan-a-front.jpeg";
import portugalAwayBackImg from "@/assets/products/portogel-a-back.jpeg";
import portugalAwayFrontImg from "@/assets/products/portogel-a-front.jpeg";
import portugalHomeBackImg from "@/assets/products/protogel-home-back.jpeg";
import portugalHomeFrontImg from "@/assets/products/protogel-home-front.jpeg";
import spainHomeBackImg from "@/assets/products/spain-h-back.jpeg";
import spainHomeFrontImg from "@/assets/products/spain-h-front.jpeg";
import stickerGermanyImg from "@/assets/stickers/sticker1.jpeg";
import stickerPortugalImg from "@/assets/stickers/sticker2.jpeg";
import stickerBrazilImg from "@/assets/stickers/sticker3.jpeg";

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
    id: "france-home-fff-stadium",
    img: franceHomeFrontImg,
    backImg: franceHomeBackImg,
    team: "France",
    season: "Home",
    name: "France Home Jersey",
    price: "₹600",
    priceValue: 600,
    badge: "New Arrival",
    palette: "Navy / White",
    fit: "Stadium Fit",
  },
  {
    id: "argentina-home-afa-authentic",
    img: argentinaHomeFrontImg,
    backImg: argentinaHomeBackImg,
    team: "Argentina",
    season: "Home",
    name: "Argentina Home Jersey",
    price: "₹600",
    priceValue: 600,
    badge: null,
    palette: "Sky / White",
    fit: "Match Fit",
  },
  {
    id: "argentina-away-afa-authentic",
    img: argentinaAwayFrontImg,
    backImg: argentinaAwayBackImg,
    team: "Argentina",
    season: "Away",
    name: "Argentina Away Jersey",
    price: "₹600",
    priceValue: 600,
    badge: "New Arrival",
    palette: "Blue / White",
    fit: "Match Fit",
  },
  {
    id: "brazil-away-cbf-stadium",
    img: brazilAwayFrontImg,
    backImg: brazilAwayBackImg,
    team: "Brazil",
    season: "Away",
    name: "Brazil Away Jersey",
    price: "₹600",
    priceValue: 600,
    badge: null,
    palette: "Blue / Yellow",
    fit: "Stadium Fit",
  },
  {
    id: "england-home-fa-stadium",
    img: englandHomeFrontImg,
    backImg: englandHomeBackImg,
    team: "England",
    season: "Home",
    name: "England Home Jersey",
    price: "₹600",
    priceValue: 600,
    badge: null,
    palette: "White / Navy",
    fit: "Stadium Fit",
  },
  {
    id: "germany-home-dfb-stadium",
    img: germanyHomeFrontImg,
    backImg: germanyHomeBackImg,
    team: "Germany",
    season: "Home",
    name: "Germany Home Jersey",
    price: "₹600",
    priceValue: 600,
    badge: "Limited",
    palette: "White / Black",
    fit: "Stadium Fit",
  },
  {
    id: "germany-away-dfb-stadium",
    img: germanyAwayFrontImg,
    backImg: germanyAwayBackImg,
    team: "Germany",
    season: "Away",
    name: "Germany Away Jersey",
    price: "₹600",
    priceValue: 600,
    badge: null,
    palette: "Pink / Purple",
    fit: "Stadium Fit",
  },
  {
    id: "japan-away-samurai-blue",
    img: japanAwayFrontImg,
    backImg: japanAwayBackImg,
    team: "Japan",
    season: "Away",
    name: "Japan Away Jersey",
    price: "₹600",
    priceValue: 600,
    badge: null,
    palette: "White / Blue",
    fit: "Stadium Fit",
  },
  {
    id: "portugal-away-fpf-stadium",
    img: portugalAwayFrontImg,
    backImg: portugalAwayBackImg,
    team: "Portugal",
    season: "Away",
    name: "Portugal Away Jersey",
    price: "₹600",
    priceValue: 600,
    badge: null,
    palette: "White / Red",
    fit: "Stadium Fit",
  },
  {
    id: "portugal-home-fpf-stadium",
    img: portugalHomeFrontImg,
    backImg: portugalHomeBackImg,
    team: "Portugal",
    season: "Home",
    name: "Portugal Home Jersey",
    price: "₹600",
    priceValue: 600,
    badge: "Restocked",
    palette: "Red / Green",
    fit: "Stadium Fit",
  },
  {
    id: "spain-home-rfef-stadium",
    img: spainHomeFrontImg,
    backImg: spainHomeBackImg,
    team: "Spain",
    season: "Home",
    name: "Spain Home Jersey",
    price: "₹600",
    priceValue: 600,
    badge: null,
    palette: "Red / Yellow",
    fit: "Stadium Fit",
  },
];

export type Product = (typeof products)[number];

export const stickerProducts = [
  {
    id: "germany-flag-wall-sticker",
    img: stickerGermanyImg,
    team: "Germany",
    season: "Wall Sticker",
    name: "Germany Flag Wall Sticker",
    price: "₹600",
    priceValue: 600,
    badge: "New",
    palette: "Black / Red / Gold",
    fit: "Wall Vinyl",
    category: "Sticker",
  },
  {
    id: "portugal-flag-wall-sticker",
    img: stickerPortugalImg,
    team: "Portugal",
    season: "Wall Sticker",
    name: "Portugal Flag Wall Sticker",
    price: "₹600",
    priceValue: 600,
    badge: "Wall Safe",
    palette: "Green / Red / Gold",
    fit: "Removable Vinyl",
    category: "Sticker",
  },
  {
    id: "brazil-flag-wall-sticker",
    img: stickerBrazilImg,
    team: "Brazil",
    season: "Wall Sticker",
    name: "Brazil Flag Wall Sticker",
    price: "₹600",
    priceValue: 600,
    badge: "Popular",
    palette: "Green / Yellow / Blue",
    fit: "Wall Vinyl",
    category: "Sticker",
  },
];

export type StickerProduct = (typeof stickerProducts)[number];
export type CatalogItem = Product | StickerProduct;

export function productPath(product: Product) {
  return `/products/${product.id}`;
}

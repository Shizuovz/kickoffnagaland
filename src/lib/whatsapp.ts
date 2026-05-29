import type { CatalogItem } from "@/lib/catalog";

export type WhatsAppOrderLine = {
  product: CatalogItem;
  quantity: number;
  size: string;
};

const defaultWhatsAppOrderNumber = "917005570316";
const whatsappOrderNumber =
  import.meta.env.VITE_WHATSAPP_ORDER_NUMBER ?? defaultWhatsAppOrderNumber;

export function buildWhatsAppUrl(message: string) {
  const cleanNumber = whatsappOrderNumber.replace(/\D/g, "");
  const baseUrl = cleanNumber ? `https://wa.me/${cleanNumber}` : "https://wa.me/";

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  window.location.assign(buildWhatsAppUrl(message));
}

export function buildSingleProductMessage({
  product,
  quantity = 1,
  size,
}: {
  product: CatalogItem;
  quantity?: number;
  size: string;
}) {
  return [
    "Hi Kickoff Nagaland, I want to order this item:",
    "",
    `Product: ${product.name}`,
    `Team: ${product.team}`,
    `Type: ${product.season}`,
    `Size: ${formatSize(size)}`,
    `Quantity: ${quantity}`,
    `Price: ${product.price}`,
    "",
    "Please confirm availability and payment details.",
  ].join("\n");
}

export function buildCartOrderMessage({
  itemCount,
  items,
  subtotal,
}: {
  itemCount: number;
  items: WhatsAppOrderLine[];
  subtotal: number;
}) {
  const productLines = items
    .map(({ product, quantity, size }, index) =>
      [
        `${index + 1}. ${product.name}`,
        `Team: ${product.team}`,
        `Type: ${product.season}`,
        `Size: ${formatSize(size)}`,
        `Quantity: ${quantity}`,
        `Unit Price: ${product.price}`,
        `Line Total: ₹${product.priceValue * quantity}`,
      ].join("\n"),
    )
    .join("\n\n");

  return [
    "Hi Kickoff Nagaland, I want to place this order:",
    "",
    "Products",
    `Total Items: ${itemCount}`,
    productLines,
    "",
    `Subtotal: ₹${subtotal}`,
    "",
    "Please confirm availability, delivery charges, and payment details.",
  ].join("\n");
}

export function formatSize(size: string) {
  return size === "OS" ? "One Size" : size;
}

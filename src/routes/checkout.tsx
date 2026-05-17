import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Footer, Nav } from "@/components/site-chrome";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout - Kickoff Nagaland" },
      {
        name: "description",
        content: "Complete your Kickoff Nagaland order through WhatsApp.",
      },
      { property: "og:title", content: "Checkout - Kickoff Nagaland" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Checkout,
});

const shippingOptions = [
  ["standard", "Standard Delivery", 12, "3-5 working days"],
  ["express", "Express Delivery", 24, "1-2 working days"],
] as const;

const whatsappOrderNumber = import.meta.env.VITE_WHATSAPP_ORDER_NUMBER ?? "";

type CheckoutItems = ReturnType<typeof useCart>["items"];
type ShippingOption = (typeof shippingOptions)[number];

function Checkout() {
  const { items, itemCount, subtotal } = useCart();
  const [shippingMethod, setShippingMethod] =
    useState<(typeof shippingOptions)[number][0]>("standard");
  const [checkoutError, setCheckoutError] = useState("");
  const selectedShipping =
    shippingOptions.find(([id]) => id === shippingMethod) ?? shippingOptions[0];
  const shipping = items.length > 0 ? selectedShipping[2] : 0;
  const serviceFee = items.length > 0 ? Math.round(subtotal * 0.03) : 0;
  const total = subtotal + shipping + serviceFee;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        <section className="border-b border-border px-6 py-14 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_380px] md:items-end">
            <div>
              <span className="mb-5 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
                Checkout
              </span>
              <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-tighter text-balance md:text-8xl">
                Confirm The Drop.
                <br />
                Send On WhatsApp.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              Review product options, delivery preference and contact details. Placing the order
              opens WhatsApp with everything ready to send.
            </p>
          </div>
        </section>

        {items.length === 0 ? (
          <section className="px-6 py-20 md:px-12">
            <div className="mx-auto max-w-7xl border-y border-border py-16">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Empty Checkout
              </p>
              <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
                Add a jersey or sticker before checkout.
              </h2>
              <Link
                to="/shop"
                className="mt-8 inline-block bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
              >
                Shop All
              </Link>
            </div>
          </section>
        ) : (
          <section className="grid border-b border-border lg:grid-cols-[1fr_460px]">
            <div className="px-6 py-12 md:px-12 md:py-16">
              <form
                className="mx-auto max-w-3xl space-y-14"
                onSubmit={(event) => {
                  event.preventDefault();
                  const orderNumber = `KON-${Date.now().toString().slice(-6)}`;
                  const message = buildWhatsAppOrderMessage({
                    formData: new FormData(event.currentTarget),
                    itemCount,
                    items,
                    orderNumber,
                    selectedShipping,
                    serviceFee,
                    shipping,
                    subtotal,
                    total,
                  });

                  if (message.length > 6500) {
                    setCheckoutError(
                      "The WhatsApp order message is too long. Please reduce the cart and try again.",
                    );
                    return;
                  }

                  setCheckoutError("");
                  window.location.assign(buildWhatsAppUrl(message));
                }}
              >
                <CheckoutBlock title="Contact">
                  <div className="grid gap-8 md:grid-cols-2">
                    <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                    <Field label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>
                </CheckoutBlock>

                <CheckoutBlock title="Shipping">
                  <div className="grid gap-8 md:grid-cols-2">
                    <Field label="First Name" name="firstName" placeholder="First name" />
                    <Field label="Last Name" name="lastName" placeholder="Last name" />
                  </div>
                  <Field label="Address" name="address" placeholder="House, street, landmark" />
                  <div className="grid gap-8 md:grid-cols-3">
                    <Field label="City" name="city" placeholder="Dimapur" />
                    <Field label="State" name="state" placeholder="Nagaland" />
                    <Field label="PIN Code" name="pinCode" placeholder="797112" />
                  </div>
                </CheckoutBlock>

                <CheckoutBlock title="Delivery">
                  <div className="grid gap-3">
                    {shippingOptions.map(([id, label, price, speed]) => (
                      <label
                        key={id}
                        className={`flex cursor-pointer items-center justify-between border p-4 transition-colors ${
                          shippingMethod === id
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        <span>
                          <span className="block text-sm font-black uppercase tracking-tight">
                            {label}
                          </span>
                          <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest opacity-70">
                            {speed}
                          </span>
                        </span>
                        <span className="font-mono text-sm">₹{price}</span>
                        <input
                          type="radio"
                          name="shipping"
                          value={id}
                          checked={shippingMethod === id}
                          onChange={() => setShippingMethod(id)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </CheckoutBlock>

                <CheckoutBlock title="Payment">
                  <label className="block">
                    <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Payment Method
                    </span>
                    <select
                      name="paymentMethod"
                      className="w-full border-b border-border bg-transparent py-3 text-sm font-medium outline-none transition-colors focus:border-foreground"
                    >
                      <option>UPI / Bank Transfer</option>
                      <option>Card on confirmation</option>
                      <option>Cash on local pickup</option>
                    </select>
                  </label>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Your WhatsApp message will include customer details, address, product names,
                    quantities, sizes and product image links.
                  </p>
                </CheckoutBlock>

                {checkoutError && (
                  <p className="border border-accent px-4 py-3 text-xs leading-relaxed text-accent">
                    {checkoutError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent md:w-auto"
                >
                  Place Order On WhatsApp
                </button>
              </form>
            </div>

            <aside className="border-t border-border bg-surface px-6 py-12 md:px-12 lg:border-l lg:border-t-0">
              <div className="sticky top-24">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Order Summary
                </p>
                <div className="divide-y divide-border border-y border-border">
                  {items.map(({ product, size, quantity }) => (
                    <article
                      key={`${product.id}-${size}`}
                      className="grid grid-cols-[76px_1fr] gap-4 py-5"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-stone-soft">
                        <img
                          src={product.img}
                          alt={`${product.team} ${product.season} ${product.name}`}
                          width={152}
                          height={203}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                              {product.team} / {product.season}
                            </p>
                            <h2 className="mt-1 text-sm font-black uppercase tracking-tight">
                              {product.name}
                            </h2>
                            <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                              {size === "OS" ? "One Size" : `Size ${size}`} / Qty {quantity}
                            </p>
                          </div>
                          <span className="font-mono text-xs">
                            ₹{product.priceValue * quantity}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="space-y-3 border-b border-border py-6 font-mono text-xs uppercase tracking-widest">
                  <SummaryRow label="Items" value={`${itemCount}`} />
                  <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
                  <SummaryRow label="Delivery" value={`₹${shipping}`} />
                  <SummaryRow label="Service" value={`₹${serviceFee}`} />
                </div>
                <div className="flex items-center justify-between py-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Total
                  </span>
                  <span className="font-mono text-2xl">₹{total}</span>
                </div>
              </div>
            </aside>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function buildWhatsAppOrderMessage({
  formData,
  itemCount,
  items,
  orderNumber,
  selectedShipping,
  serviceFee,
  shipping,
  subtotal,
  total,
}: {
  formData: FormData;
  itemCount: number;
  items: CheckoutItems;
  orderNumber: string;
  selectedShipping: ShippingOption;
  serviceFee: number;
  shipping: number;
  subtotal: number;
  total: number;
}) {
  const firstName = fieldValue(formData, "firstName");
  const lastName = fieldValue(formData, "lastName");
  const addressParts = [
    fieldValue(formData, "address"),
    fieldValue(formData, "city"),
    fieldValue(formData, "state"),
    fieldValue(formData, "pinCode"),
  ].filter(Boolean);

  const productLines = items
    .map(({ product, quantity, size }, index) => {
      const imageUrl =
        typeof window === "undefined"
          ? product.img
          : new URL(product.img, window.location.origin).href;

      return [
        `${index + 1}. ${product.name}`,
        `Team: ${product.team}`,
        `Type: ${product.season}`,
        `Size: ${size === "OS" ? "One Size" : size}`,
        `Quantity: ${quantity}`,
        `Unit Price: ${product.price}`,
        `Line Total: ₹${product.priceValue * quantity}`,
        `Image: ${imageUrl}`,
      ].join("\n");
    })
    .join("\n\n");

  return [
    `Kickoff Nagaland Order: ${orderNumber}`,
    "",
    "Customer Details",
    `Name: ${[firstName, lastName].filter(Boolean).join(" ")}`,
    `Email: ${fieldValue(formData, "email")}`,
    `Phone: ${fieldValue(formData, "phone")}`,
    `Address: ${addressParts.join(", ")}`,
    "",
    "Delivery",
    `Method: ${selectedShipping[1]} (${selectedShipping[3]})`,
    `Payment: ${fieldValue(formData, "paymentMethod")}`,
    "",
    "Products",
    `Total Products: ${itemCount}`,
    productLines,
    "",
    "Order Total",
    `Subtotal: ₹${subtotal}`,
    `Delivery: ₹${shipping}`,
    `Service: ₹${serviceFee}`,
    `Total: ₹${total}`,
  ].join("\n");
}

function buildWhatsAppUrl(message: string) {
  const cleanNumber = whatsappOrderNumber.replace(/\D/g, "");
  const baseUrl = cleanNumber ? `https://wa.me/${cleanNumber}` : "https://wa.me/";

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

function fieldValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function CheckoutBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-8">
      <h2 className="border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border-b border-border bg-transparent py-3 text-sm font-medium outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

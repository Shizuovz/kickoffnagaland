import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Footer, Nav } from "@/components/site-chrome";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout - Kickoff Nagaland" },
      {
        name: "description",
        content:
          "Complete your Kickoff Nagaland order with contact, shipping and payment details.",
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

function Checkout() {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState<(typeof shippingOptions)[number][0]>("standard");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const orderNumber = useMemo(() => `KON-${Date.now().toString().slice(-6)}`, []);
  const selectedShipping = shippingOptions.find(([id]) => id === shippingMethod) ?? shippingOptions[0];
  const shipping = items.length > 0 ? selectedShipping[2] : 0;
  const serviceFee = items.length > 0 ? Math.round(subtotal * 0.03) : 0;
  const total = subtotal + shipping + serviceFee;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="grid min-h-[72vh] place-items-center px-6 py-20 text-center md:px-12">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
              Order Placed
            </span>
            <h1 className="text-6xl font-black uppercase leading-[0.86] tracking-tighter text-balance md:text-8xl">
              Your kit is reserved.
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Order {orderNumber} has been received. A confirmation note and
              payment instructions will be sent to the email address you
              provided.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-block bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                Lock The Shirt.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              Review sizes, delivery preference and contact details before the
              order goes to the Kickoff Nagaland desk.
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
                Add a jersey before checkout.
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
                  setOrderPlaced(true);
                  clearCart();
                }}
              >
                <CheckoutBlock title="Contact">
                  <div className="grid gap-8 md:grid-cols-2">
                    <Field label="Email" type="email" placeholder="you@example.com" />
                    <Field label="Phone" type="tel" placeholder="+91 98765 43210" />
                  </div>
                </CheckoutBlock>

                <CheckoutBlock title="Shipping">
                  <div className="grid gap-8 md:grid-cols-2">
                    <Field label="First Name" placeholder="First name" />
                    <Field label="Last Name" placeholder="Last name" />
                  </div>
                  <Field label="Address" placeholder="House, street, landmark" />
                  <div className="grid gap-8 md:grid-cols-3">
                    <Field label="City" placeholder="Dimapur" />
                    <Field label="State" placeholder="Nagaland" />
                    <Field label="PIN Code" placeholder="797112" />
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
                        <span className="font-mono text-sm">${price}</span>
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
                    <select className="w-full border-b border-border bg-transparent py-3 text-sm font-medium outline-none transition-colors focus:border-foreground">
                      <option>UPI / Bank Transfer</option>
                      <option>Card on confirmation</option>
                      <option>Cash on local pickup</option>
                    </select>
                  </label>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    This demo checkout reserves the order and shows the intended
                    flow. A production payment gateway can be connected later.
                  </p>
                </CheckoutBlock>

                <button
                  type="submit"
                  className="w-full bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent md:w-auto"
                >
                  Place Order
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
                    <article key={`${product.id}-${size}`} className="grid grid-cols-[76px_1fr] gap-4 py-5">
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
                              Size {size} / Qty {quantity}
                            </p>
                          </div>
                          <span className="font-mono text-xs">
                            ${product.priceValue * quantity}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="space-y-3 border-b border-border py-6 font-mono text-xs uppercase tracking-widest">
                  <SummaryRow label="Items" value={`${itemCount}`} />
                  <SummaryRow label="Subtotal" value={`$${subtotal}`} />
                  <SummaryRow label="Delivery" value={`$${shipping}`} />
                  <SummaryRow label="Service" value={`$${serviceFee}`} />
                </div>
                <div className="flex items-center justify-between py-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Total
                  </span>
                  <span className="font-mono text-2xl">${total}</span>
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

function CheckoutBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
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
  type = "text",
  placeholder,
}: {
  label: string;
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

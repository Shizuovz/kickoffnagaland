import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer, Nav } from "@/components/site-chrome";
import { useCart } from "@/lib/cart";
import { buildCartOrderMessage, formatSize, openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Review Order - Kickoff Nagaland" },
      {
        name: "description",
        content: "Review your Kickoff Nagaland order and send it through WhatsApp.",
      },
      { property: "og:title", content: "Review Order - Kickoff Nagaland" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, itemCount, subtotal } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        <section className="border-b border-border px-6 py-14 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_380px] md:items-end">
            <div>
              <span className="mb-5 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
                Review Order
              </span>
              <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-tighter text-balance md:text-8xl">
                Send The Order.
                <br />
                Finish On WhatsApp.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              Check your sizes and quantities. The next tap opens WhatsApp with this order already
              written out.
            </p>
          </div>
        </section>

        {items.length === 0 ? (
          <section className="px-6 py-20 md:px-12">
            <div className="mx-auto max-w-7xl border-y border-border py-16">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Empty Order
              </p>
              <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
                Add a jersey before sending an order.
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
          <section className="grid border-b border-border lg:grid-cols-[1fr_420px]">
            <div className="px-6 py-12 md:px-12 md:py-16">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      Order Items
                    </p>
                    <h2 className="mt-2 text-3xl font-black uppercase tracking-tighter">
                      {itemCount} Item{itemCount === 1 ? "" : "s"}
                    </h2>
                  </div>
                  <Link
                    to="/shop"
                    className="font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    Add more
                  </Link>
                </div>

                <div className="divide-y divide-border border-y border-border">
                  {items.map(({ product, size, quantity }) => (
                    <article
                      key={`${product.id}-${size}`}
                      className="grid grid-cols-[86px_1fr] gap-5 py-6 md:grid-cols-[112px_1fr]"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-stone-soft">
                        <img
                          src={product.img}
                          alt={`${product.team} ${product.season} ${product.name}`}
                          width={224}
                          height={299}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col justify-between gap-5">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                              {product.team} / {product.season}
                            </p>
                            <h3 className="mt-1 text-lg font-black uppercase leading-tight tracking-tight">
                              {product.name}
                            </h3>
                          </div>
                          <span className="font-mono text-sm">
                            ₹{product.priceValue * quantity}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          Size {formatSize(size)} / Qty {quantity} / {product.price} each
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-t border-border bg-surface px-6 py-12 md:px-12 lg:border-l lg:border-t-0">
              <div className="sticky top-24">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  WhatsApp Checkout
                </p>
                <div className="space-y-4 border-y border-border py-6 font-mono text-xs uppercase tracking-widest">
                  <SummaryRow label="Items" value={`${itemCount}`} />
                  <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Delivery charges, address, and payment will be confirmed directly on WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(buildCartOrderMessage({ itemCount, items, subtotal }))
                  }
                  className="mt-8 w-full bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
                >
                  Send On WhatsApp
                </button>
              </div>
            </aside>
          </section>
        )}
      </main>

      <Footer />
    </div>
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

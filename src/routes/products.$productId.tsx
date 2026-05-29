import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer, Nav } from "@/components/site-chrome";
import { products } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { buildSingleProductMessage, openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = products.find((item) => item.id === params.productId);

    return {
      meta: [
        {
          title: product ? `${product.name} - Kickoff Nagaland` : "Product - Kickoff Nagaland",
        },
        {
          name: "description",
          content: product
            ? `${product.team} ${product.season} jersey. ${product.fit}, ${product.palette}.`
            : "Kickoff Nagaland product detail page.",
        },
        {
          property: "og:title",
          content: product ? `${product.name} - Kickoff Nagaland` : "Product - Kickoff Nagaland",
        },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ProductDetail,
});

const detailRows = [
  ["Material", "Breathable performance knit with collector-grade finish."],
  ["Care", "Cold wash inside out. Hang dry. Do not iron crest or sponsor marks."],
  ["Shipping", "Ships from Kickoff Nagaland with tracked delivery options."],
];
const sizes = ["S", "M", "L", "XL", "XXL"];

function ProductDetail() {
  const { productId } = Route.useParams();
  const product = products.find((item) => item.id === productId);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="grid min-h-[70vh] place-items-center px-6 py-20 text-center">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Product Missing
            </p>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
              This kit is no longer in the rack.
            </h1>
            <Link
              to="/shop"
              className="mt-8 inline-block bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
            >
              Back To Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .filter((item) => item.team === product.team || item.fit === product.fit)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        <section className="grid border-b border-border lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-border bg-stone-soft p-6 lg:border-b-0 lg:border-r lg:p-12">
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                [product.img, "front"],
                [product.backImg, "back"],
              ].map(([image, side]) => (
                <div key={side} className="overflow-hidden bg-background">
                  <img
                    src={image}
                    alt={`${product.team} ${product.season} ${product.name} ${side}`}
                    width={1200}
                    height={1600}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
            <Link
              to="/shop"
              className="mb-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
            >
              Back to shop
            </Link>
            {product.badge && (
              <span className="mb-5 inline-block self-start bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
                {product.badge}
              </span>
            )}
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {product.team} / {product.season}
            </p>
            <h1 className="text-6xl font-black uppercase leading-[0.86] tracking-tighter text-balance md:text-8xl">
              {product.name}
            </h1>
            <p className="mt-6 font-mono text-2xl">{product.price}</p>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              A focused national team shirt selected for its silhouette, tournament energy and
              long-term archive value. Built for match days, travel days and the kind of collection
              that remembers the score before the scoreboard.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border">
              {[
                ["Fit", product.fit],
                ["Palette", product.palette],
                ["Team", product.team],
                ["Season", product.season],
              ].map(([label, value]) => (
                <div key={label} className="bg-background p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-tight">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Size
              </p>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    buildSingleProductMessage({
                      product,
                      size: selectedSize,
                    }),
                  )
                }
                className="bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
              >
                Buy On WhatsApp
              </button>
              <button
                type="button"
                onClick={() => addItem(product, selectedSize)}
                className="border border-border px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:border-foreground hover:bg-surface"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[320px_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Product Notes
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {detailRows.map(([label, body]) => (
                <div key={label} className="grid gap-4 py-8 md:grid-cols-[180px_1fr]">
                  <h2 className="text-lg font-black uppercase tracking-tighter">{label}</h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="border-t border-border px-6 py-16 md:px-12">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    Related
                  </p>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tighter">
                    Same Energy
                  </h2>
                </div>
                <Link
                  to="/shop"
                  className="font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 transition-colors hover:text-accent"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    to="/products/$productId"
                    params={{ productId: item.id }}
                    className="group"
                  >
                    <div className="mb-4 aspect-[3/4] overflow-hidden bg-stone-soft">
                      <img
                        src={item.img}
                        alt={`${item.team} ${item.season} ${item.name}`}
                        width={800}
                        height={1067}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </div>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">
                      {item.team} / {item.season}
                    </p>
                    <h3 className="mt-1 text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

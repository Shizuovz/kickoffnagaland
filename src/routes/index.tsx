import { Link, createFileRoute } from "@tanstack/react-router";
import { Footer, Nav } from "@/components/site-chrome";
import lookbookImg from "@/assets/lookbook.jpg";
import { products, stickerProducts, teams } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import heroVideo from "../assets/video/hero.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kickoff Nagaland — World Cup Jerseys, Worn by Champions" },
      {
        name: "description",
        content:
          "Premium World Cup national team jerseys, football stickers and match-day accessories. Built for the modern collector.",
      },
      { property: "og:title", content: "Kickoff Nagaland — Worn by Champions" },
      {
        property: "og:description",
        content: "Premium World Cup national team jerseys for the modern collector.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  const { requestAddToCart } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative isolate flex h-[88vh] min-h-[640px] flex-col justify-end overflow-hidden bg-foreground p-8 text-background md:p-16">
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Football jersey campaign film"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.006_40/0.78)_0%,oklch(0.12_0.006_40/0.48)_43%,oklch(0.12_0.006_40/0.08)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,oklch(0.12_0.006_40/0.72)_0%,transparent_42%)]" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <span className="mb-4 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground animate-fade-up">
            World Cup 2026 Series
          </span>
          <h1 className="mb-8 inline-block rounded-[15px] border border-background/10 bg-accent px-6 py-4 text-5xl font-black uppercase leading-[0.9] tracking-tighter text-accent-foreground shadow-2xl animate-fade-up md:px-8 md:py-5 md:text-8xl">
            Worn by <br />
            Champions.
          </h1>
          <div className="flex flex-wrap gap-4 animate-fade-up-delay">
            <Link
              to="/shop"
              className="bg-background px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Shop the Drop
            </Link>
            <a
              href="#lookbook"
              className="border border-background px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-background hover:text-foreground"
            >
              The Lookbook
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 border-y border-border overflow-hidden whitespace-nowrap bg-surface">
        <div className="inline-block animate-marquee">
          {[...teams, ...teams].map((t, i) => (
            <span key={i} className="font-mono text-sm mx-12 uppercase tracking-wider">
              {t}
              <span className="text-accent ml-12">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Grid */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-3">
                Vol. 01
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                The Match Essentials
              </h2>
            </div>
            <Link
              to="/shop"
              className="font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors"
            >
              View all 48 kits
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => (
              <article key={p.name} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-soft mb-4">
                  <Link
                    to="/products/$productId"
                    params={{ productId: p.id }}
                    className="block h-full w-full"
                  >
                    <img
                      src={p.img}
                      alt={`${p.team} ${p.season} ${p.name}`}
                      width={800}
                      height={1067}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </Link>
                  {p.badge && (
                    <div className="absolute top-4 left-4 bg-foreground text-background text-[9px] font-bold px-2 py-1 uppercase tracking-widest">
                      {p.badge}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => requestAddToCart(p)}
                    className="absolute inset-x-4 bottom-4 bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest text-background opacity-100 transition-all duration-300 hover:bg-accent md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                  >
                    Add to Cart
                  </button>
                </div>
                <Link
                  to="/products/$productId"
                  params={{ productId: p.id }}
                  className="flex justify-between items-start"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">
                      {p.team} / {p.season}
                    </p>
                    <h3 className="font-bold uppercase text-sm tracking-tight">{p.name}</h3>
                  </div>
                  <span className="font-mono text-sm">{p.price}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sticker Drop */}
      <section className="border-y border-border bg-surface px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="mb-5 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
              Sticker Drop
            </span>
            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
              Football For
              <br />
              Every Surface.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Laptop stickers, wall sets and weatherproof decals made for rooms, bottles, cases and
              match-day corners.
            </p>
            <Link
              to="/stickers"
              className="mt-8 inline-block bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
            >
              Shop Stickers
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stickerProducts.slice(0, 3).map((sticker, index) => (
              <article key={sticker.id} className="group">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={sticker.img}
                    alt={`${sticker.team} ${sticker.name}`}
                    width={900}
                    height={675}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="bg-background px-2 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground">
                      0{index + 1}
                    </span>
                    {sticker.badge && (
                      <span className="bg-foreground px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-background">
                        {sticker.badge}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => requestAddToCart(sticker)}
                    className="absolute inset-x-4 bottom-4 bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest text-background opacity-100 transition-all duration-300 hover:bg-accent md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="flex justify-between gap-4">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">
                      {sticker.season} / {sticker.palette}
                    </p>
                    <h3 className="text-sm font-bold uppercase tracking-tight">{sticker.name}</h3>
                  </div>
                  <span className="font-mono text-sm">{sticker.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Lookbook */}
      <section
        id="lookbook"
        className="grid scroll-mt-24 md:grid-cols-2 bg-foreground text-background"
      >
        <div className="relative aspect-square md:aspect-auto md:min-h-[640px] overflow-hidden">
          <img
            src={lookbookImg}
            alt="Model wearing a national team jersey on a Parisian street at golden hour"
            width={1200}
            height={1440}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-12 md:p-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
            Volume 01 — The Journal
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-balance">
            Beyond the <br />
            90 Minutes
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            The jersey is more than equipment. It is an archive of moments, a weight of history, and
            the uniform of a global identity.
          </p>
          <a
            href="#"
            className="inline-block self-start border-b border-background pb-2 text-[11px] font-bold uppercase tracking-widest hover:text-accent hover:border-accent transition-all"
          >
            Explore the Archive →
          </a>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            ["48+", "National Kits"],
            ["1930", "Heritage Since"],
            ["72h", "Global Shipping"],
            ["100%", "Authenticated"],
          ].map(([n, l]) => (
            <div key={l} className="p-8 md:p-12">
              <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2">{n}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

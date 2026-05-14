import { Link, createFileRoute } from "@tanstack/react-router";
import { Footer, Nav } from "@/components/site-chrome";
import { products, teams } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Jerseys - Kickoff Nagaland" },
      {
        name: "description",
        content:
          "Shop every Kickoff Nagaland national team jersey, from current World Cup kits to archive collector editions.",
      },
      { property: "og:title", content: "Shop All Jerseys - Kickoff Nagaland" },
      {
        property: "og:description",
        content:
          "Premium national team jerseys, match editions, stadium fits and archive collector shirts.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ShopAll,
});

const filters = ["All Kits", "Home", "Away", "Archive", "Limited"];
const sortOptions = ["Featured", "Newest", "Price"];

function ShopAll() {
  const { requestAddToCart } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        <section className="border-b border-border px-6 py-14 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_360px] md:items-end">
            <div>
              <span className="mb-5 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
                Shop All
              </span>
              <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-tighter text-balance md:text-8xl">
                Every Nation.
                <br />
                Every Era.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              Match-grade silhouettes, stadium staples and collector archive
              shirts selected for modern supporters in Nagaland and beyond.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-surface px-6 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                    index === 0
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 overflow-x-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Sort</span>
              {sortOptions.map((option, index) => (
                <button
                  key={option}
                  className={`whitespace-nowrap transition-colors hover:text-foreground ${
                    index === 0 ? "text-foreground" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="hidden border-r border-border pr-8 lg:block">
              <div className="sticky top-24">
                <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  National Teams
                </h2>
                <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
                  {teams.slice(0, 10).map((team) => (
                    <li key={team}>
                      <a
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {team}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div>
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {products.length} Jerseys
                  </p>
                  <h2 className="mt-2 text-2xl font-black uppercase tracking-tighter md:text-3xl">
                    Available Now
                  </h2>
                </div>
                <a
                  href="#"
                  className="hidden font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 transition-colors hover:text-accent md:inline-block"
                >
                  Size Guide
                </a>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article key={`${product.team}-${product.name}`} className="group cursor-pointer">
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-stone-soft">
                      <Link
                        to="/products/$productId"
                        params={{ productId: product.id }}
                        className="block h-full w-full"
                      >
                        <img
                          src={product.img}
                          alt={`${product.team} ${product.season} ${product.name}`}
                          width={800}
                          height={1067}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                      </Link>
                      {product.badge && (
                        <div className="absolute left-4 top-4 bg-foreground px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-background">
                          {product.badge}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => requestAddToCart(product)}
                        className="absolute inset-x-4 bottom-4 bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest text-background opacity-100 transition-all duration-300 hover:bg-accent md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                      >
                        Add to Cart
                      </button>
                    </div>
                    <Link
                      to="/products/$productId"
                      params={{ productId: product.id }}
                      className="flex justify-between gap-4"
                    >
                      <div>
                        <p className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">
                          {product.team} / {product.season}
                        </p>
                        <h3 className="text-sm font-bold uppercase tracking-tight">
                          {product.name}
                        </h3>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {product.fit} / {product.palette}
                        </p>
                      </div>
                      <span className="font-mono text-sm">{product.price}</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-foreground px-6 py-14 text-background md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
              Built for the stand.
              <br />
              Framed for the archive.
            </h2>
            <a
              href="#"
              className="self-start border-b border-background pb-2 text-[11px] font-bold uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
            >
              Explore collector notes -&gt;
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

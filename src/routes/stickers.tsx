import { createFileRoute, Link } from "@tanstack/react-router";
import lookbookImg from "@/assets/lookbook.jpg";
import { Footer, Nav } from "@/components/site-chrome";
import { stickerProducts } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import hero from "../assets/hero-jersey.jpg";

export const Route = createFileRoute("/stickers")({
  head: () => ({
    meta: [
      { title: "Football Stickers - Kickoff Nagaland" },
      {
        name: "description",
        content:
          "Shop football laptop stickers, wall stickers, sticker sheets and football-inspired decals from Kickoff Nagaland.",
      },
      { property: "og:title", content: "Football Stickers - Kickoff Nagaland" },
      {
        property: "og:description",
        content:
          "Football-inspired sticker packs for laptops, rooms, gear cases and match-day spaces.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Stickers,
});

const uses = ["Laptop", "Wall", "Bottle", "Boot Bag", "Notebook", "Phone Case"];

const notes = [
  ["Matte Vinyl", "Smooth finish for laptops, notebooks and everyday carry."],
  ["Wall Safe", "Selected sets use removable adhesive for clean indoor surfaces."],
  ["Weather Ready", "Durable sheets built for bottles, cases and travel gear."],
];

function Stickers() {
  const { requestAddToCart } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        <section className="relative isolate overflow-hidden border-b border-border bg-foreground px-6 py-16 text-background md:px-12 md:py-24">
          <div className="absolute inset-0 -z-10 opacity-45">
            <img
              src={hero}
              alt=""
              width={1920}
              height={1280}
              className="h-full w-full object-cover object-[58%_center]"
            />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_360px] md:items-end">
            <div>
              <span className="mb-5 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
                Sticker Drop
              </span>
              <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.84] tracking-tighter text-balance md:text-8xl">
                Football For
                <br />
                Every Surface.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-background/72 md:text-base">
              Laptop stickers, wall sets and weatherproof football decals for the places your jersey
              cannot go.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-surface px-6 md:px-12">
          <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto py-5">
            {uses.map((use) => (
              <span
                key={use}
                className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
              >
                {use}
              </span>
            ))}
          </div>
        </section>

        <section className="px-6 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Available Now
                </p>
                <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
                  Sticker Packs
                </h2>
              </div>
              <Link
                to="/shop"
                className="self-start font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 transition-colors hover:text-accent"
              >
                Match with jerseys
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {stickerProducts.map((sticker, index) => (
                <article key={sticker.id} className="group">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-stone-soft">
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
                      Add To Cart
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

        <section className="grid bg-foreground text-background md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[620px]">
            <img
              src={lookbookImg}
              alt="Football lifestyle lookbook scene"
              width={1200}
              height={1440}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-10 md:p-20">
            <span className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Surface Notes
            </span>
            <h2 className="mb-8 text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
              Built For Rooms,
              <br />
              Cases And Carry.
            </h2>
            <div className="divide-y divide-background/15 border-y border-background/15">
              {notes.map(([title, body]) => (
                <div key={title} className="grid gap-4 py-6 md:grid-cols-[160px_1fr]">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-background/70">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

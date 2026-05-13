import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-jersey.jpg";
import franceImg from "@/assets/jersey-france.jpg";
import argentinaImg from "@/assets/jersey-argentina.jpg";
import japanImg from "@/assets/jersey-japan.jpg";
import brazilImg from "@/assets/jersey-brazil.jpg";
import lookbookImg from "@/assets/lookbook.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kickoff Nagaland — World Cup Jerseys, Worn by Champions" },
      {
        name: "description",
        content:
          "Premium World Cup national team jerseys. Authentic match-grade silhouettes from Argentina, Brazil, France, Japan and more. Built for the modern collector.",
      },
      { property: "og:title", content: "Kickoff Nagaland — Worn by Champions" },
      {
        property: "og:description",
        content:
          "Premium World Cup national team jerseys for the modern collector.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const teams = [
  "Argentina", "Brazil", "France", "Germany",
  "Portugal", "England", "Italy", "Netherlands",
  "Spain", "Japan", "Croatia", "Morocco",
];

const products = [
  {
    img: franceImg,
    team: "France / 2024 Home",
    name: "FFF Stadium Edition",
    price: "$120",
    badge: "New Arrival",
  },
  {
    img: argentinaImg,
    team: "Argentina / 2024 Home",
    name: "AFA Authentic Three-Star",
    price: "$160",
    badge: null,
  },
  {
    img: japanImg,
    team: "Japan / 2024 Special",
    name: "Samurai Blue Kit",
    price: "$140",
    badge: "Limited",
  },
  {
    img: brazilImg,
    team: "Brazil / 2024 Home",
    name: "CBF Seleção Edition",
    price: "$120",
    badge: null,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative h-[88vh] min-h-[640px] overflow-hidden flex flex-col justify-end p-8 md:p-16">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Close-up of a premium white football jersey with embroidered gold crest"
            width={1920}
            height={1280}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        </div>
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block animate-fade-up">
            World Cup 2024 Series
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-balance mb-8 animate-fade-up">
            Worn by <br />
            Champions.
          </h1>
          <div className="flex flex-wrap gap-4 animate-fade-up-delay">
            <button className="px-8 py-4 bg-foreground text-background font-bold uppercase text-xs tracking-widest hover:bg-accent transition-colors">
              Shop the Drop
            </button>
            <button className="px-8 py-4 border border-foreground font-bold uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all">
              The Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 border-y border-border overflow-hidden whitespace-nowrap bg-surface">
        <div className="inline-block animate-marquee">
          {[...teams, ...teams].map((t, i) => (
            <span
              key={i}
              className="font-mono text-sm mx-12 uppercase tracking-wider"
            >
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
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors"
            >
              View all 48 kits
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => (
              <article key={p.name} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-soft mb-4">
                  <img
                    src={p.img}
                    alt={`${p.team} ${p.name}`}
                    width={800}
                    height={1067}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  {p.badge && (
                    <div className="absolute top-4 left-4 bg-foreground text-background text-[9px] font-bold px-2 py-1 uppercase tracking-widest">
                      {p.badge}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">
                      {p.team}
                    </p>
                    <h3 className="font-bold uppercase text-sm tracking-tight">
                      {p.name}
                    </h3>
                  </div>
                  <span className="font-mono text-sm">{p.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Lookbook */}
      <section className="grid md:grid-cols-2 bg-foreground text-background">
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
            The jersey is more than equipment. It is an archive of moments, a
            weight of history, and the uniform of a global identity.
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
              <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                {n}
              </div>
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

function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex gap-10 items-center">
        <a href="/" className="text-xl font-black tracking-tighter uppercase">
          Kickoff<span className="text-accent">/</span>Nagaland
        </a>
        <div className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-accent transition-colors">Shop All</a>
          <a href="#" className="hover:text-accent transition-colors">National Teams</a>
          <a href="#" className="hover:text-accent transition-colors">Collections</a>
          <a href="#" className="hover:text-accent transition-colors">Archive</a>
        </div>
      </div>
      <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest">
        <a href="#" className="hover:text-accent transition-colors">Search</a>
        <a href="#" className="hover:text-accent transition-colors">Cart (0)</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-surface pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-black tracking-tighter uppercase mb-6">
              Pitch<span className="text-accent">/</span>Side
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-[220px]">
              Premium football apparel and national team archives, curated for
              the modern enthusiast.
            </p>
          </div>
          <FooterCol
            title="Quick Links"
            items={["New Releases", "National Teams", "Customization", "Care Guide"]}
          />
          <FooterCol
            title="Company"
            items={["About", "Sustainability", "Privacy", "Terms"]}
          />
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">
              Newsletter
            </h4>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border-b border-border py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-8 border-t border-border">
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
            © 2026 Pitch-Side Collective
          </span>
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
            Built for Champions
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-bold uppercase text-xs tracking-widest mb-6">{title}</h4>
      <ul className="space-y-3 text-xs text-muted-foreground uppercase tracking-tight">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-foreground transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-jersey.jpg";
import lookbookImg from "@/assets/lookbook.jpg";
import { Footer, Nav } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Kickoff Nagaland" },
      {
        name: "description",
        content:
          "Learn about Kickoff Nagaland, an editorial football jersey store curating national team kits, archive shirts and collector pieces.",
      },
      { property: "og:title", content: "About Us - Kickoff Nagaland" },
      {
        property: "og:description",
        content:
          "A football jersey collective built for supporters, collectors and the stories behind national team kits.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: About,
});

const principles = [
  {
    label: "01",
    title: "Authenticity First",
    body: "Every shirt is selected for construction, provenance and detail. We treat jerseys as cultural objects, not seasonal graphics.",
  },
  {
    label: "02",
    title: "Football As Memory",
    body: "A national kit carries finals, street games, family watch parties and long-distance loyalties. Our archive is built around that emotional weight.",
  },
  {
    label: "03",
    title: "Nagaland To The World",
    body: "We serve local supporters with a global eye: clean curation, reliable drops and a store experience that feels sharp, direct and collector-grade.",
  },
];

const timeline = [
  ["2018", "Started as a small circle sourcing rare national team shirts for friends and match-day collectors."],
  ["2022", "Expanded into World Cup-focused drops, pairing modern kits with archive references and fit notes."],
  ["2026", "Built Kickoff Nagaland as a dedicated football apparel destination for supporters across the region."],
];

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        <section className="relative isolate overflow-hidden border-b border-border px-6 py-16 md:px-12 md:py-24">
          <div className="absolute inset-0 -z-10 opacity-20">
            <img
              src={heroImg}
              alt=""
              width={1920}
              height={1280}
              className="h-full w-full object-cover object-[58%_center]"
            />
            <div className="absolute inset-0 bg-background/70" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_420px] md:items-end">
            <div>
              <span className="mb-5 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
                About Us
              </span>
              <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-tighter text-balance md:text-8xl">
                Built For The Shirt.
                <br />
                Kept For The Story.
              </h1>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Kickoff Nagaland is a football jersey collective curating national
              team kits for supporters who care about fabric, history, fit and
              the feeling of wearing a country on match day.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[320px_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Our Point Of View
              </p>
            </div>
            <div className="max-w-4xl">
              <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-balance md:text-6xl">
                A jersey is not merchandise. It is a timestamp.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We built this store for people who remember tournaments by the
                kit: the collar shape, the crest placement, the sponsorless
                chest, the shade of blue or yellow that instantly brings back a
                summer. Our job is to make those pieces easier to discover,
                compare and keep.
              </p>
            </div>
          </div>
        </section>

        <section className="grid border-y border-border md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="border-b border-border p-8 md:border-b-0 md:border-r md:p-12 last:md:border-r-0">
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {principle.label}
              </p>
              <h3 className="mb-5 text-2xl font-black uppercase tracking-tighter">
                {principle.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </article>
          ))}
        </section>

        <section className="grid bg-foreground text-background md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[680px]">
            <img
              src={lookbookImg}
              alt="Football jersey editorial lookbook scene"
              width={1200}
              height={1440}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-10 md:p-20">
            <span className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              The Collective
            </span>
            <h2 className="mb-8 text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
              Curated In Small Drops.
              <br />
              Chosen With Intent.
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-neutral-400 md:text-base">
              We do not try to stock everything. We focus on shirts with a
              strong reason to exist: tournament relevance, archive value,
              distinctive construction or a design language that still feels
              alive years later.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[320px_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Timeline
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {timeline.map(([year, body]) => (
                <div key={year} className="grid gap-4 py-8 md:grid-cols-[140px_1fr]">
                  <div className="font-mono text-sm uppercase tracking-widest">
                    {year}
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-14 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
              Ready For The Next Drop?
            </h2>
            <Link
              to="/shop"
              className="self-start bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
            >
              Shop All
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

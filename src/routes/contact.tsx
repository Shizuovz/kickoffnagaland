import { createFileRoute, Link } from "@tanstack/react-router";
import lookbookImg from "@/assets/lookbook.jpg";
import { Footer, Nav } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us - Kickoff Nagaland" },
      {
        name: "description",
        content:
          "Contact Kickoff Nagaland for jersey sizing, order support, sourcing requests and collection questions.",
      },
      { property: "og:title", content: "Contact Us - Kickoff Nagaland" },
      {
        property: "og:description",
        content:
          "Reach the Kickoff Nagaland team for support, sourcing requests and football jersey collection help.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Contact,
});

const contactMethods = [
  [
    "Order Support",
    "kickoffnagaland@gmail.com",
    "Tracking, exchanges, delivery updates and payment questions.",
  ],
  [
    "Sourcing Desk",
    "kickoffnagaland@gmail.com",
    "Rare national team kits, archive shirts and collector requests.",
  ],
  [
    "General",
    "kickoffnagaland@gmail.com",
    "Partnerships, press, local events and everything else.",
  ],
];

const faqs = [
  [
    "Do you help with sizing?",
    "Yes. Send us your height, weight, preferred fit and a shirt you already own. We will recommend the closest match.",
  ],
  [
    "Can I request a specific team kit?",
    "Yes. Our sourcing desk keeps a request list for national team shirts, archive editions and tournament drops.",
  ],
  [
    "Where do you ship?",
    "We currently support domestic delivery and selected international orders. Shipping options are confirmed on WhatsApp.",
  ],
];

function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        <section className="border-b border-border px-6 py-14 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_380px] md:items-end">
            <div>
              <span className="mb-5 inline-block bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.45em] text-accent-foreground">
                Contact Us
              </span>
              <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-tighter text-balance md:text-8xl">
                Ask About The Fit.
                <br />
                Ask About The Shirt.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              Need sizing help, order support or a hard-to-find national team jersey? Send the
              details and we will point you in the right direction.
            </p>
          </div>
        </section>

        <section className="grid border-b border-border md:grid-cols-[1fr_0.8fr]">
          <div className="px-6 py-12 md:px-12 md:py-16">
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Message The Team
              </p>
              <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Name
                    </span>
                    <input
                      type="text"
                      className="w-full border-b border-border bg-transparent py-3 text-sm font-medium outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Email
                    </span>
                    <input
                      type="email"
                      className="w-full border-b border-border bg-transparent py-3 text-sm font-medium outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Topic
                  </span>
                  <select className="w-full border-b border-border bg-transparent py-3 text-sm font-medium outline-none transition-colors focus:border-foreground">
                    <option>Order support</option>
                    <option>Sizing help</option>
                    <option>Sourcing request</option>
                    <option>General question</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    rows={6}
                    className="w-full resize-none border-b border-border bg-transparent py-3 text-sm font-medium leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                    placeholder="Tell us the team, season, size or order detail you need help with."
                  />
                </label>

                <button
                  type="submit"
                  className="bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <aside className="border-t border-border bg-surface px-6 py-12 md:border-l md:border-t-0 md:px-12 md:py-16">
            <div className="sticky top-24">
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Direct Lines
              </p>
              <div className="divide-y divide-border border-y border-border">
                {contactMethods.map(([title, email, body]) => (
                  <div key={title} className="py-6">
                    <h2 className="mb-2 text-lg font-black uppercase tracking-tighter">{title}</h2>
                    <a
                      href={`mailto:${email}`}
                      className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-foreground"
                    >
                      {email}
                    </a>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid bg-foreground text-background md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[560px]">
            <img
              src={lookbookImg}
              alt="Football jersey lookbook contact scene"
              width={1200}
              height={1440}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-10 md:p-20">
            <span className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Visit By Appointment
            </span>
            <h2 className="mb-8 text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
              Local Pickups.
              <br />
              Private Viewing.
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-neutral-400 md:text-base">
              For collectors in Nagaland, selected drops can be viewed by appointment. Send your
              preferred team, size and date, and we will confirm availability before you come in.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[320px_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Quick Answers
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map(([question, answer]) => (
                <div key={question} className="grid gap-4 py-8 md:grid-cols-[280px_1fr]">
                  <h3 className="text-lg font-black uppercase tracking-tighter">{question}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-14 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
              Looking For A Kit Now?
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

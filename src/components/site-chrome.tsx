import { Link } from "@tanstack/react-router";
import { Menu, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { products, stickerProducts } from "@/lib/catalog";
import { buildCartOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import logo from "../assets/logo/kickoff-no-bg-b.png";

export function Nav() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    items,
    itemCount,
    subtotal,
    decrementItem,
    removeItem,
    addItem,
    requestAddToCart,
    clearCart,
  } = useCart();
  const catalogItems = useMemo(() => [...products, ...stickerProducts], []);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedQuery) {
      return catalogItems;
    }

    return catalogItems.filter((product) =>
      [
        product.name,
        product.team,
        product.season,
        product.fit,
        product.palette,
        product.badge ?? "",
        "category" in product ? `${product.category} stickers decals` : "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [catalogItems, normalizedQuery]);
  const navLinks = [
    ["Shop All", "/shop"],
    ["Stickers", "/stickers"],
    ["About Us", "/about"],
    ["Contact", "/contact"],
  ] as const;

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-2 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex gap-10 items-center">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase">
            <img src={logo} alt="Kickoff Nagaland" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-widest">
            {navLinks.map(([label, to]) => (
              <Link key={to} to={to} className="hover:text-accent transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest md:gap-6">
          <button
            type="button"
            aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            onClick={() => setIsCartOpen(true)}
            className={`relative grid size-9 place-items-center border transition-colors hover:border-foreground md:hidden ${
              itemCount > 0 ? "border-foreground bg-foreground text-background" : "border-border"
            }`}
          >
            <ShoppingBag className="size-4" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 grid size-5 place-items-center bg-accent font-mono text-[10px] font-bold text-accent-foreground">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            className="grid size-9 place-items-center border border-border transition-colors hover:border-foreground md:hidden"
          >
            <Menu className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(true);
              setSearchQuery("");
            }}
            className="hidden transition-colors hover:text-accent md:inline"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="hidden transition-colors hover:text-accent md:inline"
          >
            Cart ({itemCount})
          </button>
        </div>
      </nav>

      {itemCount > 0 && !isCartOpen && !isMenuOpen && !isSearchOpen && (
        <div className="fixed inset-x-3 bottom-3 z-40 border border-foreground bg-background shadow-2xl md:hidden">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
          >
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-accent">
                Cart Updated
              </span>
              <span className="mt-1 block text-xs font-black uppercase tracking-widest">
                {itemCount} item{itemCount === 1 ? "" : "s"} in cart
              </span>
            </span>
            <span className="bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-background">
              View
            </span>
          </button>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-foreground/45"
            onClick={() => setIsMenuOpen(false)}
          />
          <section className="absolute inset-x-0 top-0 border-b border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <img src={logo} alt="Kickoff Nagaland" className="h-12 w-auto" />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
                className="grid size-10 place-items-center border border-border transition-colors hover:border-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="px-6 py-8">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Navigation
              </p>
              <div className="divide-y divide-border border-y border-border">
                {navLinks.map(([label, to], index) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between py-5 transition-colors hover:text-accent"
                  >
                    <span className="text-3xl font-black uppercase leading-[0.9] tracking-tighter">
                      {label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                    setSearchQuery("");
                  }}
                  className="flex-1 border border-border px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors hover:border-foreground"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 bg-foreground px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
                >
                  Cart ({itemCount})
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-[75]">
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-foreground/45"
            onClick={() => setIsSearchOpen(false)}
          />
          <section className="absolute inset-x-0 top-0 max-h-[88vh] overflow-y-auto border-b border-border bg-background shadow-2xl">
            <div className="mx-auto max-w-7xl px-6 py-6 md:px-12 md:py-8">
              <div className="mb-8 flex items-center justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    Search The Drop
                  </p>
                  <h2 className="mt-1 text-3xl font-black uppercase tracking-tighter md:text-5xl">
                    Find An Item
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setIsSearchOpen(false)}
                  className="grid size-10 shrink-0 place-items-center border border-border transition-colors hover:border-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              <label className="relative block border-b border-foreground">
                <Search className="absolute left-0 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by country, sticker, fit or color"
                  className="w-full bg-transparent py-5 pl-9 pr-4 text-2xl font-black uppercase tracking-tighter outline-none placeholder:text-muted-foreground md:text-4xl"
                />
              </label>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Argentina", "Brazil", "France", "Stickers", "Archive"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors hover:border-foreground"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {searchResults.length} Results
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsSearchOpen(false)}
                    className="font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    View all
                  </Link>
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                    {searchResults.map((product) => {
                      const isSticker = "category" in product && product.category === "Sticker";
                      const productTarget = isSticker ? "/stickers" : "/products/$productId";
                      const productParams = isSticker ? undefined : { productId: product.id };

                      return (
                        <article key={product.id} className="group">
                          <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-stone-soft">
                            <Link
                              to={productTarget}
                              params={productParams}
                              onClick={() => setIsSearchOpen(false)}
                              className="block h-full w-full"
                            >
                              <img
                                src={product.img}
                                alt={`${product.team} ${product.season} ${product.name}`}
                                width={360}
                                height={480}
                                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                              />
                            </Link>
                            <button
                              type="button"
                              onClick={() => requestAddToCart(product)}
                              className="absolute inset-x-3 bottom-3 bg-foreground px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
                            >
                              Add to Cart
                            </button>
                          </div>
                          <Link
                            to={productTarget}
                            params={productParams}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex justify-between gap-4"
                          >
                            <div>
                              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                                {product.team} / {product.season}
                              </p>
                              <h3 className="mt-1 text-sm font-black uppercase tracking-tight">
                                {product.name}
                              </h3>
                            </div>
                            <span className="font-mono text-xs">{product.price}</span>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border-y border-border py-12">
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter">
                      No matching kits.
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                      Try a country, season, color or fit. Archive requests can also be sent through
                      the contact page.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-foreground/45"
            onClick={() => setIsCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Match Bag
                </p>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-tighter">
                  Cart ({itemCount})
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setIsCartOpen(false)}
                className="grid size-10 place-items-center border border-border transition-colors hover:border-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col justify-center">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Empty Cart
                  </p>
                  <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter">
                    No shirts in the bag yet.
                  </h3>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-8 self-start bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
                  >
                    Shop All
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border border-y border-border">
                  {items.map(({ product, size, quantity }) => {
                    const isSticker = "category" in product && product.category === "Sticker";
                    const productTarget = isSticker ? "/stickers" : "/products/$productId";
                    const productParams = isSticker ? undefined : { productId: product.id };

                    return (
                      <article
                        key={`${product.id}-${size}`}
                        className="grid grid-cols-[86px_1fr] gap-4 py-5"
                      >
                        <Link
                          to={productTarget}
                          params={productParams}
                          onClick={() => setIsCartOpen(false)}
                          className="aspect-[3/4] overflow-hidden bg-stone-soft"
                        >
                          <img
                            src={product.img}
                            alt={`${product.team} ${product.season} ${product.name}`}
                            width={172}
                            height={230}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="min-w-0">
                          <div className="flex justify-between gap-4">
                            <Link
                              to={productTarget}
                              params={productParams}
                              onClick={() => setIsCartOpen(false)}
                            >
                              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                                {product.team} / {product.season}
                              </p>
                              <h3 className="mt-1 text-sm font-black uppercase tracking-tight">
                                {product.name}
                              </h3>
                              <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                                {isSticker ? "One Size" : `Size ${size}`}
                              </p>
                            </Link>
                            <span className="font-mono text-xs">{product.price}</span>
                          </div>
                          <div className="mt-5 flex items-center justify-between">
                            <div className="flex items-center border border-border">
                              <button
                                type="button"
                                aria-label={`Remove one ${product.name}`}
                                onClick={() => decrementItem(product.id, size)}
                                className="grid size-8 place-items-center transition-colors hover:bg-surface"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="grid size-8 place-items-center font-mono text-xs">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`Add one ${product.name}`}
                                onClick={() => addItem(product, size)}
                                className="grid size-8 place-items-center transition-colors hover:bg-surface"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(product.id, size)}
                              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-mono text-lg">₹{subtotal}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    openWhatsApp(buildCartOrderMessage({ itemCount, items, subtotal }));
                  }}
                  className="w-full bg-foreground px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
                >
                  Order On WhatsApp
                </button>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 block w-full border border-border px-6 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors hover:border-foreground hover:bg-surface"
                >
                  Review Order
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-4 w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-black tracking-tighter uppercase mb-6">
              <img src={logo} alt="Kickoff Nagaland" className="h-12 w-auto" />
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-[220px]">
              Premium football apparel and national team archives, curated for the modern
              enthusiast.
            </p>
          </div>
          <FooterCol
            title="Quick Links"
            items={["New Releases", "National Teams", "Customization", "Care Guide"]}
          />
          <FooterCol title="Company" items={["About", "Sustainability", "Privacy", "Terms"]} />
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Newsletter</h4>
            <form className="flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border-b border-border py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
              >
                Subscribe -&gt;
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-8 border-t border-border">
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
            (c) 2026 Kickoff Nagaland Collective
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
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-foreground transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

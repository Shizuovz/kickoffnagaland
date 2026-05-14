import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/catalog";

type CartLine = {
  product: Product;
  size: string;
  quantity: number;
};

type StoredCartLine = {
  product: Product;
  size?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, size: string) => void;
  requestAddToCart: (product: Product) => void;
  decrementItem: (productId: string, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "kickoff-nagaland-cart";
const defaultSize = "M";
const sizes = ["S", "M", "L", "XL", "XXL"];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(storageKey);
      if (rawCart) {
        const storedItems = JSON.parse(rawCart) as StoredCartLine[];
        setItems(
          storedItems.map((item) => ({
            ...item,
            size: item.size ?? defaultSize,
          })),
        );
      }
    } catch {
      setItems([]);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Cart still works for the current session if storage is unavailable.
    }
  }, [hasHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, size: string) => {
      setItems((current) => {
        const existing = current.find(
          (item) => item.product.id === product.id && item.size === size,
        );
        if (existing) {
          return current.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...current, { product, size, quantity: 1 }];
      });
    };

    const requestAddToCart = (product: Product) => {
      setPendingProduct(product);
      setSelectedSize(defaultSize);
    };

    const decrementItem = (productId: string, size: string) => {
      setItems((current) =>
        current.flatMap((item) => {
          if (item.product.id !== productId || item.size !== size) {
            return [item];
          }

          if (item.quantity <= 1) {
            return [];
          }

          return [{ ...item, quantity: item.quantity - 1 }];
        }),
      );
    };

    const removeItem = (productId: string, size: string) => {
      setItems((current) =>
        current.filter((item) => item.product.id !== productId || item.size !== size),
      );
    };

    const clearCart = () => {
      setItems([]);
    };

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.product.priceValue * item.quantity,
      0,
    );

    return {
      items,
      itemCount,
      subtotal,
      addItem,
      requestAddToCart,
      decrementItem,
      removeItem,
      clearCart,
    };
  }, [items]);

  return (
    <CartContext.Provider value={value}>
      {children}

      {pendingProduct && (
        <div className="fixed inset-0 z-[90] grid place-items-center px-4">
          <button
            type="button"
            aria-label="Close size selector"
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setPendingProduct(null)}
          />
          <section className="relative w-full max-w-md border border-border bg-background p-6 shadow-2xl">
            <div className="mb-6 flex gap-4">
              <div className="aspect-[3/4] w-24 shrink-0 overflow-hidden bg-stone-soft">
                <img
                  src={pendingProduct.img}
                  alt={`${pendingProduct.team} ${pendingProduct.season} ${pendingProduct.name}`}
                  width={192}
                  height={256}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Select Size
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase leading-[0.9] tracking-tighter">
                  {pendingProduct.name}
                </h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {pendingProduct.team} / {pendingProduct.season}
                </p>
              </div>
            </div>

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

            <button
              type="button"
              onClick={() => {
                value.addItem(pendingProduct, selectedSize);
                setPendingProduct(null);
              }}
              className="mt-6 w-full bg-foreground px-6 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent"
            >
              Add Size {selectedSize} To Cart
            </button>
            <button
              type="button"
              onClick={() => setPendingProduct(null)}
              className="mt-4 w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </section>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

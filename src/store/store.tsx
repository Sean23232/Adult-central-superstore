import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/catalog";

export type CartLine = {
  key: string;
  productId: string;
  option: string;
  qty: number;
};

export type Toast = { id: number; title: string; body?: string; tone: "bag" | "heart" | "info" };

type UIState =
  | { kind: "none" }
  | { kind: "cart" }
  | { kind: "search" }
  | { kind: "mobile" }
  | { kind: "quickview"; productId: string }
  | { kind: "wishlist" };

type StoreValue = {
  accepted: boolean;
  acceptAge: () => void;
  declineAge: () => void;
  declined: boolean;
  ui: UIState;
  open: (u: Exclude<UIState, { kind: "none" }>) => void;
  close: () => void;
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  addToBag: (p: Product, option: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  wishlist: string[];
  toggleWish: (p: Product) => void;
  toasts: Toast[];
  dismissToast: (id: number) => void;
  notify: (t: { title: string; body?: string; tone?: Toast["tone"] }) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  byId: (id: string) => Product | undefined;
};

const StoreCtx = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [ui, setUi] = useState<UIState>({ kind: "none" });
  const [cart, setCart] = useState<CartLine[]>([
    { key: "ac-07::150ml", productId: "ac-07", option: "150ml", qty: 1 },
    { key: "ac-03::Sage", productId: "ac-03", option: "Sage", qty: 2 },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(["ac-05"]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const toastId = useRef(1);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = toastId.current++;
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3600);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const byId = useCallback((id: string) => products.find((p) => p.id === id), []);

  const addToBag = useCallback(
    (p: Product, option: string, qty = 1) => {
      const key = `${p.id}::${option}`;
      setCart((prev) => {
        const found = prev.find((l) => l.key === key);
        if (found) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(9, l.qty + qty) } : l));
        return [...prev, { key, productId: p.id, option, qty }];
      });
      push({ tone: "bag", title: "Added to your bag", body: `${p.name} · ${option}` });
    },
    [push],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const removeLine = useCallback((key: string) => setCart((prev) => prev.filter((l) => l.key !== key)), []);

  const toggleWish = useCallback(
    (p: Product) => {
      setWishlist((prev) => {
        const has = prev.includes(p.id);
        push({
          tone: "heart",
          title: has ? "Removed from wishlist" : "Saved to wishlist",
          body: p.name,
        });
        return has ? prev.filter((x) => x !== p.id) : [...prev, p.id];
      });
    },
    [push],
  );

  const open = useCallback((u: Exclude<UIState, { kind: "none" }>) => setUi(u), []);
  const close = useCallback(() => setUi({ kind: "none" }), []);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, l) => {
        const p = products.find((x) => x.id === l.productId);
        return sum + (p ? p.price * l.qty : 0);
      }, 0),
    [cart],
  );

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  // lock scroll while an overlay is open
  useEffect(() => {
    const locked = ui.kind !== "none";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ui.kind]);

  // escape closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUi({ kind: "none" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value: StoreValue = {
    accepted,
    acceptAge: () => {
      setAccepted(true);
      setDeclined(false);
      push({ tone: "info", title: "Welcome in", body: "Browsing as an adult-verified guest." });
    },
    declineAge: () => setDeclined(true),
    declined,
    ui,
    open,
    close,
    cart,
    cartCount,
    subtotal,
    addToBag,
    setQty,
    removeLine,
    wishlist,
    toggleWish,
    toasts,
    dismissToast,
    notify: (t) => push({ tone: t.tone ?? "info", title: t.title, body: t.body }),
    activeFilter,
    setActiveFilter,
    byId,
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

/** Reveal-on-scroll: adds .is-in when the element enters the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  Heart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";
import { money, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import { Stars } from "@/components/ui";
import { cn } from "@/utils/cn";

const VIEWS = [
  { label: "Full", cls: "object-cover object-center", scale: "scale-100" },
  { label: "Detail", cls: "object-cover object-center", scale: "scale-[1.9]" },
  { label: "Styled", cls: "object-cover object-[78%_22%]", scale: "scale-[1.35]" },
];

export default function QuickView() {
  const { ui, close, addToBag, toggleWish, wishlist, open } = useStore();
  const active = ui.kind === "quickview";
  const productId = active ? ui.productId : null;
  const index = useMemo(() => products.findIndex((p) => p.id === productId), [productId]);
  const product = index >= 0 ? products[index] : null;

  const [option, setOption] = useState("");
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (product) {
      setOption(product.options.values[0]);
      setQty(1);
      setView(0);
      setDone(false);
    }
  }, [product]);

  if (!product) return null;
  const saved = wishlist.includes(product.id);
  const dist = [
    { star: 5, pct: 82 },
    { star: 4, pct: 13 },
    { star: 3, pct: 3 },
    { star: 2, pct: 1 },
    { star: 1, pct: 1 },
  ];

  const step = (dir: number) => {
    const next = (index + dir + products.length) % products.length;
    open({ kind: "quickview", productId: products[next].id });
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}>
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={close} />

      <div className="anim-scale nice-scroll relative grid max-h-[92vh] w-full max-w-[1050px] grid-cols-1 overflow-y-auto border border-cream/12 bg-ash shadow-luxe md:grid-cols-2">
        {/* ---------- visual ---------- */}
        <div className="relative flex flex-col bg-gradient-to-b from-ink-2 to-ash p-4 sm:p-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
            <img
              src={product.image}
              alt={product.name}
              className={cn("size-full transition-transform duration-[900ms] ease-out", VIEWS[view].cls, VIEWS[view].scale)}
            />
            {product.badge && (
              <span className="absolute left-3 top-3 bg-crimson px-2.5 py-1 font-cond text-[9.5px] font-semibold uppercase tracking-[0.2em] text-cream">
                {product.badge}
              </span>
            )}
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 bg-ink/70 px-2.5 py-1 font-cond text-[9.5px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
                <Eye size={11} /> {VIEWS[view].label} view
              </span>
              <div className="flex gap-1.5">
                {VIEWS.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => setView(i)}
                    aria-label={`${v.label} view`}
                    className={cn(
                      "size-8 overflow-hidden border transition-all duration-300",
                      view === i ? "border-gold" : "border-cream/20 opacity-60 hover:opacity-100",
                    )}
                  >
                    <img src={product.image} alt="" className={cn("size-full", v.cls, v.scale)} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              { Icon: PackageCheck, t: "Unmarked box" },
              { Icon: ShieldCheck, t: "Body-safe brief" },
              { Icon: Check, t: "In the edit" },
            ].map(({ Icon, t }) => (
              <div key={t} className="flex flex-col items-center gap-1.5 border border-cream/[0.08] py-2.5 text-center">
                <Icon size={15} className="text-gold" strokeWidth={1.6} />
                <span className="font-cond text-[9px] uppercase tracking-[0.16em] text-mist">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- content ---------- */}
        <div className="flex flex-col p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-[9.5px] text-gold">{product.category}</p>
              <h2 className="mt-2.5 font-display text-[clamp(1.5rem,3vw,2.05rem)] leading-[1.1] text-cream">
                {product.name}
              </h2>
              <p className="mt-1.5 font-cond text-[11px] uppercase tracking-[0.2em] text-mist-2">
                by {product.house}
              </p>
            </div>
            <button
              onClick={close}
              aria-label="Close quick view"
              className="grid size-9 shrink-0 place-items-center border border-cream/15 text-cream transition-colors hover:border-crimson hover:bg-crimson"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-cream/[0.08] py-3">
            <span className="flex items-center gap-2">
              <Stars value={product.rating} size={13} />
              <span className="num text-[12.5px] text-cream">
                {product.rating.toFixed(1)}
              </span>
              <span className="num text-[12px] text-mist-2">({product.reviews})</span>
            </span>
            <span className="hidden h-3.5 w-px bg-cream/15 sm:block" />
            <div className="flex flex-1 items-center gap-2">
              {dist.slice(0, 3).map((d) => (
                <span key={d.star} className="flex items-center gap-1" title={`${d.pct}% rated ${d.star}`}>
                  <span className="num text-[10px] text-mist-2">{d.star}</span>
                  <span className="relative block h-1 w-10 bg-cream/12">
                    <span className="absolute inset-y-0 left-0 bg-gold" style={{ width: `${d.pct}%` }} />
                  </span>
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-[13.5px] leading-relaxed text-mist">{product.description}</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[12.5px] leading-snug text-cream/85">
                <Check size={13} className="mt-0.5 shrink-0 text-crimson" strokeWidth={2.2} />
                {d}
              </li>
            ))}
          </ul>

          {/* options */}
          <div className="mt-6">
            <p className="font-cond text-[10px] uppercase tracking-[0.24em] text-mist-2">
              {product.options.label}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.options.values.map((v) => (
                <button
                  key={v}
                  onClick={() => setOption(v)}
                  className={cn(
                    "border px-3.5 py-2 font-cond text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                    option === v
                      ? "border-gold bg-gold/15 text-gold-2"
                      : "border-cream/15 text-mist hover:border-cream/40 hover:text-cream",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* qty + price */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center border border-cream/15">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-11 place-items-center text-cream transition-colors hover:bg-cream/[0.06]"
                aria-label="Decrease quantity"
              >
                <ArrowLeft size={14} />
              </button>
              <span className="num w-10 text-center text-[15px] text-cream">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                className="grid size-11 place-items-center text-cream transition-colors hover:bg-cream/[0.06]"
                aria-label="Increase quantity"
              >
                <ArrowRight size={14} />
              </button>
            </div>
            <p className="flex items-baseline gap-2.5">
              <span className="num font-display text-[30px] leading-none text-cream">
                {money(product.price * qty)}
              </span>
              {product.compareAt && (
                <span className="num text-[14px] text-mist-2 line-through">{money(product.compareAt)}</span>
              )}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              onClick={() => {
                addToBag(product, option, qty);
                setDone(true);
                window.setTimeout(() => setDone(false), 1900);
              }}
              className={cn(
                "sheen relative flex flex-1 items-center justify-center gap-2.5 px-6 py-4 font-cond text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                done ? "bg-gold text-ink" : "bg-crimson text-cream hover:bg-ember",
              )}
            >
              <span className="sheen-bar" />
              <span className="relative z-10 flex items-center gap-2.5">
                {done ? <Check size={15} strokeWidth={2.4} /> : <ShoppingBag size={15} strokeWidth={1.7} />}
                {done ? "Added to bag" : "Add to bag"}
              </span>
            </button>
            <button
              onClick={() => toggleWish(product)}
              className={cn(
                "flex items-center justify-center gap-2.5 border px-5 py-4 font-cond text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-300",
                saved
                  ? "border-crimson/60 bg-crimson/12 text-crimson"
                  : "border-cream/20 text-cream hover:border-cream/50",
              )}
            >
              <Heart size={15} className={cn(saved && "fill-current")} />
              {saved ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-cream/[0.08] pt-4">
            <p className="text-[11.5px] leading-snug text-mist-2">{product.body}</p>
            <div className="flex shrink-0 gap-1.5">
              <button
                onClick={() => step(-1)}
                aria-label="Previous product"
                className="grid size-9 place-items-center border border-cream/15 text-cream transition-colors hover:border-gold/60 hover:text-gold-2"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next product"
                className="grid size-9 place-items-center border border-cream/15 text-cream transition-colors hover:border-gold/60 hover:text-gold-2"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

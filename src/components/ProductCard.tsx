import { useEffect, useRef, useState } from "react";
import { Check, Eye, Heart, ShoppingBag } from "lucide-react";
import { money, type Product } from "@/data/catalog";
import { useStore } from "@/store/store";
import { Stars } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { open, addToBag, toggleWish, wishlist } = useStore();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);
  const saved = wishlist.includes(product.id);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-cream/[0.09] bg-ash/55 transition-all duration-500",
        "hover:-translate-y-1.5 hover:border-gold/35 hover:bg-ash hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.9)]",
      )}
      data-index={index}
    >
      {/* ---------- image ---------- */}
      <div className="relative overflow-hidden bg-gradient-to-b from-ink-2 to-ash">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.08]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-70" />

        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 px-2.5 py-1 font-cond text-[9.5px] font-semibold uppercase tracking-[0.2em]",
              product.badge === "Limited"
                ? "bg-gold text-ink"
                : product.badge === "Bestseller"
                  ? "bg-crimson text-cream"
                  : "bg-cream text-ink",
            )}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWish(product)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className={cn(
            "absolute right-3 top-3 grid size-9 place-items-center border backdrop-blur-md transition-all duration-300",
            saved
              ? "border-crimson/60 bg-ink/70 text-crimson"
              : "border-cream/15 bg-ink/45 text-cream/80 hover:border-cream/45 hover:text-cream",
          )}
        >
          <Heart size={15} className={cn(saved && "fill-current anim-pop")} strokeWidth={1.6} />
        </button>

        {/* touch-friendly quick view */}
        <button
          onClick={() => open({ kind: "quickview", productId: product.id })}
          className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 bg-cream/95 py-2.5 font-cond text-[11px] font-semibold uppercase tracking-[0.2em] text-ink sm:hidden"
        >
          <Eye size={14} strokeWidth={1.8} /> Quick view
        </button>

        {/* hover actions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full p-3 transition-transform duration-500 ease-out group-hover:translate-y-0 sm:block">
          <div className="pointer-events-auto flex gap-2">
            <button
              onClick={() => open({ kind: "quickview", productId: product.id })}
              className="flex flex-1 items-center justify-center gap-2 bg-cream/95 py-2.5 font-cond text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-cream"
            >
              <Eye size={14} strokeWidth={1.8} /> Quick view
            </button>
            <button
              onClick={() => open({ kind: "quickview", productId: product.id })}
              aria-label="View details"
              className="grid w-11 place-items-center bg-ink/80 text-cream backdrop-blur-md transition-colors hover:bg-crimson"
            >
              <ShoppingBag size={14} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- info ---------- */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-cond text-[9.5px] font-semibold uppercase tracking-[0.26em] text-gold">
            {product.house}
          </p>
          <div className="flex items-center gap-1.5 text-mist-2">
            <Stars value={product.rating} />
            <span className="num text-[10.5px]">{product.rating}</span>
          </div>
        </div>

        <h3 className="mt-2.5 font-display text-[18px] leading-snug text-cream transition-colors duration-300 group-hover:text-gold-2">
          {product.name}
        </h3>
        <p className="mt-1.5 font-cond text-[9.5px] uppercase tracking-[0.2em] text-mist-2">
          {product.category}
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-mist-2">{product.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.options.values.slice(0, 3).map((v) => (
            <span
              key={v}
              className="border border-cream/10 px-2 py-0.5 text-[10px] text-mist transition-colors group-hover:border-cream/20"
            >
              {v}
            </span>
          ))}
          {product.options.values.length > 3 && (
            <span className="px-1 py-0.5 text-[10px] text-mist-2">
              +{product.options.values.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="flex items-baseline gap-2">
            <span className="num font-display text-[21px] text-cream">{money(product.price)}</span>
            {product.compareAt && (
              <span className="num font-sans text-[12px] text-mist-2 line-through">
                {money(product.compareAt)}
              </span>
            )}
          </p>
          <button
            onClick={() => {
              addToBag(product, product.options.values[0]);
              setAdded(true);
              if (timer.current) window.clearTimeout(timer.current);
              timer.current = window.setTimeout(() => setAdded(false), 1800);
            }}
            className={cn(
              "flex items-center gap-2 border px-3 py-2 font-cond text-[10.5px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95",
              added
                ? "border-gold bg-gold text-ink"
                : "border-cream/20 text-cream hover:border-crimson hover:bg-crimson",
            )}
          >
            {added ? (
              <>
                <Check size={13} strokeWidth={2.2} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={13} strokeWidth={1.8} /> Add
              </>
            )}
          </button>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-crimson via-ember to-gold transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}

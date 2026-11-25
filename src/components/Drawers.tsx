import { ArrowRight, Heart, Lock, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { money, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import { cn } from "@/utils/cn";

function Shell({
  title,
  eyebrow,
  count,
  onClose,
  children,
  footer,
}: {
  title: string;
  eyebrow: string;
  count: number;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[140]">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />
      <aside className="anim-drawer absolute inset-y-0 right-0 flex w-[min(440px,94vw)] flex-col border-l border-cream/10 bg-ash shadow-luxe">
        <div className="h-[3px] w-full bg-gradient-to-r from-crimson via-gold to-crimson/30" />
        <header className="flex items-start justify-between gap-4 border-b border-cream/10 px-5 py-5">
          <div>
            <p className="eyebrow text-[9.5px] text-gold">{eyebrow}</p>
            <h2 className="mt-1.5 flex items-baseline gap-2.5 font-display text-[26px] leading-none text-cream">
              {title}
              <span className="num font-sans text-[13px] text-mist-2">({count})</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="grid size-9 place-items-center border border-cream/15 text-cream transition-colors hover:border-crimson hover:bg-crimson"
          >
            <X size={16} />
          </button>
        </header>
        <div className="nice-scroll flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-cream/10 bg-ink-2/70 p-5">{footer}</div>}
      </aside>
    </div>
  );
}

/* =================== shopping bag =================== */
export function CartDrawer() {
  const { ui, close, cart, setQty, removeLine, subtotal, byId, addToBag, notify } = useStore();
  if (ui.kind !== "cart") return null;
  const lines = cart.map((l) => ({ line: l, product: byId(l.productId)! })).filter((x) => x.product);
  const shipping = 0;

  return (
    <Shell
      eyebrow="Demonstration bag"
      title="Your bag"
      count={cart.reduce((n, l) => n + l.qty, 0)}
      onClose={close}
      footer={
        lines.length > 0 ? (
          <>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between text-mist">
                <span>Subtotal</span>
                <span className="num text-cream">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-mist">
                <span>Standard discreet shipping</span>
                <span className="num text-gold">{money(shipping)}</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-cream/10 pt-3">
                <span className="font-cond text-[12px] uppercase tracking-[0.22em] text-cream">
                  Estimated total
                </span>
                <span className="num font-display text-[26px] text-cream">{money(subtotal)}</span>
              </div>
            </div>
            <button
              onClick={() =>
                notify({
                  tone: "info",
                  title: "Checkout is disabled",
                  body: "Design prototype — no payment processing.",
                })
              }
              className="sheen group relative mt-4 flex w-full items-center justify-center gap-2.5 bg-crimson py-4 font-cond text-[12px] font-semibold uppercase tracking-[0.24em] text-cream transition-colors hover:bg-ember"
            >
              <span className="sheen-bar" />
              <span className="relative z-10 flex items-center gap-2.5">
                Proceed to checkout <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button
              onClick={close}
              className="mt-2 w-full py-2 text-center font-cond text-[10.5px] uppercase tracking-[0.22em] text-mist transition-colors hover:text-gold-2"
            >
              Continue shopping
            </button>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[10.5px] text-mist-2">
              <Lock size={10} /> Prototype only · no card details are collected
            </p>
          </>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="grid size-14 place-items-center border border-cream/15 text-mist">
            <ShoppingBag size={22} strokeWidth={1.4} />
          </span>
          <p className="font-display text-[22px] text-cream">Your bag is empty</p>
          <p className="max-w-[34ch] text-[13px] leading-relaxed text-mist">
            Start with the spotlight edit — ten pieces our buying team keeps on rotation right now.
          </p>
          <button
            onClick={() => {
              close();
              document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-1 border border-gold/45 px-5 py-2.5 font-cond text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Browse the edit
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-cream/[0.07]">
          {lines.map(({ line, product }) => (
            <li key={line.key} className="group flex gap-4 p-5 transition-colors hover:bg-cream/[0.02]">
              <div className="size-[86px] shrink-0 overflow-hidden bg-ink-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-cond text-[9.5px] uppercase tracking-[0.2em] text-gold">
                      {product.house}
                    </p>
                    <p className="mt-1 truncate font-display text-[15.5px] text-cream">{product.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-mist-2">
                      {product.options.label}: <span className="text-mist">{line.option}</span>
                    </p>
                  </div>
                  <span className="num shrink-0 text-[14px] text-cream">{money(product.price * line.qty)}</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-center border border-cream/12">
                    <button
                      onClick={() => setQty(line.key, line.qty - 1)}
                      className="grid size-7 w-8 place-items-center text-mist transition-colors hover:bg-cream/[0.06] hover:text-cream"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="num w-7 text-center text-[12.5px] text-cream">{line.qty}</span>
                    <button
                      onClick={() => setQty(line.key, line.qty + 1)}
                      className="grid size-7 w-8 place-items-center text-mist transition-colors hover:bg-cream/[0.06] hover:text-cream"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => addToBag(product, line.option)}
                      className="font-cond text-[10px] uppercase tracking-[0.18em] text-mist-2 transition-colors hover:text-gold-2"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => removeLine(line.key)}
                      className="flex items-center gap-1 font-cond text-[10px] uppercase tracking-[0.18em] text-mist-2 transition-colors hover:text-crimson"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <li className="p-5">
            <div className="flex items-start gap-3 border border-dashed border-gold/25 bg-gold/[0.05] p-3.5">
              <Tag size={14} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-[12px] leading-relaxed text-mist">
                <span className="text-cream">Autumn Discovery Event:</span> promotional pricing shown on
                selected pieces is illustrative for this prototype.
              </p>
            </div>
          </li>
        </ul>
      )}
    </Shell>
  );
}

/* =================== wishlist =================== */
export function WishlistDrawer() {
  const { ui, close, open, wishlist, toggleWish, addToBag, byId } = useStore();
  if (ui.kind !== "wishlist") return null;
  const items = wishlist.map((id) => byId(id)).filter(Boolean) as typeof products;
  const others = products.filter((p) => !wishlist.includes(p.id)).slice(0, 2);

  return (
    <Shell eyebrow="Saved pieces" title="Wishlist" count={items.length} onClose={close}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="grid size-14 place-items-center border border-cream/15 text-mist">
            <Heart size={22} strokeWidth={1.4} />
          </span>
          <p className="font-display text-[22px] text-cream">Nothing saved yet</p>
          <p className="max-w-[34ch] text-[13px] leading-relaxed text-mist">
            Tap the heart on any product to keep it here while you browse.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-cream/[0.07]">
          {items.map((p) => (
            <li key={p.id} className="group flex gap-4 p-5 transition-colors hover:bg-cream/[0.02]">
              <div className="size-[86px] shrink-0 overflow-hidden bg-ink-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-cond text-[9.5px] uppercase tracking-[0.2em] text-gold">{p.category}</p>
                <p className="mt-1 truncate font-display text-[15.5px] text-cream">{p.name}</p>
                <p className="num mt-0.5 text-[13px] text-mist">{money(p.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => addToBag(p, p.options.values[0])}
                    className={cn(
                      "border border-gold/45 px-3.5 py-1.5 font-cond text-[10px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-ink",
                    )}
                  >
                    Move to bag
                  </button>
                  <button
                    onClick={() => toggleWish(p)}
                    className="font-cond text-[10px] uppercase tracking-[0.18em] text-mist-2 transition-colors hover:text-crimson"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-cream/10 p-5">
        <p className="eyebrow text-[9.5px] text-mist-2">You might also like</p>
        <ul className="mt-3 space-y-2.5">
          {others.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => open({ kind: "quickview", productId: p.id })}
                className="flex w-full items-center gap-3 text-left transition-opacity hover:opacity-80"
              >
                <img src={p.image} alt="" className="size-11 object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] text-cream">{p.name}</span>
                  <span className="num block text-[11.5px] text-mist-2">{money(p.price)}</span>
                </span>
                <Heart size={13} className="text-mist-2" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}



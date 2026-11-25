import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Clock, Search, ShoppingBag, X } from "lucide-react";
import { filterTabs, money, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import { cn } from "@/utils/cn";

const RECENT = ["Wand massager", "Lace set", "Water-based", "Gift box", "Blindfold"];
const TRENDING = ["Nocturne Pro", "Tempo Duo", "Éclat Lace", "Ember Candle", "Clarity 150ml"];

export default function SearchOverlay() {
  const { ui, close, open, addToBag, setActiveFilter } = useStore();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const active = ui.kind === "search";

  useEffect(() => {
    if (active) {
      setQ("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 90);
      return () => window.clearTimeout(t);
    }
  }, [active]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products.filter((p) =>
      [p.name, p.house, p.category, p.tagline, ...p.options.values]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [q]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[135]" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="absolute inset-0 bg-ink/88 backdrop-blur-lg" onClick={close} />
      <div className="anim-fadeup relative mx-auto max-w-[1000px] px-4 pt-[10vh] sm:px-6">
        <div className="border border-cream/12 bg-ash/90 shadow-luxe">
          <div className="h-[3px] bg-gradient-to-r from-crimson via-gold to-crimson/40" />
          <div className="flex items-center gap-4 border-b border-cream/10 px-5 py-5 sm:px-7">
            <Search size={20} className="shrink-0 text-gold" strokeWidth={1.6} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search massagers, lingerie, lubricants, gifts…"
              className="min-w-0 flex-1 bg-transparent font-display text-[clamp(1.1rem,3vw,1.7rem)] text-cream outline-none placeholder:text-mist-2/70"
              aria-label="Search products"
            />
            {q && (
              <button
                onClick={() => inputRef.current?.select()}
                className="hidden font-cond text-[10px] uppercase tracking-[0.2em] text-mist-2 hover:text-gold-2 sm:block"
              >
                Select
              </button>
            )}
            <button
              onClick={close}
              aria-label="Close search"
              className="grid size-9 shrink-0 place-items-center border border-cream/15 text-cream transition-colors hover:border-crimson hover:bg-crimson"
            >
              <X size={16} />
            </button>
          </div>

          {/* quick departments */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-cream/[0.07] px-5 py-3.5 sm:px-7">
            {filterTabs.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveFilter(t);
                  close();
                  document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="shrink-0 border border-cream/12 px-3 py-1.5 font-cond text-[10.5px] uppercase tracking-[0.18em] text-mist transition-colors hover:border-gold/50 hover:text-cream"
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-0 md:grid-cols-[1.35fr_1fr]">
            {/* results */}
            <div className="nice-scroll max-h-[42vh] overflow-y-auto border-cream/[0.07] p-3 md:border-r md:p-4">
              <p className="px-2 pb-2 font-cond text-[10px] uppercase tracking-[0.24em] text-mist-2">
                {q.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Suggested from the edit"}
              </p>
              {results.length === 0 ? (
                <div className="px-3 py-10 text-center">
                  <p className="font-display text-[19px] text-cream">No match in the spotlight edit</p>
                  <p className="mx-auto mt-2 max-w-[38ch] text-[13px] text-mist">
                    This prototype holds ten products. Try “massager”, “lace”, “oil” or clear the field.
                  </p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((p, i) => (
                    <li key={p.id}>
                      <button
                        onClick={() => open({ kind: "quickview", productId: p.id })}
                        className={cn(
                          "group flex w-full items-center gap-3.5 border border-transparent p-2 text-left transition-all duration-300 hover:border-cream/12 hover:bg-cream/[0.03]",
                        )}
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="size-14 shrink-0 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] text-cream">{p.name}</span>
                          <span className="mt-0.5 block font-cond text-[10px] uppercase tracking-[0.18em] text-gold">
                            {p.house} · {p.category}
                          </span>
                        </span>
                        <span className="num shrink-0 text-[13.5px] text-cream">{money(p.price)}</span>
                        <span
                          role="button"
                          tabIndex={-1}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToBag(p, p.options.values[0]);
                          }}
                          className="hidden size-8 shrink-0 place-items-center border border-cream/15 text-cream opacity-0 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink group-hover:opacity-100 sm:grid"
                          aria-hidden
                        >
                          <ShoppingBag size={13} />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* discovery rail */}
            <div className="p-4 sm:p-5">
              <p className="font-cond text-[10px] uppercase tracking-[0.24em] text-mist-2">Trending now</p>
              <ul className="mt-3 space-y-2">
                {TRENDING.map((t) => (
                  <li key={t}>
                    <button
                      onClick={() => setQ(t.split(" ")[0])}
                      className="group flex w-full items-center justify-between gap-3 border-b border-cream/[0.07] py-2 text-left text-[13.5px] text-mist transition-colors hover:text-cream"
                    >
                      {t}
                      <ArrowUpRight
                        size={13}
                        className="text-mist-2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 font-cond text-[10px] uppercase tracking-[0.24em] text-mist-2">
                <Clock size={11} /> Recent
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {RECENT.map((r) => (
                  <button
                    key={r}
                    onClick={() => setQ(r)}
                    className="border border-cream/12 px-2.5 py-1 text-[11.5px] text-mist transition-colors hover:border-crimson/60 hover:text-cream"
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-[11px] leading-relaxed text-mist-2">
                Press <kbd className="border border-cream/15 px-1 text-cream">Esc</kbd> to close. Search is
                a frontend demonstration over the ten prototype products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

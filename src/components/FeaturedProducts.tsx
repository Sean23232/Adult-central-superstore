import { useMemo } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { filterTabs, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import ProductCard from "@/components/ProductCard";
import { Reveal, SectionHead } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function FeaturedProducts() {
  const { activeFilter, setActiveFilter } = useStore();

  const list = useMemo(() => {
    if (activeFilter === "All") return products;
    if (activeFilter === "New Arrivals") return products.filter((p) => p.isNew);
    return products.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="featured" className="relative bg-ink py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_85%_0%,rgba(201,162,74,0.09),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="02"
          eyebrow="The spotlight edit"
          title={
            <>
              Ten pieces, chosen
              <br />
              <span className="italic text-gold-2">with intent.</span>
            </>
          }
          copy="Our buying team keeps the floor tight and the shortlist tighter. This is the full spotlight selection — every item below is photographed in-house, described in plain language and available in the department it belongs to."
          action={
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <a
                href="#categories"
                className="group inline-flex items-center gap-2.5 border-b border-gold/40 pb-1.5 font-cond text-[11.5px] font-semibold uppercase tracking-[0.24em] text-cream transition-colors hover:border-gold hover:text-gold-2"
              >
                All departments
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="flex items-center gap-1.5 text-[11px] text-mist-2 sm:justify-end">
                <Info size={12} /> Illustrative prototype pricing
              </p>
            </div>
          }
        />

        {/* filter chips */}
        <Reveal className="mt-11">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {filterTabs.map((tab) => {
              const active = activeFilter === tab;
              const count =
                tab === "All"
                  ? products.length
                  : tab === "New Arrivals"
                    ? products.filter((p) => p.isNew).length
                    : products.filter((p) => p.category === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={cn(
                    "group flex shrink-0 items-center gap-2 border px-4 py-2.5 font-cond text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300",
                    active
                      ? "border-crimson bg-crimson text-cream shadow-[0_14px_34px_-20px_rgba(224,49,58,0.9)]"
                      : "border-cream/12 text-mist hover:border-gold/45 hover:bg-cream/[0.03] hover:text-cream",
                  )}
                >
                  {tab}
                  <span
                    className={cn(
                      "num text-[9.5px]",
                      active ? "text-cream/75" : "text-mist-2 group-hover:text-gold",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-cream/[0.07] pt-4">
            <p className="font-cond text-[10.5px] uppercase tracking-[0.24em] text-mist-2">
              Showing <span className="num text-cream">{String(list.length).padStart(2, "0")}</span> of{" "}
              10 in the spotlight edit
            </p>
            {activeFilter !== "All" && (
              <button
                onClick={() => setActiveFilter("All")}
                className="font-cond text-[10.5px] uppercase tracking-[0.22em] text-gold transition-colors hover:text-gold-2"
              >
                Clear filter ×
              </button>
            )}
          </div>
        </Reveal>

        {/* grid */}
        {list.length > 0 ? (
          <div
            key={activeFilter}
            className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {list.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className="h-full">
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-9 border border-dashed border-cream/15 bg-ash/40 px-6 py-16 text-center">
            <p className="font-display text-[22px] text-cream">Nothing filed here yet</p>
            <p className="mx-auto mt-2 max-w-md text-[13.5px] text-mist">
              The spotlight edit holds exactly ten pieces. Try another department, or browse the full
              floor plan.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-6 inline-flex items-center gap-2 border border-gold/40 px-5 py-2.5 font-cond text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Show all ten
            </button>
          </div>
        )}

        {/* closing panels */}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden border border-cream/10 bg-gradient-to-br from-burgundy-2 via-ash to-ink p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-14 size-48 rotate-45 bg-[repeating-linear-gradient(90deg,rgba(201,162,74,0.22)_0_1px,transparent_1px_9px)]" />
              <div className="relative max-w-lg">
                <p className="eyebrow text-[9.5px] text-gold">Restocked weekly</p>
                <h3 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight text-cream">
                  New arrivals land in the spotlight edit every week.
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist">
                  Ten at a time, replaced as the season turns. Save a piece to your wishlist and it stays
                  with you between visits.
                </p>
              </div>
              <a
                href="#newsletter"
                className="relative inline-flex shrink-0 items-center gap-2 bg-cream px-6 py-3.5 font-cond text-[11.5px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold"
              >
                Get restock notes
                <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between border border-cream/10 bg-ash/55 p-6">
              <div>
                <p className="eyebrow text-[9.5px] text-crimson">Second opinion</p>
                <h3 className="mt-3 font-display text-[21px] leading-tight text-cream">
                  Ask a product specialist, not a chatbot.
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist">
                  Sizing, materials, compatibility, discreet delivery — our team answers in plain terms.
                </p>
              </div>
              <a
                href="#faq"
                className="mt-6 inline-flex items-center gap-2 border-b border-gold/40 pb-1 font-cond text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:text-gold-2"
              >
                Contact customer care
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

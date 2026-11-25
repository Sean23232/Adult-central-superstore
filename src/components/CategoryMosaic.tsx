import { ArrowUpRight } from "lucide-react";
import { categoryTiles, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import { Reveal, SectionHead } from "@/components/ui";
import { cn } from "@/utils/cn";

const FILTER_MATCH: Record<string, string> = {
  "Couples Collection": "Couples & Intimacy",
  "Men's Essentials": "Men's Collection",
  "Lubricants & Wellness": "Lubricants & Essentials",
};

const SHAPES = [
  "col-span-2 row-span-2 lg:col-span-5",
  "col-span-1 lg:col-span-4",
  "col-span-1 lg:col-span-3",
  "col-span-1 lg:col-span-4",
  "col-span-1 lg:col-span-3 lg:row-span-2",
  "col-span-2 lg:col-span-9",
];

const WIDE_TAGS = ["Cuffs & Anklets", "Rope & Ribbon", "Blindfolds", "Aftercare Edit", "Safety Shears"];

export default function CategoryMosaic() {
  const { setActiveFilter } = useStore();
  const wide = [products[8], products[5]];

  return (
    <section id="categories" className="relative bg-ink-2 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_10%_-10%,rgba(74,13,28,0.5),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="01"
          eyebrow="Shop by category"
          title={
            <>
              Seven departments.
              <br />
              <span className="italic text-gold-2">One considered destination.</span>
            </>
          }
          copy="Everything at Adult Central Superstore is filed the way you'd expect a department store to file it — by product type, by who it's for, and by the moment you're planning for."
          action={
            <a
              href="#featured"
              onClick={() => setActiveFilter("All")}
              className="group inline-flex items-center gap-2.5 border-b border-gold/40 pb-1.5 font-cond text-[11.5px] font-semibold uppercase tracking-[0.24em] text-cream transition-colors hover:border-gold hover:text-gold-2"
            >
              View the full floor plan
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          }
        />

        <Reveal className="mt-14 grid auto-rows-[152px] grid-cols-2 gap-3.5 sm:auto-rows-[180px] lg:grid-cols-12 lg:auto-rows-[190px] lg:gap-4">
          {categoryTiles.map((t, i) => (
            <a
              key={t.name}
              href="#featured"
              onClick={() => setActiveFilter(FILTER_MATCH[t.name] ?? t.name)}
              style={{ ["--rv-delay" as string]: `${80 + i * 80}ms` }}
              className={cn(
                "reveal group relative overflow-hidden border border-cream/10 bg-ink",
                SHAPES[i],
              )}
            >
                <img
                  src={t.image}
                  alt=""
                  loading={i < 2 ? "eager" : "lazy"}
                  className="absolute inset-0 size-full object-cover brightness-[0.72] contrast-[1.06] saturate-[0.85] transition-all duration-[1400ms] ease-out group-hover:scale-[1.09] group-hover:brightness-[0.92] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-burgundy/35 mix-blend-color transition-opacity duration-700 group-hover:opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
                <div className="absolute inset-[10px] border border-gold/0 transition-all duration-500 group-hover:inset-[14px] group-hover:border-gold/30" />

                {/* wide tile extras */}
                {i === 5 && (
                  <>
                    <div className="absolute right-4 top-4 hidden gap-2.5 lg:flex">
                      {wide.map((p) => (
                        <span key={p.id} className="relative block size-[76px] overflow-hidden border border-cream/15">
                          <img
                            src={p.image}
                            alt=""
                            loading="lazy"
                            className="size-full object-cover opacity-85 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                          />
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-5 right-5 hidden max-w-[380px] flex-wrap justify-end gap-1.5 lg:flex">
                      {WIDE_TAGS.map((tag) => (
                        <span
                          key={tag}
                          className="border border-cream/15 bg-ink/45 px-2.5 py-1 font-cond text-[10px] uppercase tracking-[0.16em] text-cream/75 backdrop-blur-sm transition-colors duration-300 group-hover:border-gold/40 group-hover:text-cream"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <span className="num font-cond text-[10px] uppercase tracking-[0.24em] text-gold/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-7 -translate-y-1 items-center justify-center bg-cream/10 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={13} className="text-cream" />
                    </span>
                  </div>

                  <div>
                    <h3
                      className={cn(
                        "font-display leading-[1.05] text-cream transition-colors duration-300 group-hover:text-gold-2",
                        i === 0 || i === 5
                          ? "text-[clamp(1.35rem,2.6vw,2.1rem)]"
                          : "text-[clamp(1.1rem,1.7vw,1.4rem)]",
                      )}
                    >
                      {t.name}
                    </h3>
                    <p className="mt-1.5 max-w-[34ch] text-[12.5px] leading-snug text-mist opacity-0 transition-all duration-500 group-hover:opacity-100 sm:text-[13px]">
                      {t.copy}
                    </p>
                    <div className="mt-3 flex items-center gap-3 overflow-hidden">
                      <span className="h-px w-7 bg-crimson transition-all duration-500 group-hover:w-12" />
                      <span className="font-cond text-[10px] uppercase tracking-[0.26em] text-gold-2">
                        Explore category
                      </span>
                      <span className="num font-cond text-[9.5px] uppercase tracking-[0.2em] text-mist-2">
                        {t.count}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

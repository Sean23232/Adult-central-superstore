import { ArrowUpRight, Quote } from "lucide-react";
import { media, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import { Diamond, Reveal } from "@/components/ui";

const STEPS = [
  {
    n: "One",
    t: "Choose a department",
    c: "Browse the way you would in person — by product type, by who it's for, or by the moment you're planning.",
  },
  {
    n: "Two",
    t: "Read what matters",
    c: "Materials, runtime, care and compatibility sit on the product card, not buried three clicks deep.",
  },
  {
    n: "Three",
    t: "Take your time",
    c: "Save to wishlist, quick-view without leaving the grid, and check out when you're ready. No account needed to browse.",
  },
];

export default function BrandStory() {
  const { open } = useStore();
  const inset = products[7];

  return (
    <section id="story" className="relative overflow-hidden bg-ink-2 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_0%_20%,rgba(74,13,28,0.55),transparent_62%)]" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:px-10">
        {/* imagery */}
        <div className="lg:col-span-6">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-cream/10 sm:aspect-[5/5]">
                <img
                  src={media.blackVelvet}
                  alt="Satin surface photographed in the Adult Central studio"
                  className="anim-kenburns size-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/25" />
                <div className="absolute bottom-5 left-5 border border-gold/30 bg-ink/80 px-4 py-2.5 backdrop-blur-sm">
                  <p className="font-cond text-[9.5px] uppercase tracking-[0.26em] text-gold">
                    Shot in-house
                  </p>
                  <p className="mt-1 text-[12px] text-cream/85">Every product, same light, same lens.</p>
                </div>
              </div>

              {/* inset product plate */}
              <button
                onClick={() => open({ kind: "quickview", productId: inset.id })}
                className="anim-float group absolute -bottom-8 -right-3 w-[150px] border border-cream/15 bg-ash p-2 text-left shadow-luxe transition-colors hover:border-gold/50 sm:-right-8 sm:w-[186px]"
              >
                <div className="aspect-[5/4] overflow-hidden bg-ink-2">
                  <img
                    src={inset.image}
                    alt={inset.name}
                    className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <p className="mt-2 truncate font-cond text-[10.5px] uppercase tracking-[0.18em] text-cream">
                  {inset.name}
                </p>
                <p className="mt-0.5 flex items-center justify-between text-[11px] text-mist">
                  <span>Ember Massage Oil</span>
                  <ArrowUpRight size={12} className="text-gold" />
                </p>
              </button>

              {/* vertical rule + label */}
              <div className="absolute -left-6 top-0 hidden h-full flex-col items-center justify-between lg:flex">
                <span className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
                <span className="my-3 rotate-180 font-cond text-[9.5px] uppercase tracking-[0.34em] text-mist-2 [writing-mode:vertical-rl]">
                  Est. superstore · 18+
                </span>
                <span className="w-px flex-1 bg-gradient-to-b from-transparent via-crimson/45 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* copy */}
        <div className="lg:col-span-6 lg:pl-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-[10px] text-gold">
              <span className="h-px w-10 bg-gold/50" /> The brand
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.02] tracking-[-0.015em] text-cream">
              More than a store.
              <br />
              <span className="italic text-gold-2">A space to discover.</span>
            </h2>
            <p className="mt-7 max-w-[54ch] text-[15.5px] leading-relaxed text-mist">
              Adult Central Superstore brings together an extensive world of intimate lifestyle products in
              one convenient destination. Explore thoughtfully organised collections and discover products
              that suit your individual preferences.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <figure className="mt-8 border-l-2 border-crimson pl-5">
              <Quote size={16} className="mb-2 text-gold/70" />
              <blockquote className="font-display text-[18px] italic leading-snug text-cream/92">
                “We wanted the shelf to feel like a department store and the page to read like a buying
                guide. Nobody should need a glossary to buy something for their own wellbeing.”
              </blockquote>
              <figcaption className="mt-3 font-cond text-[10px] uppercase tracking-[0.24em] text-mist-2">
                Buying team · Adult Central Superstore
              </figcaption>
            </figure>
          </Reveal>

          <ol className="mt-10 space-y-0 border-t border-cream/[0.08]">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={160 + i * 90} as="li">
                <div className="group grid grid-cols-[auto_1fr] items-start gap-5 border-b border-cream/[0.08] py-5 transition-colors hover:bg-cream/[0.02]">
                  <span className="flex items-center gap-2 pt-1">
                    <Diamond className="bg-crimson transition-transform duration-500 group-hover:rotate-[135deg]" />
                    <span className="num font-cond text-[10px] uppercase tracking-[0.24em] text-mist-2">
                      {s.n}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] leading-tight text-cream">{s.t}</h3>
                    <p className="mt-1.5 max-w-[48ch] text-[13.5px] leading-relaxed text-mist">{s.c}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={420}>
            <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
              {[
                ["07", "Departments"],
                ["10", "Spotlight pieces"],
                ["08", "Houses stocked"],
              ].map(([v, k]) => (
                <p key={k} className="flex items-baseline gap-2.5">
                  <span className="num font-display text-[30px] leading-none text-gold-2">{v}</span>
                  <span className="font-cond text-[10.5px] uppercase tracking-[0.24em] text-mist">
                    {k}
                  </span>
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

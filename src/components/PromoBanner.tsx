import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { media, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import { Button, Reveal } from "@/components/ui";

export default function PromoBanner() {
  const { open } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const y = useRef(0);
  const img = useRef<HTMLImageElement>(null);
  const kit = products[5];

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      y.current = Math.max(-1, Math.min(1, (progress - 0.5) * 2)) * 46;
      frame = requestAnimationFrame(() => {
        if (img.current) img.current.style.transform = `translate3d(0, ${y.current}px, 0) scale(1.14)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="grain relative isolate overflow-hidden border-y border-cream/[0.07] bg-ink"
    >
      <img
        ref={img}
        src={media.redSilk}
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(10,8,7,0.97)_28%,rgba(44,7,16,0.8)_58%,rgba(10,8,7,0.55))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_88%_10%,rgba(201,162,74,0.16),transparent_60%)]" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-[10px] text-gold">
              <span className="h-px w-10 bg-gold/50" /> The seasonal promotion
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6.6vw,4.9rem)] leading-[0.98] tracking-[-0.02em] text-cream">
              Your experience.
              <br />
              <span className="italic text-gold-2">Your discovery.</span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-7 max-w-[46ch] text-[16px] leading-relaxed text-mist">
              Explore products designed to celebrate comfort, confidence, connection, and personal
              wellness.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="#featured">
                Shop the collection
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <button
                onClick={() => open({ kind: "search" })}
                className="group inline-flex items-center gap-2 border-b border-cream/25 pb-1 font-cond text-[11.5px] uppercase tracking-[0.22em] text-cream/85 transition-colors hover:border-gold hover:text-gold-2"
              >
                Search the floor
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/10 pt-6">
              {[
                ["Highlighted", "Vespers Intimacy Kit"],
                ["Also featured", "Solstice Gift Set"],
                ["Presentation", "Ribbon-tied, gift-ready"],
              ].map(([k, v]) => (
                <p key={k} className="text-[12px]">
                  <span className="font-cond uppercase tracking-[0.22em] text-mist-2">{k}</span>
                  <span className="ml-2.5 text-cream">{v}</span>
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={160}>
            <button
              onClick={() => open({ kind: "quickview", productId: kit.id })}
              className="group relative block w-full max-w-[430px] border border-gold/25 bg-ash/70 p-3 text-left shadow-luxe backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1.5 lg:ml-auto"
            >
              <span className="absolute -left-px -top-px h-10 w-10 border-l border-t border-gold" />
              <span className="absolute -bottom-px -right-px h-10 w-10 border-b border-r border-gold" />
              <div className="relative aspect-[5/4] overflow-hidden bg-ink-2">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute left-3 top-3 bg-ink/75 px-2.5 py-1 font-cond text-[9.5px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
                  Featured in the promotion
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 px-1.5 pb-1 pt-4">
                <div>
                  <p className="font-display text-[20px] leading-tight text-cream">{kit.name}</p>
                  <p className="mt-1 text-[12.5px] text-mist">{kit.tagline}</p>
                </div>
                <span className="flex flex-col items-end">
                  <span className="num font-display text-[22px] text-gold-2">${kit.price}</span>
                  <span className="font-cond text-[9.5px] uppercase tracking-[0.2em] text-mist-2">
                    Quick view
                  </span>
                </span>
              </div>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

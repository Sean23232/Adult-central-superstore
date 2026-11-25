import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { media, products } from "@/data/catalog";
import { useStore } from "@/store/store";
import { Button, Reveal } from "@/components/ui";

function Spark({ i }: { i: number }) {
  const seeds = [
    { left: "12%", top: "68%", dx: "30px", dy: "-150px", d: "0s", s: "5.5s" },
    { left: "26%", top: "82%", dx: "-22px", dy: "-190px", d: "1.4s", s: "6.5s" },
    { left: "44%", top: "74%", dx: "44px", dy: "-160px", d: "2.6s", s: "5.8s" },
    { left: "63%", top: "86%", dx: "-34px", dy: "-210px", d: "0.8s", s: "7s" },
    { left: "78%", top: "70%", dx: "26px", dy: "-170px", d: "3.4s", s: "6.2s" },
    { left: "88%", top: "84%", dx: "-16px", dy: "-140px", d: "2s", s: "5.2s" },
  ][i];
  return (
    <span
      aria-hidden
      className="absolute size-[3px] rounded-full bg-gold-2"
      style={
        {
          left: seeds.left,
          top: seeds.top,
          animation: `spark ${seeds.s} ease-out ${seeds.d} infinite`,
          "--dx": seeds.dx,
          "--dy": seeds.dy,
          boxShadow: "0 0 10px 2px rgba(230,197,132,0.55)",
        } as React.CSSProperties
      }
    />
  );
}

export default function Hero() {
  const { setActiveFilter } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const hero = products[0];
  const second = products[1];

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      setTilt({ x: (x - 0.5) * 10, y: (y - 0.5) * -10 });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="grain relative overflow-hidden border-b border-cream/[0.07] bg-ink"
      style={{ "--mx": "50%", "--my": "40%" } as React.CSSProperties}
    >
      {/* ---- layered atmosphere ---- */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={media.heroSilk}
          alt=""
          className="anim-kenburns absolute inset-0 size-full object-cover opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/88 to-burgundy-2/85" />
        <img
          src={media.heroSparks}
          alt=""
          className="anim-drift absolute -top-1/4 right-[-10%] w-[70%] opacity-[0.16] mix-blend-screen"
        />
        <div
          className="absolute inset-0 opacity-70 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(201,162,74,0.14), transparent 68%)",
          }}
        />
        <div className="dotgrid absolute inset-0 opacity-[0.18]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Spark key={i} i={i} />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-12 lg:px-10 lg:pb-24 lg:pt-24">
        {/* ---- left: editorial statement ---- */}
        <div className="lg:col-span-7">
          <div className={ready ? "is-in" : ""}>
            <p className="eyebrow flex items-center gap-3 text-[10px] text-gold">
              <span className="h-px w-10 bg-gold/50" />
              Adult Central Superstore · Intimate lifestyle retail
            </p>

            <h1 className="mt-7 font-display text-[clamp(2.6rem,8.4vw,6.2rem)] font-normal leading-[0.92] tracking-[-0.02em] text-cream">
              <span className="line-mask" style={{ ["--rv-delay" as string]: "60ms" }}>
                <span>Discover</span>
              </span>
              <span className="line-mask" style={{ ["--rv-delay" as string]: "180ms" }}>
                <span className="text-mist/85">a world of</span>
              </span>
              <span className="line-mask" style={{ ["--rv-delay" as string]: "300ms" }}>
                <span className="italic text-gold-2">possibilities</span>
              </span>
            </h1>
          </div>

          <Reveal delay={460}>
            <p className="mt-8 max-w-[52ch] text-[16px] leading-relaxed text-mist sm:text-[17px]">
              Explore a thoughtfully curated collection of intimate essentials, innovative products, and
              lifestyle favorites — organised by department, presented without the gimmick.
            </p>
          </Reveal>

          <Reveal delay={560}>
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <Button href="#categories">
                Explore the collection
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveFilter("New Arrivals");
                  document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Discover what's new
              </Button>
            </div>
          </Reveal>

          <Reveal delay={660}>
            <dl className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-cream/[0.08] pt-7">
              {[
                ["Departments", "07 + New Arrivals"],
                ["Spotlight edit", "10 pieces, curated"],
                ["Every parcel", "Unmarked & discreet"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-cond text-[10px] uppercase tracking-[0.28em] text-mist-2">{k}</dt>
                  <dd className="mt-1.5 font-display text-[17px] text-cream">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ---- right: product collage ---- */}
        <div className="lg:col-span-5">
          <div
            className="relative mx-auto max-w-[440px] transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `perspective(1100px) rotateY(${tilt.x * 0.5}deg) rotateX(${tilt.y * 0.5}deg)` }}
          >
            <Reveal delay={300}>
              <a
                href="#featured"
                className="group relative block border border-cream/12 bg-ash/70 p-3 shadow-luxe backdrop-blur-sm"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-2 bg-crimson px-3 py-1.5 font-cond text-[10px] font-semibold uppercase tracking-[0.2em] text-cream">
                    <Sparkles size={11} /> {hero.badge}
                  </span>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                    <div>
                      <p className="font-cond text-[10px] uppercase tracking-[0.26em] text-gold">
                        {hero.house}
                      </p>
                      <p className="mt-1 font-display text-[21px] leading-tight text-cream">{hero.name}</p>
                    </div>
                    <span className="num shrink-0 font-display text-[19px] text-cream">
                      ${hero.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1.5 pb-0.5 pt-3">
                  <span className="font-cond text-[10.5px] uppercase tracking-[0.22em] text-mist-2">
                    {hero.category}
                  </span>
                  <span className="flex items-center gap-1.5 font-cond text-[10.5px] uppercase tracking-[0.22em] text-cream transition-colors group-hover:text-gold-2">
                    View product
                    <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>

            <Reveal delay={520}>
              <div className="anim-float absolute -bottom-10 left-0 w-[150px] border border-gold/25 bg-ink/95 p-2.5 shadow-luxe backdrop-blur-md sm:-bottom-12 sm:-left-14 sm:w-[186px]">
                <div className="aspect-[5/4] overflow-hidden bg-ash">
                  <img
                    src={second.image}
                    alt={second.name}
                    className="size-full object-cover transition-transform duration-1000 hover:scale-110"
                  />
                </div>
                <p className="mt-2 truncate font-cond text-[10.5px] uppercase tracking-[0.16em] text-cream">
                  {second.name}
                </p>
                <p className="num mt-0.5 text-[11.5px] text-gold">
                  New · ${second.price}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-cond text-[9.5px] uppercase tracking-[0.32em] text-mist-2">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-cream/15">
          <span className="anim-float absolute inset-x-0 top-0 block h-4 bg-gold" />
        </span>
      </div>
    </section>
  );
}

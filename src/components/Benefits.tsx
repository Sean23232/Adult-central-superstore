import { media } from "@/data/catalog";
import { Reveal, SectionHead } from "@/components/ui";

const IconCurate = (
  <svg viewBox="0 0 44 44" fill="none" className="size-9" stroke="currentColor" strokeWidth="1.15">
    <rect x="4" y="6" width="15" height="15" />
    <rect x="25" y="6" width="15" height="15" />
    <rect x="4" y="27" width="15" height="11" />
    <path d="M25 27h15M25 32.5h9" strokeLinecap="round" />
    <path d="M32.5 36.5l1.1 2.3 2.4.3-1.8 1.7.5 2.5-2.2-1.3-2.2 1.3.5-2.5-1.8-1.7 2.4-.3z" strokeLinejoin="round" />
  </svg>
);

const IconPrivacy = (
  <svg viewBox="0 0 44 44" fill="none" className="size-9" stroke="currentColor" strokeWidth="1.15">
    <path d="M6 16l16-8 16 8v14l-16 8-16-8z" strokeLinejoin="round" />
    <path d="M6 16l16 8 16-8M22 24v14" />
    <circle cx="22" cy="33" r="2.4" />
    <path d="M22 35.4V38" strokeLinecap="round" />
  </svg>
);

const IconQuality = (
  <svg viewBox="0 0 44 44" fill="none" className="size-9" stroke="currentColor" strokeWidth="1.15">
    <path d="M22 4l14 5v13c0 9-6 14.5-14 18-8-3.5-14-9-14-18V9z" strokeLinejoin="round" />
    <path d="M22 14.5l5.5 5.5-5.5 5.5-5.5-5.5z" strokeLinejoin="round" />
    <path d="M15.5 30h13" strokeLinecap="round" />
  </svg>
);

const IconCare = (
  <svg viewBox="0 0 44 44" fill="none" className="size-9" stroke="currentColor" strokeWidth="1.15">
    <path d="M5 10h24v16H15l-6 6v-6H5z" strokeLinejoin="round" />
    <path d="M33 16h6v14h-4v5l-5-5h-6" strokeLinejoin="round" />
    <path d="M12 18c1.6-2.6 5-1.2 5 1.2 0 2.4-3.2 4.4-5 5.6-1.8-1.2-5-3.2-5-5.6 0-2.4 3.4-3.8 5-1.2z" />
  </svg>
);

const ITEMS = [
  {
    Icon: IconCurate,
    n: "01",
    title: "Curated Product Selection",
    copy: "No endless aisle. Every item in the spotlight edit is chosen by our buying team for a specific use, material or price point — then photographed the same way so you can compare fairly.",
    points: ["Seven departments", "Ten featured pieces", "Plain-language descriptions"],
  },
  {
    Icon: IconPrivacy,
    n: "02",
    title: "Privacy-Conscious Shopping",
    copy: "Unbranded outer packaging, a discreet billing descriptor and a wishlist that stays on your device. Browsing here never asks for an account.",
    points: ["Unmarked boxes", "Neutral statement label", "No account required to browse"],
  },
  {
    Icon: IconQuality,
    n: "03",
    title: "Quality-Focused Collections",
    copy: "We list materials, runtime, care and compatibility on the product itself, so you can judge build quality before you decide.",
    points: ["Materials stated up front", "Care instructions included", "Compatibility noted"],
  },
  {
    Icon: IconCare,
    n: "04",
    title: "Customer-Focused Experience",
    copy: "Questions about sizing, fit or function go to a product specialist. Every department page carries the same contact route.",
    points: ["Specialist answers", "FAQs per department", "Returns explained clearly"],
  },
];

export default function Benefits() {
  return (
    <section id="why" className="relative overflow-hidden bg-ink py-20 sm:py-24 lg:py-28">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-[0.1]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHead
          index="03"
          eyebrow="Why shop with us"
          title={
            <>
              Promises the page can
              <br />
              <span className="italic text-gold-2">actually keep.</span>
            </>
          }
          copy="Four things we commit to on every product page — nothing invented for the banner, nothing that disappears after checkout."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {/* feature card */}
          <Reveal className="lg:col-span-5">
            <div className="group relative h-full overflow-hidden border border-cream/12 bg-ink-2">
              <img
                src={media.blackSatin}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-30 brightness-[0.7] transition-all duration-[1400ms] ease-out group-hover:scale-105 group-hover:opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/30" />
              <div className="relative flex h-full flex-col justify-between p-7 pt-9 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="text-gold">{ITEMS[0].Icon}</span>
                  <span className="num font-display text-[46px] leading-none text-cream/12">{ITEMS[0].n}</span>
                </div>
                <div className="mt-14">
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] text-cream">
                    {ITEMS[0].title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-mist">{ITEMS[0].copy}</p>
                  <ul className="mt-6 space-y-2 border-t border-cream/10 pt-5">
                    {ITEMS[0].points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[12.5px] text-cream/80">
                        <span className="size-1.5 rotate-45 bg-crimson" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* stacked list cards */}
          <div className="grid gap-4 lg:col-span-7">
            {ITEMS.slice(1).map((it, i) => (
              <Reveal key={it.title} delay={90 + i * 90}>
                <div className="group relative flex h-full items-start gap-5 overflow-hidden border border-cream/10 bg-ash/45 p-6 transition-all duration-500 hover:border-gold/35 hover:bg-ash sm:gap-7 sm:p-7">
                  <span className="absolute inset-y-0 left-0 w-[2px] scale-y-0 bg-gradient-to-b from-crimson to-gold transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="shrink-0 text-gold transition-transform duration-500 group-hover:-translate-y-0.5">
                    {it.Icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-display text-[clamp(1.2rem,2vw,1.55rem)] leading-tight text-cream">
                        {it.title}
                      </h3>
                      <span className="num font-cond text-[10px] uppercase tracking-[0.24em] text-mist-2">
                        {it.n}
                      </span>
                    </div>
                    <p className="mt-2.5 max-w-[52ch] text-[13.5px] leading-relaxed text-mist">{it.copy}</p>
                  </div>
                  <ul className="hidden w-[190px] shrink-0 space-y-2 border-l border-cream/10 pl-5 xl:block">
                    {it.points.map((p) => (
                      <li key={p} className="text-[11.5px] leading-snug text-mist-2 transition-colors group-hover:text-cream/80">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

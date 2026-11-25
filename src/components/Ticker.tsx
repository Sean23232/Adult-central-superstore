const ITEMS = [
  "Adults 18+ only",
  "Unmarked outer packaging",
  "Curated, never crowded",
  "Body-safe materials first",
  "Real product photography",
  "Gift wrapping on request",
  "Discreet billing descriptor",
  "Secure checkout demonstration",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="group relative overflow-hidden border-y border-cream/[0.07] bg-crimson py-3">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,8,7,0.35),transparent_18%,transparent_82%,rgba(10,8,7,0.35))]" />
      <div className="anim-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-cond text-[11.5px] font-semibold uppercase tracking-[0.3em] text-cream/95">
              {t}
            </span>
            <span className="inline-block size-1.5 rotate-45 bg-gold-2" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

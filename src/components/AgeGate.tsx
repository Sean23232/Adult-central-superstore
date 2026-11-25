import { useEffect } from "react";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { media } from "@/data/catalog";
import { useStore } from "@/store/store";

export default function AgeGate() {
  const { accepted, acceptAge, declined, declineAge } = useStore();
  const blocked = !accepted || declined;

  useEffect(() => {
    document.body.style.overflow = blocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [blocked]);

  if (!blocked) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-ink px-5 py-10"
      role="dialog"
      aria-modal="true"
      aria-label="Age verification"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={media.fireworkSky}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-[0.22] mix-blend-screen anim-drift"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(192,24,43,0.28),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,rgba(201,162,74,0.14),transparent_60%)]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="anim-scale relative w-full max-w-[560px] border border-cream/12 bg-ash/80 shadow-luxe backdrop-blur-sm">
        <div className="h-[3px] w-full bg-gradient-to-r from-crimson via-gold to-crimson/40" />

        {declined ? (
          <div className="px-8 py-14 text-center sm:px-14">
            <p className="eyebrow text-[10px] text-gold">Access ended</p>
            <h2 className="mt-5 font-display text-[clamp(1.7rem,4vw,2.4rem)] leading-tight text-cream">
              Thank you for visiting
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-[14.5px] leading-relaxed text-mist">
              Adult Central Superstore is intended for adults aged 18 and over. You can return at any
              time and confirm your age to continue browsing.
            </p>
            <button
              onClick={acceptAge}
              className="group mt-9 inline-flex items-center gap-3 border border-cream/25 px-7 py-3.5 font-cond text-[12px] font-semibold uppercase tracking-[0.24em] text-cream transition-colors hover:border-gold/70 hover:bg-cream/[0.04] hover:text-gold-2"
            >
              Return to verification
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <div className="px-7 pb-9 pt-10 text-center sm:px-12 sm:pb-11">
            <div className="flex flex-col items-center gap-3">
              <span className="grid size-11 place-items-center bg-crimson">
                <span className="wordmark text-[18px] text-cream">AC</span>
              </span>
              <h1 className="wordmark mt-1 text-[clamp(1.6rem,5.2vw,2.35rem)] text-cream">
                Adult Central
                <span className="mt-1 block font-cond text-[10px] font-semibold uppercase tracking-[0.5em] text-gold">
                  Superstore
                </span>
              </h1>
            </div>

            <div className="mx-auto mt-8 h-px w-24 hairline" />

            <p className="mx-auto mt-8 max-w-[38ch] font-display text-[clamp(1.1rem,2.6vw,1.45rem)] leading-snug text-cream/95">
              This website contains products intended for adults aged 18 and over.
            </p>
            <p className="mx-auto mt-4 max-w-[46ch] text-[13.5px] leading-relaxed text-mist">
              Please confirm your date of birth to enter. Products on this site are sold for personal
              wellness and lifestyle use.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={acceptAge}
                className="sheen group relative inline-flex items-center justify-center gap-2.5 bg-crimson px-8 py-4 font-cond text-[12.5px] font-semibold uppercase tracking-[0.24em] text-cream transition-colors duration-300 hover:bg-ember active:scale-[0.985]"
              >
                <span className="sheen-bar" />
                <span className="relative z-10 flex items-center gap-2.5">
                  <ShieldCheck size={16} strokeWidth={1.6} />
                  I am 18 or older
                </span>
              </button>
              <button
                onClick={declineAge}
                className="inline-flex items-center justify-center border border-cream/20 px-8 py-4 font-cond text-[12.5px] font-semibold uppercase tracking-[0.24em] text-mist transition-colors duration-300 hover:border-cream/45 hover:text-cream active:scale-[0.985]"
              >
                Exit
              </button>
            </div>

            <div className="mt-9 flex flex-col items-center justify-center gap-2 text-[10.5px] text-mist-2 sm:flex-row sm:gap-5">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={11} strokeWidth={1.6} /> Unmarked packaging
              </span>
              <span className="hidden h-3 w-px bg-cream/15 sm:block" />
              <span className="inline-flex items-center gap-1.5">
                <Lock size={11} strokeWidth={1.6} /> Discreet billing descriptor
              </span>
              <span className="hidden h-3 w-px bg-cream/15 sm:block" />
              <span>Demonstration prototype — no data is stored</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Check, Heart, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/store/store";

const tone = {
  bag: { ring: "border-gold/35", chip: "bg-gold text-ink", Icon: ShoppingBag },
  heart: { ring: "border-crimson/45", chip: "bg-crimson text-cream", Icon: Heart },
  info: { ring: "border-cream/20", chip: "bg-cream text-ink", Icon: Check },
} as const;

export default function Toasts() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[160] flex flex-col items-stretch gap-2.5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[352px]">
      {toasts.map((t) => {
        const cfg = tone[t.tone];
        const Icon = cfg.Icon;
        return (
          <button
            key={t.id}
            onClick={() => dismissToast(t.id)}
            className={`anim-fadeup pointer-events-auto flex w-full items-start gap-3.5 border ${cfg.ring} bg-ash/95 px-4 py-3.5 text-left shadow-luxe backdrop-blur-md transition-transform hover:-translate-y-0.5`}
          >
            <span className={`mt-0.5 grid size-7 shrink-0 place-items-center ${cfg.chip}`}>
              <Icon size={14} strokeWidth={1.8} className={t.tone === "heart" ? "fill-current" : ""} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-cond text-[12px] font-semibold uppercase tracking-[0.2em] text-cream">
                {t.title}
              </span>
              {t.body && (
                <span className="mt-0.5 block truncate text-[12.5px] text-mist">{t.body}</span>
              )}
            </span>
            <X size={14} className="mt-1 shrink-0 text-mist-2 transition-colors hover:text-cream" />
          </button>
        );
      })}
    </div>
  );
}

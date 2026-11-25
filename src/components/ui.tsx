import type { CSSProperties, ReactNode } from "react";
import { Star } from "lucide-react";
import { cn } from "@/utils/cn";
import { useReveal } from "@/store/store";

/* ---------------- scroll reveal ---------------- */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "header" | "article" | "span";
}) {
  const ref = useReveal<HTMLDivElement>();
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Comp>
  );
}

/* ---------------- brand lockup ---------------- */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="Adult Central Superstore — home"
      className={cn("group flex items-center gap-3", compact && "gap-2.5")}
    >
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden bg-crimson">
        <span className="wordmark text-[17px] leading-none text-cream transition-transform duration-500 group-hover:-translate-y-10">
          AC
        </span>
        <span className="wordmark absolute inset-0 grid translate-y-10 place-items-center text-[17px] text-gold-2 transition-transform duration-500 group-hover:translate-y-0">
          18+
        </span>
      </span>
      <span className="flex flex-col">
        <span className="wordmark text-[19px] text-cream sm:text-[21px]">
          Adult Central
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-3 bg-crimson" />
          <span
            className={cn(
              "font-cond text-[9.5px] font-semibold uppercase tracking-[0.46em] text-gold",
              compact && "tracking-[0.34em]",
            )}
          >
            Superstore
          </span>
          <span className="h-px w-3 bg-crimson" />
        </span>
      </span>
    </a>
  );
}

/* ---------------- rating ---------------- */
export function Stars({ value, size = 12 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            "transition-colors",
            i + 1 <= Math.round(value) ? "fill-gold text-gold" : "fill-transparent text-smoke",
          )}
          strokeWidth={1.4}
        />
      ))}
    </span>
  );
}

/* ---------------- section heading ---------------- */
export function SectionHead({
  index,
  eyebrow,
  title,
  copy,
  action,
  className,
  light = false,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  action?: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <Reveal className="max-w-2xl">
        <span
          className={cn(
            "eyebrow flex items-center gap-3 text-[10.5px]",
            light ? "text-crimson" : "text-gold",
          )}
        >
          {index && (
            <span className={cn("num text-[10px]", light ? "text-crimson/60" : "text-mist-2")}>
              {index}
            </span>
          )}
          <span className={cn("h-px w-8", light ? "bg-crimson/50" : "bg-gold/40")} />
          {eyebrow}
        </span>
        <h2
          className={cn(
            "mt-4 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.03] tracking-[-0.015em]",
            light ? "text-ink" : "text-cream",
          )}
        >
          {title}
        </h2>
        {copy && (
          <p
            className={cn(
              "mt-4 max-w-xl text-[15px] leading-relaxed",
              light ? "text-ink/70" : "text-mist",
            )}
          >
            {copy}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={120}>{action}</Reveal>}
    </div>
  );
}

/* ---------------- buttons ---------------- */
type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "gold" | "outline";
  className?: string;
  type?: "button" | "submit";
  full?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  full,
}: BtnProps) {
  const base =
    "sheen group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-cond text-[12.5px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 active:scale-[0.985]";
  const styles = {
    primary:
      "bg-crimson text-cream hover:bg-ember hover:shadow-[0_16px_40px_-18px_rgba(224,49,58,0.85)]",
    gold: "bg-gold text-ink hover:bg-gold-2 hover:shadow-[0_16px_40px_-20px_rgba(201,162,74,0.9)]",
    outline:
      "border border-cream/25 text-cream hover:border-gold/70 hover:bg-cream/[0.04] hover:text-gold-2",
    ghost: "text-mist hover:text-cream",
  }[variant];
  const inner = (
    <>
      <span className="sheen-bar" />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  );
  if (href)
    return (
      <a href={href} className={cn(base, styles, full && "w-full", className)}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cn(base, styles, full && "w-full", className)}>
      {inner}
    </button>
  );
}

/* ---------------- decorative rule ---------------- */
export function Diamond({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-block size-1.5 rotate-45 bg-gold/70", className)}
      aria-hidden="true"
    />
  );
}

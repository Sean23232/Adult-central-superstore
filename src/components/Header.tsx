import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Headset,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { navCategories } from "@/data/catalog";
import { useStore } from "@/store/store";
import { Logo } from "@/components/ui";
import { cn } from "@/utils/cn";

const PROMO = [
  "Season of Claret — up to 25% off selected wellness essentials",
  "Every order ships in unmarked, unbranded packaging",
  "Complimentary gift ribbon & handwritten note at checkout",
];

/* ================= announcement strip ================= */
function Strip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % PROMO.length), 4200);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="border-b border-cream/10 bg-gradient-to-r from-burgundy-2 via-ink to-burgundy-2 text-cream">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <p key={i} className="anim-fadeup flex min-w-0 items-center gap-2.5">
          <Sparkles size={12} className="shrink-0 text-gold" strokeWidth={1.8} />
          <span className="truncate font-cond text-[10.5px] font-semibold uppercase tracking-[0.26em] text-cream/90">
            {PROMO[i]}
          </span>
        </p>
        <div className="hidden shrink-0 items-center gap-5 sm:flex">
          <a
            href="#faq"
            className="group flex items-center gap-1.5 font-cond text-[10.5px] uppercase tracking-[0.24em] text-mist transition-colors hover:text-gold-2"
          >
            <Headset size={12} strokeWidth={1.7} />
            Customer care · 7 days a week
          </a>
          <span className="h-3 w-px bg-cream/15" />
          <a
            href="#discreet"
            className="font-cond text-[10.5px] uppercase tracking-[0.24em] text-mist transition-colors hover:text-gold-2"
          >
            Discreet shopping
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================= mega menu panel ================= */
function MegaPanel({ index, onPick }: { index: number; onPick: () => void }) {
  const cat = navCategories[index];
  return (
    <div
      className="absolute inset-x-0 top-full hidden border-b border-cream/10 bg-ash/97 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl lg:block"
      aria-hidden
    >
      <div className="pointer-events-auto mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-10 py-9">
        <div className="col-span-2">
          <p className="eyebrow text-[9.5px] text-gold">{cat.name}</p>
          <p className="mt-4 text-[13px] leading-relaxed text-mist">{cat.blurb}</p>
          <a
            href="#featured"
            onClick={onPick}
            className="group mt-6 inline-flex items-center gap-2 font-cond text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:text-gold-2"
          >
            Shop all
            <span className="h-px w-6 bg-crimson transition-all duration-300 group-hover:w-10" />
          </a>
        </div>

        {cat.columns.map((col, ci) => (
          <div key={col.title} className="col-span-2">
            <p className="font-cond text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/95">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l, li) => (
                <li
                  key={l}
                  className="anim-fadeup"
                  style={{ animationDelay: `${li * 34 + ci * 20}ms` }}
                >
                  <a
                    href="#featured"
                    className="group flex items-center gap-2 text-[13.5px] text-mist transition-colors hover:text-cream"
                  >
                    <span className="h-1 w-1 rotate-45 bg-smoke transition-colors duration-300 group-hover:bg-gold" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-4 ml-auto w-full">
          <a href="#featured" className="group relative block overflow-hidden bg-ink-2">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={cat.feature.image}
                alt=""
                loading="lazy"
                className="size-full object-cover opacity-70 grayscale-[0.35] transition-all duration-[1.1s] ease-out group-hover:scale-[1.07] group-hover:opacity-95 group-hover:grayscale-0"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="eyebrow text-[9px] text-gold">{cat.feature.eyebrow}</p>
              <p className="mt-2 font-display text-[22px] leading-tight text-cream">
                {cat.feature.title}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-[11.5px] text-mist">
                {cat.feature.count}
                <span className="h-px w-4 bg-gold/50 transition-all duration-300 group-hover:w-8" />
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================= mobile navigation ================= */
function MobileNav({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(0);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] lg:hidden">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />
      <nav className="anim-drawer absolute inset-y-0 right-0 flex w-[min(400px,92vw)] flex-col border-l border-cream/10 bg-ash shadow-luxe">
        <div className="flex items-center justify-between border-b border-cream/10 px-5 py-4">
          <Logo compact />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-9 place-items-center border border-cream/15 text-cream transition-colors hover:border-gold/60 hover:text-gold-2"
          >
            <X size={17} />
          </button>
        </div>

        <div className="nice-scroll flex-1 overflow-y-auto px-5 py-5">
          <button
            onClick={() => {
              onClose();
              onSearch();
            }}
            className="flex w-full items-center gap-3 border border-cream/12 bg-ink-2 px-4 py-3 text-left text-[13.5px] text-mist-2 transition-colors hover:border-gold/40"
          >
            <Search size={15} />
            Search 10 featured products…
          </button>

          <ul className="mt-6 divide-y divide-cream/[0.07] border-y border-cream/[0.07]">
            {navCategories.map((c, i) => (
              <li key={c.name}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex w-full items-center justify-between py-3.5 text-left"
                >
                  <span className="font-cond text-[15px] font-semibold uppercase tracking-[0.13em] text-cream">
                    {c.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "text-mist transition-transform duration-300",
                      expanded === i && "rotate-180 text-gold",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-500 ease-out",
                    expanded === i ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0">
                    <p className="mb-3 text-[12.5px] leading-relaxed text-mist-2">{c.blurb}</p>
                    <div className="flex flex-wrap gap-2">
                      {c.columns.flatMap((col) => col.links).slice(0, 7).map((l) => (
                        <a
                          key={l}
                          href="#featured"
                          onClick={onClose}
                          className="border border-cream/12 px-3 py-1.5 text-[11.5px] text-mist transition-colors hover:border-gold/50 hover:text-cream"
                        >
                          {l}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-7 space-y-2 text-[13px]">
            {[
              ["Account", "#"],
              ["Wishlist", "#"],
              ["Shipping Information", "#"],
              ["Returns & Refunds", "#"],
              ["FAQs", "#faq"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={onClose}
                className="flex items-center justify-between border-b border-cream/[0.06] py-2.5 text-mist transition-colors hover:text-gold-2"
              >
                {label}
                <span className="font-cond text-[10px] uppercase tracking-[0.2em] text-mist-2">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-cream/10 p-5">
          <a
            href="#featured"
            onClick={onClose}
            className="block bg-crimson py-3.5 text-center font-cond text-[12.5px] font-semibold uppercase tracking-[0.24em] text-cream"
          >
            Explore the collection
          </a>
          <p className="mt-3 text-center text-[10.5px] text-mist-2">
            18+ only · Unmarked packaging on every order
          </p>
        </div>
      </nav>
    </div>
  );
}



/* ================= header ================= */
export default function Header() {
  const { cartCount, wishlist, open, setActiveFilter } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [bump, setBump] = useState(false);
  const closeTimer = useRef<number | null>(null);



  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevCount = useRef(cartCount);
  useEffect(() => {
    if (prevCount.current !== cartCount) {
      prevCount.current = cartCount;
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 520);
      return () => window.clearTimeout(t);
    }
  }, [cartCount]);

  // lock the page behind the mobile drawer
  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobile]);

  const armClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setHover(null), 220);
  };
  const armOpen = (i: number) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setHover(i);
  };

  return (
    <header
      id="top"
      className="sticky top-0 z-[100]"
      onMouseLeave={armClose}
      onMouseEnter={() => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
      }}
    >
      <div
        className={cn(
          "overflow-hidden transition-all duration-500",
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100",
        )}
      >
        <Strip />
      </div>

      <div
        className={cn(
          "relative border-b transition-colors duration-500",
          scrolled
            ? "border-cream/10 bg-ink/92 backdrop-blur-xl"
            : "border-cream/[0.07] bg-ink/80 backdrop-blur-md",
        )}
      >
        {/* main row */}
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex flex-1 items-center gap-4">
            <button
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              className="-ml-1 grid size-10 place-items-center text-cream transition-colors hover:text-gold-2 lg:hidden"
            >
              <Menu size={21} strokeWidth={1.5} />
            </button>
            <Logo compact={scrolled} />
          </div>

          {/* search field */}
          <button
            onClick={() => open({ kind: "search" })}
            className={cn(
              "group hidden items-center gap-3 border border-cream/12 bg-ink-2/80 px-4 py-2.5 text-left transition-all duration-300 hover:border-gold/45 lg:flex",
              "xl:w-[360px] xl:flex-none",
              scrolled ? "w-[300px]" : "w-[340px]",
            )}
          >
            <Search size={15} className="text-mist transition-colors group-hover:text-gold-2" />
            <span className="flex-1 truncate text-[13px] text-mist-2">
              Search massagers, lingerie, essentials…
            </span>
            <span className="font-cond text-[10px] uppercase tracking-[0.18em] text-mist-2 transition-colors group-hover:text-gold">
              Enter
            </span>
          </button>

          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <button
              onClick={() => open({ kind: "search" })}
              aria-label="Search"
              className="grid size-10 place-items-center text-cream transition-colors hover:text-gold-2 lg:hidden"
            >
              <Search size={19} strokeWidth={1.6} />
            </button>
            <a
              href="#account"
              className="hidden items-center gap-2 px-2 py-2 text-cream transition-colors hover:text-gold-2 sm:flex"
            >
              <User size={19} strokeWidth={1.5} />
              <span className="hidden font-cond text-[11px] uppercase tracking-[0.16em] xl:inline">
                Account
              </span>
            </a>
            <button
              onClick={() => open({ kind: "wishlist" })}
              className="group relative flex items-center gap-2 px-2 py-2 text-cream transition-colors hover:text-gold-2"
              aria-label={`Wishlist, ${wishlist.length} saved`}
            >
              <Heart
                size={19}
                strokeWidth={1.5}
                className={cn(
                  "transition-all duration-300 group-hover:scale-110",
                  wishlist.length > 0 && "fill-crimson text-crimson",
                )}
              />
              <span className="hidden font-cond text-[11px] uppercase tracking-[0.16em] xl:inline">
                Wishlist
              </span>
              {wishlist.length > 0 && (
                <span className="num absolute -right-0.5 -top-0.5 grid size-[17px] place-items-center bg-crimson text-[9.5px] font-bold text-cream xl:left-[22px] xl:right-auto">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => open({ kind: "cart" })}
              className={cn(
                "group relative ml-1 flex items-center gap-2.5 border border-cream/12 px-3 py-2.5 transition-all duration-300 hover:border-gold/50 hover:bg-cream/[0.04]",
                bump && "anim-pop",
              )}
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} className="text-cream" />
              <span className="hidden font-cond text-[11px] uppercase tracking-[0.16em] text-cream sm:inline">
                Bag
              </span>
              <span className="num grid min-w-[18px] place-items-center bg-gold px-1 text-[10px] font-bold text-ink">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* nav row */}
        <div className="mx-auto hidden max-w-[1400px] items-center justify-between px-10 lg:flex">
          <ul className="flex items-center">
            {navCategories.map((c, i) => (
              <li key={c.name} onMouseEnter={() => armOpen(i)}>
                <a
                  href="#featured"
                  onMouseEnter={() => armOpen(i)}
                  onFocus={() => armOpen(i)}
                  onClick={() => {
                    setActiveFilter(c.name);
                    setHover(null);
                  }}
                  className={cn(
                    "group relative inline-flex items-center gap-1.5 py-3 font-cond text-[11.5px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                    hover === i ? "text-cream" : "text-mist hover:text-cream",
                    c.name === "New Arrivals" && "text-gold hover:text-gold-2",
                  )}
                >
                  {c.name}
                  <span
                    className={cn(
                      "absolute -bottom-px left-0 h-[2px] bg-gradient-to-r from-crimson to-gold transition-all duration-[400ms]",
                      hover === i ? "w-full opacity-100" : "w-0 opacity-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#featured"
            className="group flex items-center gap-2 py-3 font-cond text-[11px] uppercase tracking-[0.2em] text-mist transition-colors hover:text-gold-2"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-crimson" />
            Live: Autumn Discovery Event
          </a>
        </div>

        {/* scroll progress */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-cream/5">
          <div
            className="h-full bg-gradient-to-r from-crimson via-ember to-gold transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* mega panels */}
      <div
        className={cn(
          "absolute inset-x-0 top-full hidden transition-all duration-300 lg:block",
          hover === null ? "pointer-events-none translate-y-2 opacity-0" : "translate-y-0 opacity-100",
        )}
        onMouseEnter={() => {
          if (closeTimer.current) window.clearTimeout(closeTimer.current);
        }}
        onMouseLeave={armClose}
      >
        {hover !== null && (
          <MegaPanel index={hover} onPick={() => setActiveFilter(navCategories[hover].name)} />
        )}
      </div>

      <MobileNav
        open={mobile}
        onClose={() => setMobile(false)}
        onSearch={() => {
          setMobile(false);
          open({ kind: "search" });
        }}
      />
    </header>
  );
}

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown, Lock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

const SOCIALS: { label: string; path: ReactNode }[] = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1.05" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "X",
    path: (
      <>
        <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
      </>
    ),
  },
  {
    label: "YouTube",
    path: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10.4 9.4l5.2 2.6-5.2 2.6z" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "TikTok",
    path: (
      <>
        <path d="M13.8 3.2v10.4a3.6 3.6 0 1 1-3.6-3.6" strokeLinecap="round" />
        <path d="M13.8 3.2c.6 2.9 2.5 4.5 5.4 4.8" strokeLinecap="round" />
      </>
    ),
  },
];
import { Logo, Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      ["All Collections", "#categories"],
      ["New Arrivals", "#featured"],
      ["Featured Products", "#featured"],
      ["The Spotlight Edit", "#featured"],
      ["Gift Sets", "#featured"],
    ],
  },
  {
    title: "Customer Support",
    links: [
      ["Contact Us", "#faq"],
      ["FAQs", "#faq"],
      ["Shipping Information", "#faq"],
      ["Returns & Refunds", "#faq"],
    ],
  },
  {
    title: "Information",
    links: [
      ["About Us", "#story"],
      ["Privacy Policy", "#"],
      ["Terms & Conditions", "#"],
      ["Discreet Shopping Information", "#discreet"],
    ],
  },
];

const DISCREET = [
  {
    Icon: Lock,
    t: "Unmarked packaging",
    c: "Plain outer carton, no brand marks, no product description on the label.",
  },
  {
    Icon: ShieldCheck,
    t: "Neutral statement label",
    c: "Billing appears under our registered trading name, not a product category.",
  },
  {
    Icon: Mail,
    t: "Correspondence on request",
    c: "Order updates are only sent to the address you provide at checkout.",
  },
];

const FAQS = [
  {
    q: "Do I need an account to browse?",
    a: "No. Every collection, department page and product detail is open to browse once age verification is complete. An account is only useful for saving a wishlist between visits.",
  },
  {
    q: "How is packaging handled?",
    a: "Orders are dispatched in plain, unbranded cartons with no product names on the outer label. Inside, each piece sits in its own retail presentation box.",
  },
  {
    q: "What are the returns terms?",
    a: "For hygiene reasons, opened intimate apparel and body-contact items cannot be returned. Unopened, faulty or incorrect items can be exchanged — contact customer care with your order reference.",
  },
  {
    q: "Are the prices on this page real?",
    a: "No. This is a design prototype: the ten products, houses and prices shown are illustrative samples used to demonstrate the storefront experience.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div id="faq" className="border border-cream/10 bg-ash/40 p-6 sm:p-8">
      <p className="eyebrow text-[9.5px] text-gold">Customer care · FAQs</p>
      <ul className="mt-5 divide-y divide-cream/[0.08] border-y border-cream/[0.08]">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-5 py-4 text-left"
              >
                <span
                  className={cn(
                    "font-display text-[16.5px] leading-snug transition-colors duration-300 sm:text-[18px]",
                    isOpen ? "text-gold-2" : "text-cream hover:text-gold-2",
                  )}
                >
                  {f.q}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "mt-1 shrink-0 text-mist transition-transform duration-400",
                    isOpen && "rotate-180 text-gold",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-500 ease-out",
                  isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0">
                  <p className="max-w-[62ch] text-[13.5px] leading-relaxed text-mist">{f.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a
          href="#"
          className="group flex items-center gap-2.5 font-cond text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:text-gold-2"
        >
          <Phone size={14} className="text-crimson" />
          Talk to a specialist
          <span className="h-px w-5 bg-gold/45 transition-all duration-300 group-hover:w-9" />
        </a>
        <a
          href="#"
          className="group flex items-center gap-2.5 font-cond text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:text-gold-2"
        >
          <MessageCircle size={14} className="text-crimson" />
          Email customer care
          <span className="h-px w-5 bg-gold/45 transition-all duration-300 group-hover:w-9" />
        </a>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink-2">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(74,13,28,0.5),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        {/* brand + columns */}
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-[42ch] text-[13.5px] leading-relaxed text-mist">
              Adult Central Superstore is an adults-only retail destination for intimate essentials,
              lingerie, wellness products and lifestyle accessories — organised by department, presented
              without the gimmick, and shipped discreetly.
            </p>
            <div className="mt-7 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={`Adult Central Superstore on ${s.label} (placeholder link)`}
                  title={`${s.label} — placeholder link`}
                  className="group grid size-10 place-items-center border border-cream/12 text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/55 hover:text-gold-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className="size-[17px] transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  >
                    {s.path}
                  </svg>
                </a>
              ))}
              <span className="ml-2 border border-crimson/50 px-2.5 py-1 font-cond text-[9.5px] font-semibold uppercase tracking-[0.2em] text-crimson">
                18+ only
              </span>
            </div>
            <p className="mt-6 flex items-start gap-2.5 text-[12px] leading-relaxed text-mist-2">
              <MapPin size={13} className="mt-0.5 shrink-0 text-mist" />
              Unmarked packaging on every order · Customer care 7 days a week
            </p>
          </Reveal>

          {COLUMNS.map((col, ci) => (
            <Reveal key={col.title} delay={80 + ci * 70} className="lg:col-span-2 xl:col-span-2">
              <p className="font-cond text-[10.5px] font-semibold uppercase tracking-[0.28em] text-cream">
                {col.title}
              </p>
              <span className="mt-3 block h-px w-8 bg-crimson" />
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors hover:text-cream"
                    >
                      <span className="h-1 w-1 rotate-45 bg-smoke transition-colors duration-300 group-hover:bg-gold" />
                      {label}
                      {href === "#" && (
                        <span className="font-cond text-[8.5px] uppercase tracking-[0.14em] text-mist-2/70">
                          placeholder
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={280} className="lg:col-span-2">
            <p className="font-cond text-[10.5px] font-semibold uppercase tracking-[0.28em] text-cream">
              The Weekly Note
            </p>
            <span className="mt-3 block h-px w-8 bg-gold" />
            <p className="mt-5 text-[13px] leading-relaxed text-mist">
              New arrivals, restocks and department highlights, once a week.
            </p>
            <a
              href="#newsletter"
              className="mt-5 inline-flex items-center gap-2 border border-gold/40 px-4 py-2.5 font-cond text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Newsletter access
            </a>
          </Reveal>
        </div>

        {/* discreet + faq */}
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div id="discreet" className="h-full border border-cream/10 bg-gradient-to-br from-burgundy-2/70 to-ash/50 p-6 sm:p-8">
              <p className="eyebrow text-[9.5px] text-gold">Discreet shopping</p>
              <h3 className="mt-4 font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight text-cream">
                Private from the first click.
              </h3>
              <ul className="mt-6 space-y-5">
                {DISCREET.map(({ Icon, t, c }) => (
                  <li key={t} className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 text-gold">
                      <Icon size={19} strokeWidth={1.4} />
                    </span>
                    <span>
                      <span className="block font-cond text-[12px] font-semibold uppercase tracking-[0.18em] text-cream">
                        {t}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-relaxed text-mist">{c}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={110} className="lg:col-span-7">
            <Faq />
          </Reveal>
        </div>
      </div>

      {/* oversized wordmark band */}
      <div className="group relative mt-16 overflow-hidden border-y border-cream/[0.07] py-5">
        <div className="anim-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="wordmark whitespace-nowrap text-[clamp(2rem,6vw,4.6rem)] text-cream/[0.07]">
                Adult Central Superstore
              </span>
              <span className="size-2 rotate-45 bg-crimson/40" />
              <span className="wordmark whitespace-nowrap text-[clamp(2rem,6vw,4.6rem)] text-gold/[0.13]">
                Curated · Discreet · Adults only
              </span>
              <span className="size-2 rotate-45 bg-gold/40" />
            </span>
          ))}
        </div>
      </div>

      {/* legal bar */}
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-7 text-[11.5px] text-mist-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>
          © {new Date().getFullYear()} Adult Central Superstore. All rights reserved. Adult Central
          Superstore is a trademarked brand name of this business.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="border border-cream/12 px-2.5 py-1 font-cond text-[9.5px] uppercase tracking-[0.18em] text-mist">
            Design prototype · prices illustrative
          </span>
          <a href="#" className="transition-colors hover:text-gold-2">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-gold-2">
            Terms
          </a>
          <a href="#top" className="transition-colors hover:text-gold-2">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

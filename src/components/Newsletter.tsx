import { useState } from "react";
import { ArrowRight, BellRing, Check, Mail } from "lucide-react";
import { Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";

const PREFS = ["New arrivals", "Restock notes", "Department guides", "Event invitations"];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState<string[]>(["New arrivals"]);
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!ok) {
      setState("error");
      return;
    }
    setState("done");
  };

  return (
    <section id="newsletter" className="relative bg-ink px-5 py-16 sm:px-6 lg:px-10 lg:py-20">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="grain relative overflow-hidden border border-cream/12 bg-[linear-gradient(120deg,var(--color-burgundy-2)_0%,var(--color-ash)_46%,var(--color-ink)_100%)]">
          <div className="pointer-events-none absolute -right-16 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,162,74,0.2),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-cream/10 lg:block" />

          <div className="relative grid grid-cols-1 items-center gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div>
              <p className="eyebrow flex items-center gap-3 text-[10px] text-gold">
                <BellRing size={13} className="text-crimson" />
                <span className="h-px w-8 bg-gold/40" /> Newsletter
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.03] text-cream">
                Stay in the <span className="italic text-gold-2">know.</span>
              </h2>
              <p className="mt-4 max-w-[44ch] text-[14.5px] leading-relaxed text-mist">
                Discover new arrivals, featured collections, and the latest from Adult Central Superstore.
                One considered note per week — no follow-up barrage.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {PREFS.map((p) => {
                  const on = picked.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPicked((prev) => (on ? prev.filter((x) => x !== p) : [...prev, p]))}
                      className={cn(
                        "flex items-center gap-2 border px-3.5 py-2 font-cond text-[10.5px] uppercase tracking-[0.18em] transition-all duration-300",
                        on
                          ? "border-gold/60 bg-gold/12 text-gold-2"
                          : "border-cream/12 text-mist-2 hover:border-cream/35 hover:text-cream",
                      )}
                      aria-pressed={on}
                    >
                      <span
                        className={cn(
                          "grid size-3.5 place-items-center border transition-colors",
                          on ? "border-gold bg-gold text-ink" : "border-cream/25",
                        )}
                      >
                        {on && <Check size={9} strokeWidth={3} />}
                      </span>
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              {state === "done" ? (
                <div className="anim-scale border border-gold/35 bg-ink/50 p-8 text-center">
                  <span className="mx-auto grid size-12 place-items-center bg-gold text-ink">
                    <Check size={22} strokeWidth={2.4} />
                  </span>
                  <p className="mt-5 font-display text-[24px] text-cream">You're on the list</p>
                  <p className="mx-auto mt-2.5 max-w-[38ch] text-[13.5px] leading-relaxed text-mist">
                    <span className="text-gold-2">{email}</span> is signed up for{" "}
                    {picked.length ? picked.join(", ").toLowerCase() : "the weekly note"}. This is a
                    frontend demonstration — nothing was transmitted.
                  </p>
                  <button
                    onClick={() => {
                      setState("idle");
                      setEmail("");
                    }}
                    className="mt-6 font-cond text-[10.5px] uppercase tracking-[0.22em] text-mist transition-colors hover:text-gold-2"
                  >
                    Use a different address
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <label
                    htmlFor="nl-email"
                    className="font-cond text-[10px] uppercase tracking-[0.26em] text-mist-2"
                  >
                    Email address
                  </label>
                  <div
                    className={cn(
                      "mt-3 flex items-center gap-3 border bg-ink/60 px-4 transition-colors duration-300",
                      state === "error" ? "border-crimson" : "border-cream/15 focus-within:border-gold/60",
                    )}
                  >
                    <Mail size={16} className="shrink-0 text-mist" strokeWidth={1.6} />
                    <input
                      id="nl-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="you@example.com"
                      className="min-w-0 flex-1 bg-transparent py-4 text-[15px] text-cream outline-none placeholder:text-mist-2/70"
                    />
                  </div>
                  {state === "error" && (
                    <p className="anim-fadeup mt-2.5 text-[12px] text-crimson">
                      Please enter a valid email address to continue.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="sheen group relative mt-4 flex w-full items-center justify-center gap-2.5 bg-cream px-6 py-4 font-cond text-[12px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-gold active:scale-[0.99]"
                  >
                    <span className="sheen-bar" />
                    <span className="relative z-10 flex items-center gap-2.5">
                      Subscribe
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                  <p className="mt-3.5 text-[11px] leading-relaxed text-mist-2">
                    By subscribing you confirm you are 18 or over. Signup is a visual demonstration only —
                    no address is stored, sent or shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { useEffect, useState } from "react";
import { ArrowUp, ShoppingBag } from "lucide-react";
import AgeGate from "@/components/AgeGate";
import BrandStory from "@/components/BrandStory";
import Benefits from "@/components/Benefits";
import CategoryMosaic from "@/components/CategoryMosaic";
import { CartDrawer, WishlistDrawer } from "@/components/Drawers";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import PromoBanner from "@/components/PromoBanner";
import QuickView from "@/components/QuickView";
import SearchOverlay from "@/components/SearchOverlay";
import Ticker from "@/components/Ticker";
import Toasts from "@/components/Toasts";
import { StoreProvider, useStore } from "@/store/store";
import { cn } from "@/utils/cn";

/** floating bag + back-to-top, appears past the hero */
function FloatBar() {
  const { cartCount, subtotal, open } = useStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-[120] flex items-center gap-2 transition-all duration-500 lg:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <button
        onClick={() => open({ kind: "cart" })}
        className="flex items-center gap-2.5 border border-gold/40 bg-ink/92 px-3.5 py-3 shadow-luxe backdrop-blur-md"
      >
        <ShoppingBag size={15} className="text-gold" strokeWidth={1.7} />
        <span className="num text-[12px] text-cream">${Math.round(subtotal)}</span>
        <span className="num grid size-5 place-items-center bg-crimson text-[10px] font-bold text-cream">
          {cartCount}
        </span>
      </button>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="grid size-11 place-items-center border border-cream/15 bg-ink/92 text-cream backdrop-blur-md"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <div className="relative min-h-screen bg-ink">
        <AgeGate />
        <Header />
        <main>
          <Hero />
          <Ticker />
          <CategoryMosaic />
          <FeaturedProducts />
          <PromoBanner />
          <Benefits />
          <BrandStory />
          <Newsletter />
        </main>
        <Footer />

        {/* overlays */}
        <SearchOverlay />
        <QuickView />
        <CartDrawer />
        <WishlistDrawer />
        <Toasts />
        <FloatBar />
      </div>
    </StoreProvider>
  );
}

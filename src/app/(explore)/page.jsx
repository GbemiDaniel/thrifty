import HeroSection from "@/components/sections/HeroSection/HeroSection";
import HotDeals from "@/components/sections/HotDeals/HotDeals";
import PromoBanner from "@/components/sections/PromoBanner/PromoBanner";
import Collections from "@/components/sections/Collections/Collections";
import TrendingSearches from "@/components/sections/TrendingSearches";
import Navbar from "@/components/shared/Navbar/Navbar";
import Newsletter from "@/components/sections/Newsletter/Newsletter";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-24">
      <Navbar />
      <HeroSection />
      <HotDeals />
      <PromoBanner />
      <Collections />
      <TrendingSearches />
      <Newsletter />
    </div>
  );
}
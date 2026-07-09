import HeroSection from "@/components/sections/HeroSection/HeroSection";
import HotDeals from "@/components/sections/HotDeals/HotDeals";
import PromoBanner from "@/components/sections/PromoBanner/PromoBanner";
import Collections from "@/components/sections/Collections/Collections";
import TrendingSearches from "@/components/sections/TrendingSearches";
import Navbar from "@/components/shared/Navbar/Navbar";
import Newsletter from "@/components/sections/Newsletter/Newsletter";

// ✅ Corrected Supabase SSR import
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { mapSupabaseToUIProduct } from '@/utils/data-adapters';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const cookieStore = await cookies();

  // ✅ Corrected initialization
  const supabase = createClient(cookieStore);

  // Helper to fetch 6 latest published products per category
  const fetchHotDealsCategory = async (category) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'Published')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error(`Error fetching ${category} hot deals:`, error);
      return [];
    }

    return data.map(mapSupabaseToUIProduct);
  };

  // Run queries concurrently so they don't block each other
  const [men, women, accessories] = await Promise.all([
    fetchHotDealsCategory('men'),
    fetchHotDealsCategory('women'),
    fetchHotDealsCategory('accessories'),
  ]);

  const liveHotDealsData = { men, women, accessories };

  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-24">
      <Navbar />
      <HeroSection />
      {/* Pass the live data object down to the client component */}
      <HotDeals initialData={liveHotDealsData} />
      <PromoBanner />
      <Collections />
      <TrendingSearches />
      <Newsletter />
    </div>
  );
}
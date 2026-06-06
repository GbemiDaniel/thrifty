import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/motion-wrappers";

const trendingSearches = [
    { title: 'ANKARA', image: '/images/trending/ankara.png' },
    { title: 'SUITS', image: '/images/trending/suits.png' },
    { title: 'BRIEFCASE', image: '/images/trending/briefcase.png' },
    { title: 'ITALIAN SHOES', image: '/images/trending/italian-shoes.png' },
    { title: 'BOWLER HATS', image: '/images/trending/bowler-hats.png' },
    { title: 'CANES', image: '/images/trending/canes.png' },
    { title: 'VINTAGE', image: '/images/trending/vinatage.png' },
    { title: 'ITALIAN SLIPPERS', image: '/images/trending/italian-slippers.png' }
];

export default function TrendingSearches() {
    return (
        <section className="w-full px-sm md:px-md py-lg md:py-section flex flex-col items-center">
            
            {/* Header Area */}
            <ScrollReveal>
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-h2 font-bold mb-2 text-foreground">Trending Searches</h2>
                    <p className="text-sm text-foreground/70">View our most viral searches</p>
                </div>
            </ScrollReveal>

            {/* Grid Architecture */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
                {trendingSearches.map((item, index) => (
                    <ScrollReveal key={item.title} delay={index * 0.1}>
                        <Link href={`/search?q=${item.title.toLowerCase()}`} className="relative block w-full aspect-square rounded-xl overflow-hidden group">
                            <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill 
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <span className="text-white font-bold text-sm md:text-base lg:text-lg text-center tracking-wider uppercase">
                                    {item.title}
                                </span>
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>

            {/* Global Action */}
            <ScrollReveal delay={0.5}>
                <Link href="/search" className="inline-block text-center bg-foreground text-background px-12 py-3.5 text-sm font-medium hover:opacity-80 transition-opacity">
                    View All
                </Link>
            </ScrollReveal>

        </section>
    );
}

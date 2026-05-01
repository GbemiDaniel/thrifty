import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/motion-wrappers";

export default function Collections() {
    return (
        <section className="w-full px-sm md:px-md py-lg md:py-section flex flex-col items-center">

            {/* Header Area */}
            <ScrollReveal>
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-h2 font-bold mb-2 text-foreground">Our Collections</h2>
                    <p className="text-sm text-foreground/70">Explore your style and find your true self!</p>
                </div>
            </ScrollReveal>

            {/* The Grid Architecture
                Mobile: 1 column, standard DOM order.
                Desktop: 2 columns, manipulating the order of the bottom row.
            */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">

                {/* Node 1: Women's Image (Top Left on Desktop, Top on Mobile) */}
                <ScrollReveal delay={0.1} className="h-full w-full block order-1">
                    <div className="relative w-full aspect-4/5 md:aspect-5/4 overflow-hidden group">
                        <Image
                            src="/images/collection-woman.jpg"
                            alt="Women's Collection"
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </ScrollReveal>

                {/* Node 2: Gray Text Block (Top Right on Desktop, 2nd on Mobile) */}
                <ScrollReveal delay={0.2} className="h-full w-full block order-2">
                    <div className="w-full aspect-4/5 md:aspect-5/4 bg-border flex flex-col items-start justify-center p-8 sm:p-12 md:p-16">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight leading-tight mb-6 md:mb-8">
                            Built by the street,<br />Made for you
                        </h3>
                        {/* Upgraded CTA: Contextual text + sliding arrow */}
                        <Link
                            href="/women"
                            className="group border border-foreground text-foreground px-6 py-3 text-sm hover:bg-foreground hover:text-background transition-all duration-300 flex items-center gap-2"
                        >
                            Explore Women's <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </ScrollReveal>

                {/* Node 3: Men's Image (Bottom Right on Desktop, 3rd on Mobile) */}
                <ScrollReveal delay={0.3} className="h-full w-full block order-3 md:order-4">
                    <div className="relative w-full aspect-4/5 md:aspect-5/4 overflow-hidden group">
                        <Image
                            src="/images/collection-man.jpg"
                            alt="Men's Collection"
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </ScrollReveal>

                {/* Node 4: Black Text Block (Bottom Left on Desktop, 4th on Mobile) */}
                <ScrollReveal delay={0.4} className="h-full w-full block order-4 md:order-3">
                    <div className="w-full aspect-4/5 md:aspect-5/4 bg-foreground flex flex-col items-start justify-center p-8 sm:p-12 md:p-16">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-background tracking-tight leading-tight mb-6 md:mb-8">
                            Elevate your style<br />Effortlessly
                        </h3>
                        {/* Upgraded CTA: Contextual text + sliding arrow */}
                        <Link
                            href="/men"
                            className="group border border-background text-background px-6 py-3 text-sm hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2"
                        >
                            Shop Men's <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </ScrollReveal>

            </div>

            {/* Global Action */}
            <ScrollReveal delay={0.5}>
                <Link href="#" className="inline-block text-center bg-foreground text-background px-12 py-3.5 text-sm font-medium hover:opacity-80 transition-opacity">
                    View All Collections
                </Link>
            </ScrollReveal>

        </section>
    );
}
import Image from "next/image";
import Link from "next/link";

export default function Collections() {
    return (
        <section className="w-full px-sm md:px-md py-lg md:py-section flex flex-col items-center">

            {/* Header Area */}
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-h2 font-bold mb-2 text-foreground">Our Collections</h2>
                <p className="text-sm text-foreground/70">Explore your style and find your true self!</p>
            </div>

            {/* The Grid Architecture
        Mobile: 1 column, standard DOM order.
        Desktop: 2 columns, manipulating the order of the bottom row.
      */}
            <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">

                {/* Node 1: Women's Image (Top Left on Desktop, Top on Mobile) */}
                <div className="relative w-full aspect-[4/5] md:aspect-[5/4] overflow-hidden group order-1">
                    <Image
                        src="/images/collection-woman.jpg"
                        alt="Women's Collection"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Node 2: Gray Text Block (Top Right on Desktop, 2nd on Mobile) */}
                <div className="w-full aspect-[4/5] md:aspect-[5/4] bg-[#e2e2e2] flex flex-col items-start justify-center p-8 sm:p-12 md:p-16 order-2">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black leading-tight mb-6 md:mb-8">
                        Built by the street,<br />Made for you
                    </h3>
                    <Link
                        href="/collections/street"
                        className="border border-black text-black px-6 py-2.5 text-sm hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                        See More <span>→</span>
                    </Link>
                </div>

                {/* Node 3: Men's Image (Bottom Right on Desktop, 3rd on Mobile) */}
                {/* We use md:order-4 to force this to the end of the desktop grid */}
                <div className="relative w-full aspect-[4/5] md:aspect-[5/4] overflow-hidden group order-3 md:order-4">
                    <Image
                        src="/images/collection-man.jpg"
                        alt="Men's Collection"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Node 4: Black Text Block (Bottom Left on Desktop, 4th on Mobile) */}
                {/* We use md:order-3 to pull this ahead of the second image on desktop */}
                <div className="w-full aspect-[4/5] md:aspect-[5/4] bg-black flex flex-col items-start justify-center p-8 sm:p-12 md:p-16 order-4 md:order-3">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6 md:mb-8">
                        Elevate your style<br />Effortlessly
                    </h3>
                    <Link
                        href="/collections/elevate"
                        className="border border-white text-white px-6 py-2.5 text-sm hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2"
                    >
                        See More <span>→</span>
                    </Link>
                </div>

            </div>

            {/* Global Action */}
            <button className="bg-foreground text-background px-12 py-3.5 text-sm font-medium hover:opacity-80 transition-opacity">
                View All
            </button>

        </section>
    );
}
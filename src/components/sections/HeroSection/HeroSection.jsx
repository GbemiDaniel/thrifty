import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
    // MOBILE FIRST: 75vh on mobile, expands to 85vh on desktop
    return (
        <section className="relative w-full h-[75vh] min-h-[500px] md:h-[85vh] md:min-h-[600px] bg-card">

            <div className={styles.imageOverlay}>
                <Image
                    src="/images/hero-image.jpg"
                    alt="Sweatshirt collection on hangers"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100} /* Forces Next.js to render this at max fidelity */
                    sizes="100vw"
                />
            </div>

            {/* MOBILE FIRST: Tighter padding on mobile (bottom-6 left-4), wider on desktop */}
            <div className="absolute bottom-6 left-4 md:bottom-12 md:left-12 z-10 text-white">

                <h2 className="text-sm md:text-p font-medium mb-1 tracking-wide">
                    New <span className="font-bold">Sweatshirt Collection</span>
                </h2>

                <a href="#collection" className="text-xs text-white/90 border-b border-white/40 pb-[2px] hover:text-white hover:border-white transition-all flex items-center w-max gap-1.5 mt-2">
                    Learn More <span className="text-[10px]">→</span>
                </a>
            </div>

        </section>
    );
}
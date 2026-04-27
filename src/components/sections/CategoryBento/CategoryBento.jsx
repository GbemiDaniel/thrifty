import Image from "next/image";
import Link from "next/link";
import styles from "./CategoryBento.module.css";

// Reusable micro-component for the individual bento boxes
const BentoItem = ({ href, image, title, subtitle, className }) => (
    <Link href={href} className={`group ${styles.bentoCard} ${className}`}>
        <div className={styles.imageWrapper}>
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-center"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
        <div className={styles.content}>
            <p className="text-xs font-medium uppercase tracking-wider mb-1 opacity-80">{subtitle}</p>
            <h3 className="text-h2 font-bold leading-none mb-2">{title}</h3>
            <span className="text-sm font-medium border-b border-white/40 pb-0.5 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now →
            </span>
        </div>
    </Link>
);

export default function CategoryBento() {
    return (
        <section className="w-full px-sm md:px-md py-lg md:py-section">

            {/* MACRO: The Grid Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">

                {/* Block A: Men - Spans left half entirely on desktop */}
                <BentoItem
                    href="/men"
                    image="/images/product-1.jpg"
                    title="Men's"
                    subtitle="The Classics"
                    className="md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0"
                />

                {/* Block B: Women - Top middle quadrant */}
                <BentoItem
                    href="/women"
                    image="/images/product-2.jpg"
                    title="Women's"
                    subtitle="New Arrivals"
                    className="md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0"
                />

                {/* Block C: Accessories - Top right quadrant */}
                <BentoItem
                    href="/accessories"
                    image="/images/product-3.jpg"
                    title="Accessories"
                    subtitle="Finishing Touches"
                    className="md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0"
                />

                {/* Block D: Collections - Bottom right spanning two columns */}
                <BentoItem
                    href="/collections"
                    image="/images/product-4.jpg"
                    title="The Winter Collection"
                    subtitle="Curated Styles"
                    className="md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-0"
                />

            </div>
        </section>
    );
}
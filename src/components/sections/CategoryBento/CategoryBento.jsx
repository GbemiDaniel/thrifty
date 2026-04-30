import Image from "next/image";
import Link from "next/link";
import styles from "./CategoryBento.module.css";
import { ScrollReveal } from "@/components/ui/motion-wrappers";

// Reusable micro-component for the individual bento boxes
const BentoItem = ({ href, image, title, subtitle, className }) => (
    // 1. Added h-full w-full block to ensure the link stretches to fill the motion.div
    <Link href={href} className={`group block h-full w-full ${styles.bentoCard} ${className}`}>
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
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:aspect-2/1 lg:aspect-21/9">

                {/* Block A: Men */}
                {/* 2. Added h-full w-full to the ScrollReveal className so the observer box spans the grid cell */}
                <ScrollReveal delay={0.1} className="md:col-span-2 md:row-span-2 h-full w-full">
                    <BentoItem
                        href="/men"
                        image="/images/product-1.jpg"
                        title="Men's"
                        subtitle="The Classics"
                        className="min-h-80 md:min-h-0"
                    />
                </ScrollReveal>

                {/* Block B: Women */}
                <ScrollReveal delay={0.2} className="md:col-span-1 md:row-span-1 h-full w-full">
                    <BentoItem
                        href="/women"
                        image="/images/product-2.jpg"
                        title="Women's"
                        subtitle="New Arrivals"
                        className="min-h-64 md:min-h-0"
                    />
                </ScrollReveal>

                {/* Block C: Accessories */}
                <ScrollReveal delay={0.3} className="md:col-span-1 md:row-span-1 h-full w-full">
                    <BentoItem
                        href="/accessories"
                        image="/images/product-3.jpg"
                        title="Accessories"
                        subtitle="Finishing Touches"
                        className="min-h-64 md:min-h-0"
                    />
                </ScrollReveal>

                {/* Block D: Collections */}
                <ScrollReveal delay={0.4} className="md:col-span-2 md:row-span-1 h-full w-full">
                    <BentoItem
                        href="/collections"
                        image="/images/product-4.jpg"
                        title="The Winter Collection"
                        subtitle="Curated Styles"
                        className="min-h-64 md:min-h-0"
                    />
                </ScrollReveal>

            </div>
        </section>
    );
}
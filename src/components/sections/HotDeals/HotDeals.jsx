"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { ScrollReveal, StaggerContainer, FadeUp } from "@/components/ui/motion-wrappers";
import { hotDealsData } from "@/lib/constants";
import Link from "next/link";

export default function HotDeals() {
    const [activeTab, setActiveTab] = useState("men");

    const tabs = [
        { id: "men", label: "Men's" },
        { id: "women", label: "Women's" },
        { id: "accessories", label: "Accessories" }
    ];

    const currentProducts = hotDealsData[activeTab] || [];

    return (
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-16 md:py-24 flex flex-col items-center overflow-hidden">

            {/* Header */}
            <ScrollReveal>
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Hot Deals</h2>
                    <p className="text-sm md:text-base text-foreground/70">Get the best deals on sale!</p>
                </div>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal delay={0.1}>
                <div className="flex items-center justify-center gap-6 md:gap-10 mb-10 w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-2 text-sm md:text-base font-medium transition-colors ${activeTab === tab.id
                                    ? "text-foreground"
                                    : "text-foreground/50 hover:text-foreground/80"
                                }`}
                        >
                            {tab.label}

                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transition-all duration-300" />
                            )}
                        </button>
                    ))}
                </div>
            </ScrollReveal>

            {/* 
                THE FIX: 
                1. AnimatePresence crossfades the DOM nodes to prevent layout thrashing.
                2. StaggerContainer uses ONE observer for the whole grid.
                3. FadeUp animates the individual cards without extra observers.
            */}
            <AnimatePresence mode="wait">
                <StaggerContainer
                    key={activeTab}
                    className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-12"
                >
                    {currentProducts.map((product) => (
                        <FadeUp key={product.id} className="h-full w-full">
                            <ProductCard {...product} />
                        </FadeUp>
                    ))}
                </StaggerContainer>
            </AnimatePresence>

            {/* Action Button */}
            <ScrollReveal delay={0.3} className="w-full mt-10 md:mt-14 flex justify-center">
                <Link href={`/${activeTab}`} className="w-full md:w-64 bg-foreground text-background py-4 text-sm font-medium hover:opacity-80 transition-opacity tracking-wide text-center block">
                    View All
                </Link>
            </ScrollReveal>

        </section>
    );
}
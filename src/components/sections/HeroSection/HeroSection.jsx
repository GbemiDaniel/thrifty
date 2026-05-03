"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { heroSlides } from "@/lib/constants";

export default function HeroSection() {
    const plugin = React.useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: true, // Native UX: If a user touches it, respect their intent and pause.
            stopOnMouseEnter: true
        })
    );

    const [api, setApi] = React.useState();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="relative w-full bg-background px-4 md:px-0 pt-20 md:pt-0 shrink-0 overflow-hidden">
            <Carousel
                opts={{ loop: true, align: "start" }}
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full h-[65vh] md:h-screen min-h-[450px] md:min-h-[500px] max-h-[850px] [&>div:first-child]:h-full"
            >
                <CarouselContent className="h-full ml-0">
                    {heroSlides.map((slide, index) => {
                        const isFirst = index === 0;

                        return (
                            // select-none stops text highlighting during drag
                            <CarouselItem key={slide.id} className="relative h-full w-full pl-0 select-none">

                                {/* 
                                    THE FIX: ONE single optimized image layer. 
                                    No more double-mounting for desktop/mobile.
                                */}
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        draggable={false}
                                        className="object-cover object-center bg-muted" // Added bg-muted as a skeleton loader color
                                        priority={isFirst}
                                        // 1. The Performance/Quality Sweet Spot
                                        quality={85}
                                        // 2. Standard full-width sizing. Next.js will automatically generate 1x, 2x, and 3x retina sizes based on this.
                                        sizes="100vw"
                                    />
                                </div>

                                {/* ==============================================
                                    A. MOBILE OVERLAY (<md)
                                    ============================================== */}
                                <div className="absolute inset-0 flex md:hidden flex-col justify-end p-5 pb-16 z-20">
                                    {/* Fixed Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent -z-10" />

                                    <h1 className="text-sm sm:text-base font-medium tracking-wide mb-1.5 whitespace-nowrap text-white">
                                        {slide.title}
                                    </h1>
                                    <Link
                                        href={slide.href}
                                        draggable={false}
                                        className="group w-max flex items-center gap-2 text-[11px] font-medium text-white/90 hover:text-white transition-colors"
                                    >
                                        <span className="relative pb-0.5 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                                            {slide.cta}
                                        </span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>

                                {/* ==============================================
                                    B. DESKTOP OVERLAY (>=md)
                                    ============================================== */}
                                <div className="absolute inset-0 hidden md:flex flex-col z-20">
                                    {/* Fixed Gradients */}
                                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent -z-10" />
                                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/70 to-transparent -z-10" />

                                    <div className="absolute bottom-16 left-0 w-full text-white">
                                        <div className="max-w-[1440px] mx-auto px-12">
                                            <h1 className="text-lg lg:text-xl font-medium tracking-wide mb-3 whitespace-nowrap">
                                                {slide.title}
                                            </h1>
                                            <Link
                                                href={slide.href}
                                                draggable={false}
                                                className="group w-max flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                                            >
                                                <span className="relative pb-0.5 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                                                    {slide.cta}
                                                </span>
                                                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* Mobile Pagination: 3-Dot Track Logic */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] flex md:hidden items-center justify-center gap-1.5">
                    {[0, 1, 2].map((dotIndex) => {
                        const isActive =
                            (dotIndex === 0 && current === 0) ||
                            (dotIndex === 1 && current >= 1 && current <= 3) ||
                            (dotIndex === 2 && current === 4);

                        const scrollToIndex = dotIndex === 0 ? 0 : dotIndex === 1 ? 2 : 4;

                        return (
                            <button
                                key={dotIndex}
                                onClick={() => api?.scrollTo(scrollToIndex)}
                                className={isActive
                                    ? "w-2 h-2 bg-white rounded-full"
                                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-all duration-300"
                                }
                                aria-label={`Go to section ${dotIndex + 1}`}
                            />
                        );
                    })}
                </div>
            </Carousel>
        </section>
    );
}
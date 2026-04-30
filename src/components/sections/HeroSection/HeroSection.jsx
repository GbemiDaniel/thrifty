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
            stopOnInteraction: false,
            stopOnMouseEnter: false
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
                className="w-full h-[65vh] md:h-[100vh] min-h-[450px] md:min-h-[500px] max-h-[850px] [&>div:first-child]:h-full"
            >
                <CarouselContent className="h-full ml-0">
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={slide.id} className="relative h-full w-full pl-0">

                            {/* ==============================================
                                A. MOBILE WRAPPER (<md)
                                ============================================== */}
                            <div className="block md:hidden relative w-full h-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover object-center"
                                    priority={index === 0}
                                    sizes="100vw"
                                />

                                {/* Swiping Ghost Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                                <div className="absolute inset-0 flex flex-col justify-end p-5 pb-16 z-20 text-white pointer-events-none">
                                    <h1 className="text-sm sm:text-base font-medium tracking-wide mb-1.5 whitespace-nowrap">
                                        {slide.title}
                                    </h1>
                                    <Link href={slide.href} className="group w-max flex items-center gap-2 text-[11px] font-medium text-white/90 hover:text-white transition-colors pointer-events-auto">
                                        <span className="relative pb-0.5 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                                            {slide.cta}
                                        </span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* ==============================================
                                B. DESKTOP WRAPPER (>=md)
                                ============================================== */}
                            <div className="hidden md:block relative w-full h-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover object-center"
                                    priority={index === 0}
                                    sizes="100vw"
                                />

                                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />

                                <div className="absolute bottom-16 left-12 lg:left-24 z-20 text-white pointer-events-none">
                                    <h1 className="text-lg lg:text-xl font-medium tracking-wide mb-3 whitespace-nowrap">
                                        {slide.title}
                                    </h1>

                                    <Link href={slide.href} className="group w-max flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors pointer-events-auto">
                                        <span className="relative pb-0.5 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                                            {slide.cta}
                                        </span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>

                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Mobile Pagination: 3-Dot Track Logic */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] flex md:hidden items-center justify-center gap-1.5 pointer-events-none">
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
                                    ? "w-2 h-2 bg-white rounded-full pointer-events-auto"
                                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-all duration-300 pointer-events-auto"
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
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/motion-wrappers";

export default function PromoBanner() {
    return (
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-12 md:py-24 flex justify-center">

            <div className="relative w-full min-h-[350px] md:min-h-[400px] lg:min-h-[450px] bg-muted rounded-none md:rounded-sm overflow-hidden flex items-center">

                {/* =========================================
                    LEFT SIDE: Typography
                    ========================================= */}
                <div className="relative z-20 w-full md:w-1/2 flex flex-col justify-center pl-6 sm:pl-12 md:pl-16 py-12 pointer-events-none">

                    {/* Desktop Text Layout */}
                    <div className="hidden md:flex flex-col text-foreground">
                        <ScrollReveal delay={0}>
                            <div className="flex items-baseline gap-3">
                                <span className="text-6xl lg:text-7xl font-normal tracking-tight leading-none">20%</span>
                                <span className="text-3xl lg:text-4xl font-light leading-none">Off</span>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <span className="block text-3xl lg:text-4xl font-light mt-2">Winter sale!</span>
                        </ScrollReveal>
                    </div>

                    {/* Mobile Text Layout */}
                    <div className="flex md:hidden flex-col text-foreground">
                        <ScrollReveal delay={0}>
                            <span className="block text-6xl font-normal tracking-tight leading-none mb-1">20%</span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <span className="block text-3xl font-light leading-tight">Off Winter</span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <span className="block text-3xl font-light leading-tight">sale!</span>
                        </ScrollReveal>
                    </div>

                </div>

                {/* =========================================
                    RIGHT SIDE: Image & Seamless Fade
                    ========================================= */}
                <div className="absolute inset-y-0 right-0 w-[85%] sm:w-[75%] md:w-[60%] h-full z-0">

                    {/* 
                        Responsive Gradient Mask: 
                        - Mobile: Gradual fade (to-100%) to smoothly mask the image edge under the text.
                        - Desktop: Tight fade (to-60%) to preserve image quality on the right side.
                    */}
                    <div className="absolute inset-0 bg-linear-to-r from-muted from-0% via-muted/80 via-50% to-transparent to-100% md:via-muted/50 md:via-25% md:to-60% z-10" />

                    <Image
                        src="/images/banner image.jpg"
                        alt="Winter Sale"
                        fill
                        className="object-cover object-center md:object-right mix-blend-multiply"
                        sizes="(max-width: 768px) 85vw, 60vw"
                        quality={100}
                        priority
                    />
                </div>

            </div>
        </section>
    );
}
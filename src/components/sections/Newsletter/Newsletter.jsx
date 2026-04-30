"use client";
import { ScrollReveal } from "@/components/ui/motion-wrappers";

export default function Newsletter() {
    return (
        // 1. The outer section strictly respects your global layout variables
        <section className="w-full px-sm md:px-md py-lg md:py-section">

            {/* 2. The inner block is now a massive contained card matching the grid width */}
            <div className="w-full max-w-7xl mx-auto bg-foreground text-background py-20 px-6 md:px-12 lg:py-32 flex flex-col items-center text-center">

                <ScrollReveal delay={0} className="w-full">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-background/50 mb-6">
                        Stay in the loop
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.1} className="w-full">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-background mb-4">
                        Drops before<br />anyone else.
                    </h2>
                </ScrollReveal>

                {/* 3. Text width constraints are strictly on the wrapper, preventing conflicts */}
                <ScrollReveal delay={0.2} className="w-full mx-auto mb-12">
                    <p className="text-sm md:text-base font-light text-background/60">
                        New arrivals, exclusive deals, and members-only access — delivered straight to your inbox.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3} className="w-full max-w-xl mx-auto">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="w-full flex flex-col sm:flex-row items-stretch gap-0 border border-background/30"
                    >
                        <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="flex-1 min-w-0 bg-transparent px-5 py-4 text-sm text-background placeholder:text-background/30 outline-none border-none focus:ring-0 font-medium"
                        />
                        <div className="hidden sm:block w-px bg-background/30 self-stretch" />
                        <button
                            type="submit"
                            className="bg-background text-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-background/90 transition-colors duration-200 shrink-0 cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </form>

                    <p className="text-xs text-background/30 mt-4">
                        No spam, ever. Unsubscribe with one click.
                    </p>
                </ScrollReveal>

            </div>
        </section>
    );
}
"use client";

import Link from "next/link";
import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/motion-wrappers";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] w-full flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center">
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col items-center justify-center space-y-6">
            
            {/* Animated Icon */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="text-muted-foreground mb-2"
            >
              <ChefHat size={80} strokeWidth={1.5} />
            </motion.div>
            
            {/* Typography */}
            <div className="space-y-3 max-w-xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Dev Dee is still cooking this page.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                This feature is currently in the oven. Stop checking the logs; it'll be ready when it's ready.
              </p>
            </div>

            {/* Action */}
            <div className="pt-6">
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 text-base">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

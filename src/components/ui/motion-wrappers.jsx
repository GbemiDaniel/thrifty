"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* =========================================
   1. MASTER VARIANTS (The Physics)
   ========================================= */
const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 20 }
    }
};

/* =========================================
   2. REUSABLE WRAPPERS (The Components)
   ========================================= */

export function StaggerContainer({ children, className = "" }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeUp({ children, className = "" }) {
    return (
        <motion.div variants={fadeUpVariants} className={className}>
            {children}
        </motion.div>
    );
}

export function SlideDownHeader({ children, className = "" }) {
    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { y: "-100%" },
                visible: {
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 }
                }
            }}
            className={className}
        >
            {children}
        </motion.header>
    );
}

export function ScrollReveal({ children, className = "", delay = 0 }) {
    // 1. The Physical Anchor
    const ref = useRef(null);

    // 2. The Native Observer (Triggers when 20% visible)
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    console.log("Is Bento in view?", isInView);
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            // 3. Strict State Enforcement
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                // Delay cascades only fire after the trigger hits
                delay: isInView ? delay : 0
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll immediately on mount to protect behind-the-scenes animations
    document.body.style.overflow = "hidden";

    // Simulate initial asset paint/load
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const handleAnimationComplete = () => {
    // Unlock scroll only when the exit animation has completely finished
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-background"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] // Premium 'curtain lift' cubic-bezier
            } 
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          {/* Sleek Minimalist Loading State */}
          <motion.div
            className="text-foreground text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase font-sans"
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
          >
            Thrifty
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

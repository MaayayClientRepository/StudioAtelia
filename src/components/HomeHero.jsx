import React, { useState } from "react";
import { motion, AnimatePresence, useTransform, useMotionValue } from "framer-motion";
import { Menu, X, Instagram, Twitter, Facebook, Search, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Spotlight } from "./ui/Spotlight";
import FurnitureSketches from "./FurnitureSketches";

const HomeHero = ({ progress }) => {
    const defaultProgress = useMotionValue(0);
    const activeProgress = progress || defaultProgress;

    // Dynamic scroll-dependent animations for the decorative elements
    const lineOpacity = useTransform(activeProgress, [0.3, 0.8], [1, 0]);
    const watermarkOpacity = useTransform(activeProgress, [0.3, 0.8], [0.02, 0]);

    return (
        <section className="relative h-screen w-full bg-base overflow-hidden flex flex-col items-center justify-center font-sans tracking-tight">

            <FurnitureSketches progress={activeProgress} theme="dark" />

            {/* Premium Refined Backdrop: Subtle Radial Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(191, 168, 143, 0.05)" />

            {/* Main Brand Name Fold */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="mt-4 md:mt-8 flex flex-col items-center gap-12">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ delay: 1, duration: 1.5 }}
                            style={{ opacity: lineOpacity }}
                            className="h-[1px] bg-white/20"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Background Decorative Element */}
            <motion.div
                style={{ opacity: watermarkOpacity }}
                className="absolute inset-0 select-none pointer-events-none flex items-center justify-center"
            >
                <h2 className="text-[50vw] md:text-[25vw] font-black text-white/5 tracking-[0.1em] uppercase leading-none text-center">
                    NICHE <br className="md:hidden" /> & FORM
                </h2>
            </motion.div>

            {/* Grain Overlay for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <style>{`
                ::selection {
                    background: var(--color-accent);
                    color: #000;
                }
            `}</style>
        </section>
    );
};

export default HomeHero;
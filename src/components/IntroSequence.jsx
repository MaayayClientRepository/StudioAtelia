import React from 'react';
import { motion, useTransform } from 'framer-motion';

const IntroSequence = ({ progress }) => {
    // 1. THE TRANSFORMATION ENGINE (Sequential Background Reveal)
    // Black and White remains the base (constant opacity 1 until global fade out)
    const ruinOpacity = 1;
    // Color fades in later
    const modernOpacity = useTransform(progress, [0.1, 0.4], [0, 1]);

    // Global image fade out (happens after text completes its first phase)
    const imageOpacity = useTransform(progress, [0.7, 0.9], [1, 0]);

    // 2. TEXT EVOLUTION & CENTERING
    // Brand name and tagline now fade in simultaneously with the color transition
    const taglineOpacity = useTransform(progress, [0.1, 0.4], [0, 1]);

    // Once scrolling continues AFTER text appears, it centers and turns yellow
    const textColor = useTransform(progress, [0.7, 0.95], ["#FFFFFF", "#FACC15"]);
    const brandY = useTransform(progress, [0.7, 0.95], [-120, 0]); // From tagline position up to center
    const scale = 1;

    return (
        <div className="relative h-screen w-full overflow-hidden bg-transparent font-sans flex items-center justify-center">

            {/* --- CORE BRAND IDENTITY: Studio Atélia & Tagline --- */}
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                    style={{
                        opacity: taglineOpacity,
                        y: brandY,
                        scale: scale,
                        willChange: "opacity, transform, color"
                    }}
                    className="px-6 text-center max-w-[95vw] flex flex-col items-center overflow-visible"
                >
                    {/* The Art of Living - Pre-title */}
                    <div className="flex items-center justify-center gap-4 mb-8 opacity-60">
                        <motion.div style={{ backgroundColor: textColor }} className="h-[1px] w-6 md:w-10" />
                        <motion.span
                            style={{ color: textColor }}
                            className="text-[8px] md:text-[10px] font-medium uppercase tracking-[0.8em] font-sans"
                        >
                            The Art of Living
                        </motion.span>
                        <motion.div style={{ backgroundColor: textColor }} className="h-[1px] w-6 md:w-10" />
                    </div>

                    {/* Brand Title: Cinematic Scale & Dual Typography */}
                    <motion.h1
                        style={{
                            color: textColor,
                            fontSize: "clamp(3rem, 12vw, 15vw)"
                        }}
                        className="font-light text-white leading-none tracking-[-0.02em] mb-6 whitespace-nowrap"
                    >
                        Studio <span className="font-serif italic font-normal">Atélia</span>
                    </motion.h1>

                    {/* Unified Tagline in Single Line */}
                    <div className="flex items-center gap-4 md:gap-8 justify-center w-full">
                        <motion.div
                            style={{ backgroundColor: useTransform(progress, [0.7, 0.95], ["#FFFFFF", "#FACC15"]) }}
                            className="h-[1px] flex-1 max-w-[40px] md:max-w-[100px] opacity-40"
                        />
                        <motion.p
                            style={{
                                color: useTransform(progress, [0.7, 0.95], ["#FFFFFF", "#FACC15"]),
                                fontSize: "clamp(0.7rem, 2vw, 1.5rem)"
                            }}
                            className="font-['Fira_Sans_Condensed',_sans-serif] font-light italic tracking-[0.2em] md:tracking-[0.4em] uppercase whitespace-nowrap"
                        >
                            Thoughtful design Transforms living
                        </motion.p>
                        <motion.div
                            style={{ backgroundColor: useTransform(progress, [0.7, 0.95], ["#FFFFFF", "#FACC15"]) }}
                            className="h-[1px] flex-1 max-w-[40px] md:max-w-[100px] opacity-40"
                        />
                    </div>
                </motion.div>
            </div>

            {/* --- THE TRANSFORMATION ENGINE --- */}
            <div className="absolute inset-0 z-10 w-full h-full">
                {/* 1. THE FOUNDATION (B&W) */}
                {/* Stays visible until the final image section fadeout */}
                <motion.div
                    style={{
                        opacity: imageOpacity,
                        willChange: "opacity"
                    }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >
                    <img
                        src="/b&w_int.png"
                        alt="Foundational Space"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-center grayscale"
                    />
                </motion.div>

                {/* 2. THE EVOLUTION (COLOR) */}
                <motion.div
                    style={{
                        opacity: useTransform([modernOpacity, imageOpacity], ([m, i]) => m * i),
                        willChange: "opacity"
                    }}
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                >
                    <img
                        src="/color_int.jpg"
                        alt="Evolved Luxury Space"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-center"
                    />
                </motion.div>
            </div>

            {/* SCROLL INDICATOR */}
            <motion.div
                style={{ opacity: useTransform(progress, [0, 0.15], [1, 0]) }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 pointer-events-none mix-blend-difference"
            >
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-white"
                    />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-light text-white/40">Scroll</span>
            </motion.div>
        </div>
    );
};

export default IntroSequence;

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import bwIntImg from '../assets/b&w_int.png';
import colorIntImg from '../assets/color_int.jpg';

const IntroSequence = ({ progress }) => {
    // 1. THE TRANSFORMATION ENGINE (Sequential Background Reveal)
    // Black and White remains the base (constant opacity 1 until global fade out)
    const ruinOpacity = 1;
    // Color fades in MUCH earlier and more gradually for a "growing" effect
    const modernOpacity = useTransform(progress, [0.05, 0.7], [0, 1]);

    // Global image fade out (happens after text completes its first phase)
    const imageOpacity = useTransform(progress, [0.75, 0.95], [1, 0]);

    // 2. TEXT EVOLUTION & CENTERING
    // Brand name and tagline now fade in simultaneously with the color transition
    const taglineOpacity = useTransform(progress, [0.1, 0.4], [0, 1]);

    // Refined tonal progression: White -> Warm Stone (#F7F2EB) -> Champagne (#BFA88F)
    const textColor = useTransform(progress, [0.7, 0.85, 1], ["#FFFFFF", "#F7F2EB", "#BFA88F"]);
    const brandY = useTransform(progress, [0.7, 0.95], [-100, 0]); // Reduced travel for snappier feel
    const scale = 1;

    return (
        <div className="relative h-screen w-full overflow-hidden bg-transparent font-sans flex items-center justify-center">

            {/* --- CORE BRAND IDENTITY: Niche & Form & Tagline --- */}
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
                    <div className="flex items-center justify-center gap-3 md:gap-5 mb-4 md:mb-10">
                        <motion.div 
                            style={{ backgroundColor: textColor }} 
                            className="h-[1px] w-8 md:w-16 opacity-35" 
                        />
                        <motion.span
                            style={{ color: textColor }}
                            className="text-[9px] md:text-[11px] font-semibold tracking-[0.6em] md:tracking-[0.8em] mr-[-0.6em] md:mr-[-0.8em] uppercase font-sans text-center"
                        >
                            The Art of Living
                        </motion.span>
                        <motion.div 
                            style={{ backgroundColor: textColor }} 
                            className="h-[1px] w-8 md:w-16 opacity-35" 
                        />
                    </div>

                    {/* Brand Title: Cinematic Scale & Dual Typography */}
                    <motion.h1
                        style={{
                            color: textColor,
                            fontSize: "clamp(2rem, 12vw, 15vw)"
                        }}
                        className="font-serif font-light italic leading-none tracking-[-0.02em] mb-4 sm:mb-6 text-center"
                    >
                        Niche & Form
                    </motion.h1>

                    {/* Unified Tagline in Single Line */}
                    <div className="flex items-center gap-4 md:gap-8 justify-center w-full">
                        <motion.div
                            style={{ backgroundColor: useTransform(progress, [0.7, 0.95], ["#FFFFFF", "#BFA88F"]) }}
                            className="h-[1px] flex-1 max-w-[40px] md:max-w-[100px] opacity-40"
                        />
                        <motion.p
                            style={{
                                color: useTransform(progress, [0.7, 0.95], ["#FFFFFF", "#BFA88F"]),
                                fontSize: "clamp(0.6rem, 2.5vw, 1.5rem)"
                            }}
                            className="font-['Fira_Sans_Condensed',_sans-serif] font-light italic tracking-[0.15em] md:tracking-[0.4em] indent-[0.15em] md:indent-[0.4em] uppercase text-center"
                        >
                            Thoughtful design <br className="sm:hidden" /> Transforms living
                        </motion.p>
                        <motion.div
                            style={{ backgroundColor: useTransform(progress, [0.7, 0.95], ["#FFFFFF", "#BFA88F"]) }}
                            className="h-[1px] flex-1 max-w-[40px] md:max-w-[100px] opacity-40"
                        />
                    </div>
                </motion.div>
            </div>

            {/* --- THE TRANSFORMATION ENGINE --- */}
            <div className="absolute inset-0 z-10 w-full h-full">
                {/* 1. THE FOUNDATION (B&W) */}
                <motion.div
                    style={{
                        opacity: imageOpacity,
                        willChange: "opacity"
                    }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >
                    <img
                        src={bwIntImg}
                        alt="Foundational Space"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-[52.5%_center] grayscale"
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
                        src={colorIntImg}
                        alt="Evolved Luxury Space"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-[52.5%_center]"
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

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default IntroSequence;

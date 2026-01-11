import React, { useState } from "react";
import { motion, AnimatePresence, useTransform, useMotionValue } from "framer-motion";
import { Menu, X, Instagram, Twitter, Facebook, Search, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Spotlight } from "./ui/Spotlight";


const FloatingSketches = ({ progress }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Chair Sketch - Pure White */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [200, -200]),
                    rotate: useTransform(progress, [0, 1], [-15, 25]),
                    opacity: 0.45,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[12%] left-[2%] md:top-[15%] md:left-[5%] w-32 h-32 md:w-64 md:h-64 text-white"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M7 20v-5h10v5M7 15V4h10v11M5 15h14" />
                <path d="M9 10h6M9 7h6" />
            </motion.svg>

            {/* Sofa Sketch - Pure White */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [300, -100]),
                    rotate: useTransform(progress, [0, 1], [10, -10]),
                    opacity: 0.4,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[65%] right-[2%] md:top-[60%] md:right-[10%] w-[18rem] md:w-[28rem] h-32 md:h-56 text-white"
                viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.8"
            >
                <path d="M10,20 L10,40 M90,20 L90,40 M10,35 L90,35 M20,20 L20,35 M80,20 L80,35 M20,25 L80,25" />
                <path d="M10,20 Q50,15 90,20" />
            </motion.svg>

            {/* Cupboard / Geometry - Pure White */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [-100, 300]),
                    rotate: useTransform(progress, [0, 1], [5, -15]),
                    opacity: 0.35,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[5%] right-[15%] md:right-[25%] w-32 h-[15rem] md:w-64 md:h-[35rem] text-white"
                viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="1"
            >
                <rect x="5" y="5" width="30" height="70" />
                <line x1="20" y1="5" x2="20" y2="75" />
                <circle cx="17" cy="40" r="0.5" fill="currentColor" />
                <circle cx="23" cy="40" r="0.5" fill="currentColor" />
            </motion.svg>

            {/* Organic Scribble - Pure White */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [0, -400]),
                    rotate: useTransform(progress, [0, 1], [0, 360]),
                    opacity: 0.3,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[40%] left-[10%] md:top-[35%] md:left-[25%] w-40 h-40 md:w-80 md:h-80 text-white"
                viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            >
                <path d="M20,50 Q30,20 50,50 T80,50 S90,80 50,80 T20,50" strokeDasharray="1 2" />
            </motion.svg>
        </div>
    );
};

const HomeHero = ({ progress }) => {
    const defaultProgress = useMotionValue(0);
    const activeProgress = progress || defaultProgress;

    return (
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">

            <FloatingSketches progress={activeProgress} />

            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(210, 182, 138, 0.05)" />

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
                            className="h-[1px] bg-white/10"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute inset-0 select-none pointer-events-none opacity-[0.02] flex items-center justify-center">
                <h2 className="text-[60vw] md:text-[40vw] font-black text-white tracking-widest uppercase">
                    ATÉLIA
                </h2>
            </div>

            <style>{`
                ::selection {
                    background: #D2B68A;
                    color: #000;
                }
            `}</style>
        </section>
    );
};

export default HomeHero;
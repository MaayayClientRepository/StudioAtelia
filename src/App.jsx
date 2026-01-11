import React, { useEffect, useRef } from "react";
import IntroSequence from "./components/IntroSequence";
import HomeHero from "./components/HomeHero";
import WhatWeDo from "./components/WhatWeDo";
import HowWeDoIt from "./components/HowWeDoIt";
import WhyUs from "./components/WhyUs";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import Navigate from "./components/Navigate";
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from "framer-motion";

function App() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- ELITE SEQUENTIAL SCROLL ARCHITECTURE (3500vh for snappier response) ---
    // Rule: We use distinct "Animation Blocks" with "Hold Zones" and "Travel Zones".

    // 1. INTRO (0.0 -> 0.20 Centering complete)
    const introProgress = useTransform(scrollYProgress, [0.01, 0.20], [0, 1]);
    const introOpacity = useTransform(scrollYProgress, [0.32, 0.38], [1, 0]);

    // 2. HOME HERO (Entrance Fade: 0.15 -> 0.20, Content: 0.20 -> 0.32, Exit: 0.32 -> 0.38)
    const homeInternalProgress = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
    const homeScaleOut = useTransform(scrollYProgress, [0.32, 0.38], [1, 1]);
    const homeExitOpacity = useTransform(scrollYProgress, [0.32, 0.38], [1, 0]);

    // 3. WHAT WE DO (Travel: 0.32 -> 0.38, Content: 0.38 -> 0.52, Exit: 0.52 -> 0.58)
    const serviceY = useTransform(scrollYProgress, [0.32, 0.38], ["100vh", "0vh"]);
    const serviceScaleIn = useTransform(scrollYProgress, [0.32, 0.38], [1, 1]);
    const serviceInternalProgress = useTransform(scrollYProgress, [0.38, 0.52], [0, 1]);
    const serviceScaleOut = useTransform(scrollYProgress, [0.52, 0.58], [1, 1]);
    const serviceOpacity = useTransform(scrollYProgress, [0.52, 0.58], [1, 0]);

    // 4. HOW WE DO IT (Travel: 0.52 -> 0.58, Content: 0.58 -> 0.75, Exit: 0.75 -> 0.82)
    const howY = useTransform(scrollYProgress, [0.52, 0.58], ["100vh", "0vh"]);
    const howScaleIn = useTransform(scrollYProgress, [0.52, 0.58], [1, 1]);
    const howInternalProgress = useTransform(scrollYProgress, [0.58, 0.75], [0, 1]);
    const howScaleOut = useTransform(scrollYProgress, [0.75, 0.82], [1, 1]);
    const howOpacity = useTransform(scrollYProgress, [0.75, 0.82], [1, 0]);

    // 5. WHY US (Travel: 0.75 -> 0.82, Content: 0.82 -> 0.95)
    const whyScaleIn = useTransform(scrollYProgress, [0.75, 0.82], [1, 1]);
    const whyInternalProgress = useTransform(scrollYProgress, [0.82, 0.92, 0.94, 1], [0, 1, 1, 2]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // Slightly faster for responsiveness
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            smoothWheel: true,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    // Receding effect
    const scaleRecede = useTransform(scrollYProgress, [0.30, 0.35], [1, 0.85]);

    return (
        <div ref={containerRef} className="relative bg-[#000] h-[3500vh] w-full selection:bg-[#D2B68A] selection:text-black">
            <Navigate progress={scrollYProgress} />

            <FloatingCTA progress={scrollYProgress} />

            {/* LAYER 1: INTRO & PERSISTENT BRANDING */}
            <motion.div
                style={{
                    opacity: introOpacity,
                    scale: scaleRecede,
                    zIndex: 5,
                    display: useTransform(scrollYProgress, [0, 0.39], ["block", "none"]),
                    willChange: "opacity, transform"
                }}
                className="sticky top-0 h-screen w-full overflow-hidden bg-transparent pointer-events-none"
            >
                <IntroSequence progress={introProgress} />
            </motion.div>

            {/* LAYER 2: HOME HERO */}
            <motion.div
                style={{
                    opacity: useTransform(scrollYProgress, [0.15, 0.22, 0.32, 0.38], [0, 1, 1, 0]),
                    scale: homeScaleOut,
                    zIndex: 1,
                    display: useTransform(scrollYProgress, [0.12, 0.39], ["block", "none"]),
                    willChange: "opacity, transform"
                }}
                className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]"
            >
                <div className="h-full w-full">
                    <HomeHero progress={homeInternalProgress} />
                </div>
            </motion.div>

            {/* LAYER 3: WHAT WE DO */}
            <motion.div
                style={{
                    y: serviceY,
                    scale: serviceScaleOut,
                    opacity: serviceOpacity,
                    zIndex: 20,
                    display: useTransform(scrollYProgress, [0.30, 0.59], ["block", "none"]),
                    willChange: "transform, opacity"
                }}
                className="sticky top-0 h-screen w-full shadow-[0_-20px_40px_rgba(0,0,0,0.2)] overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] bg-[#FBF2C0]"
            >
                <motion.div style={{ scale: serviceScaleIn }} className="h-full w-full">
                    <WhatWeDo progress={serviceInternalProgress} />
                </motion.div>
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/5 to-transparent" />
            </motion.div>

            {/* LAYER 4: HOW WE DO IT */}
            <motion.div
                style={{
                    y: howY,
                    scale: howScaleOut,
                    opacity: howOpacity,
                    zIndex: 30,
                    display: useTransform(scrollYProgress, [0.50, 0.83], ["block", "none"]),
                    willChange: "transform, opacity"
                }}
                className="sticky top-0 h-screen w-full shadow-[0_-20px_40px_rgba(0,0,0,0.2)] overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] bg-[#2E2E2E]"
            >
                <motion.div style={{ scale: howScaleIn }} className="h-full w-full">
                    <HowWeDoIt progress={howInternalProgress} />
                </motion.div>
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/5 to-transparent" />
            </motion.div>

            {/* LAYER 5: WHY US */}
            <motion.div
                style={{
                    y: useTransform(scrollYProgress, [0.75, 0.82, 0.94, 1], ["100vh", "0vh", "0vh", "-20vh"]),
                    scale: whyScaleIn,
                    zIndex: 40,
                    display: useTransform(scrollYProgress, [0.70, 1], ["block", "block"]),
                    willChange: "transform"
                }}
                className="fixed inset-0 w-full h-screen shadow-[0_-40px_60px_rgba(0,0,0,0.1)] rounded-t-[2.5rem] md:rounded-t-[5rem] overflow-hidden bg-[#FBF2C0]"
            >
                {/* 
                  Internal Progress Mapping:
                  0.81 -> 0.88: Philosophy Reveal (0 -> 1)
                  0.88 -> 0.94: Hold (1)
                  0.94 -> 0.97: Philosophy Fade Out (1 -> 1.5)
                  0.97 -> 1.0:  Form Fade In & Footer Rise (1.5 -> 2)
                */}
                <WhyUs progress={useTransform(scrollYProgress, [0.82, 0.88, 0.94, 0.97, 1.0], [0, 1, 1, 1.5, 2])} />
            </motion.div>

            {/* LAYER 6: FOOTER */}
            <motion.div
                style={{
                    y: useTransform(scrollYProgress, [0.94, 1], ["100vh", "50vh"]),
                    zIndex: 100,
                    display: useTransform(scrollYProgress, [0.93, 1], ["none", "block"]),
                    willChange: "transform"
                }}
                className="fixed inset-0 w-full h-screen rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden"
            >
                <Footer />
            </motion.div>
        </div>
    );
}

export default App;
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

    // --- OPTIMIZED SEQUENTIAL SCROLL ARCHITECTURE (2400vh for concise experience) ---
    // Compressed ranges to reduce vertical scrolling as requested.

    // 1. INTRO (0.0 -> 0.07)
    const introProgress = useTransform(scrollYProgress, [0.01, 0.07], [0, 1]);
    const introOpacity = useTransform(scrollYProgress, [0.16, 0.20], [1, 0]);

    // 2. HOME HERO (Entrance: 0.07, Content: 0.07 -> 0.13, Exit: 0.13 -> 0.18)
    const homeInternalProgress = useTransform(scrollYProgress, [0.07, 0.13], [0, 1]);
    const homeScaleOut = useTransform(scrollYProgress, [0.13, 0.18], [1, 1]);
    const homeExitOpacity = useTransform(scrollYProgress, [0.13, 0.18], [1, 0]);

    // 3. WHAT WE DO (Travel: 0.16 -> 0.19, Content: 0.19 -> 0.23, Exit: 0.23 -> 0.25)
    const serviceY = useTransform(scrollYProgress, [0.16, 0.19], ["100vh", "0vh"]);
    const serviceScaleIn = useTransform(scrollYProgress, [0.16, 0.19], [1, 1]);
    const serviceInternalProgress = useTransform(scrollYProgress, [0.19, 0.23], [0, 1]);
    const serviceScaleOut = useTransform(scrollYProgress, [0.23, 0.25], [1, 1]);
    const serviceOpacity = useTransform(scrollYProgress, [0.25, 0.27], [1, 0]);

    // 4. HOW WE DO IT (Travel: 0.23 -> 0.26, Content: 0.26 -> 0.42, Exit: 0.42 -> 0.46)
    const howY = useTransform(scrollYProgress, [0.23, 0.26], ["100vh", "0vh"]);
    const howScaleIn = useTransform(scrollYProgress, [0.23, 0.26], [1, 1]);
    const howInternalProgress = useTransform(scrollYProgress, [0.23, 0.42], [0, 1]);
    const howScaleOut = useTransform(scrollYProgress, [0.42, 0.46], [1, 1]);
    const howOpacity = useTransform(scrollYProgress, [0.42, 0.46], [1, 0]);

    // 5. WHY US (Philosophy -> Button Center -> Form)
    const whyScaleIn = useTransform(scrollYProgress, [0.45, 0.52], [1, 1]);
    // 0.45 to 0.75: Philosophy Phrases
    // 0.75 to 0.80: Button Centering (Hold)
    // 0.80 to 0.95: Form Reveal
    const whyInternalProgress = useTransform(scrollYProgress, [0.45, 0.75, 0.80, 0.95], [0, 1, 1, 2]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            window.lenis = null;
            return;
        }

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1.0,
            smoothWheel: true,
            infinite: false,
        });

        // Store lenis globally for component scrollTo sync
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);

    // Receding effect
    const scaleRecede = useTransform(scrollYProgress, [0.25, 0.30], [1, 0.85]);

    return (
        <div ref={containerRef} className="relative bg-base h-[1800vh] w-full selection:bg-accent selection:text-black text-white/90">
            <Navigate progress={scrollYProgress} />

            <FloatingCTA progress={scrollYProgress} />

            {/* LAYER 1: INTRO & PERSISTENT BRANDING */}
            <motion.div
                style={{
                    opacity: introOpacity,
                    scale: scaleRecede,
                    zIndex: 5
                }}
                className="sticky top-0 h-screen w-full overflow-hidden bg-transparent pointer-events-none"
            >
                <IntroSequence progress={introProgress} />
            </motion.div>

            {/* LAYER 2: HOME HERO */}
            <motion.div
                style={{
                    opacity: useTransform(scrollYProgress, [0.07, 0.13, 0.20, 0.26], [0, 1, 1, 0]),
                    scale: homeScaleOut,
                    zIndex: 1
                }}
                className="sticky top-0 h-screen w-full overflow-hidden bg-base"
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
                    zIndex: 20
                }}
                className="sticky top-0 h-screen w-full shadow-[0_-20px_40px_rgba(0,0,0,0.2)] overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2.5rem] md:rounded-t-[4rem] bg-secondary"
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
                    zIndex: 30
                }}
                className="sticky top-0 h-screen w-full shadow-[0_-20px_40px_rgba(0,0,0,0.2)] overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2.5rem] md:rounded-t-[4rem] bg-[#121212]"
            >
                <motion.div style={{ scale: howScaleIn }} className="h-full w-full">
                    <HowWeDoIt progress={howInternalProgress} />
                </motion.div>
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/5 to-transparent" />
            </motion.div>

            {/* LAYER 5: WHY US */}
            <motion.div
                style={{
                    y: useTransform(scrollYProgress, [0.44, 0.52, 1], ["100vh", "0vh", "0vh"]),
                    scale: whyScaleIn,
                    zIndex: 40
                }}
                className="fixed inset-0 w-full h-screen shadow-[0_-40px_60px_rgba(0,0,0,0.1)] rounded-t-[1.5rem] sm:rounded-t-[2.5rem] md:rounded-t-[5rem] overflow-hidden bg-[#FBF2C0]"
            >
                <WhyUs progress={whyInternalProgress} />
            </motion.div>

            {/* LAYER 6: FOOTER */}
            <motion.div
                style={{
                    y: useTransform(scrollYProgress, [0.96, 1], ["100vh", "0vh"]),
                    zIndex: 100,
                    pointerEvents: useTransform(scrollYProgress, [0.95, 0.96], ["none", "auto"])
                }}
                className="fixed inset-0 w-full h-screen rounded-t-[2rem] sm:rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden bg-base"
            >
                <Footer />
            </motion.div>
        </div>
    );
}

export default App;
    import React, { useRef, useState } from "react";
import { motion, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import mkImg from "../assets/whatwedo/mk.png";
import resImg from "../assets/whatwedo/res.png";
import spaceImg from "../assets/whatwedo/space.png";
import turkeyImg from "../assets/whatwedo/turkey.png";
import projectManagementImg from "../assets/whatwedo/project-management.png";
import materialImg from "../assets/whatwedo/material.png";

const services = [
    { title: "MODULAR KITCHENS", code: "MK-01", image: mkImg },
    { title: "RESIDENTIAL INTERIORS", code: "RI-02", image: resImg },
    { title: "SPACE OPTIMISATION", code: "SO-03", image: spaceImg },
    { title: "TURNKEY EXECUTION", code: "TE-04", image: turkeyImg },
    { title: "PROJECT MANAGEMENT", code: "PM-05", image: projectManagementImg },
    { title: "MATERIAL SOURCING", code: "MS-06", image: materialImg },
];

const WhatWeDo = ({ progress }) => {
    const titleX = useTransform(progress, [0, 0.25], ["0vw", "55vw"]);
    const scrollRef = useRef(null);
    const [constraints, setConstraints] = useState({ start: 0, end: 0 });
        const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useRef(false);

    // Detect mobile once
    React.useEffect(() => {
        isMobile.current = window.innerWidth < 768;
        const onResize = () => { isMobile.current = window.innerWidth < 768; };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // MotionValue that drives the spring — initialized at a safe start
    const xTarget = useMotionValue(0);

    // Calculate scroll constraints
    React.useEffect(() => {
        const calculateScroll = () => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const fullWidth = container.scrollWidth;
                const viewportW = window.innerWidth;
                const style = window.getComputedStyle(container);
                const paddingLeft = parseFloat(style.paddingLeft);
                const paddingRight = parseFloat(style.paddingRight);

                const introBlock = container.firstElementChild;
                const introWidth = introBlock.offsetWidth;
                const titlePos = (viewportW / 2) - (paddingLeft + (introWidth / 2));

                const lastCard = container.lastElementChild;
                if (lastCard) {
                    const lastCardWidth = lastCard.offsetWidth;
                    const distanceToCenterOfLastCard = fullWidth - paddingRight - (lastCardWidth / 2);
                    const lastCardPos = -(distanceToCenterOfLastCard - (viewportW / 2));
                    
                    setConstraints({ start: titlePos, end: lastCardPos });
                    
                    // Initialize xTarget based on current progress
                    const currentProgress = progress.get();
                    const targetPx = titlePos + currentProgress * (lastCardPos - titlePos);
                    xTarget.set(targetPx);
                }
            }
        };

        calculateScroll();
        // Give it a tiny beat for DOM to settle
        const timer = setTimeout(calculateScroll, 100);

        window.addEventListener("resize", calculateScroll);
        return () => {
            window.removeEventListener("resize", calculateScroll);
            clearTimeout(timer);
        };
    }, [xTarget, progress]);

    // ─── TWO-WAY CONTINUOUS SCROLL ───
    // Map vertical scroll progress directly to the horizontal position (from start to end constraints).
    // This allows smooth scroll-linked sliding in both directions and prevents lags/jumps.
    useMotionValueEvent(progress, "change", (v) => {
        // Calculate current index for active dots and navigation state
        const rawIndex = Math.round(v * services.length);
        const clampedIndex = Math.min(Math.max(rawIndex, 0), services.length);
        setCurrentIndex(clampedIndex);

        // Update the horizontal position target continuously
        const targetPx = constraints.start + v * (constraints.end - constraints.start);
        xTarget.set(targetPx);
    });

    // Smooth spring animation — tuned for each screen size
    const springX = useSpring(xTarget, {
        damping: isMobile.current ? 35 : 28,
        stiffness: isMobile.current ? 200 : 140,
        mass: isMobile.current ? 0.5 : 0.8,
        restDelta: 0.5,
    });

    // Button navigation — scrolls vertically and lets progress listener translate carousel
    const handleNav = (dir) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Section ranges in App.jsx: What We Do starts at 0.19 and ends at 0.23
        const sectionStart = 0.19; 
        const sectionEnd = 0.23;
        const step = 1 / services.length;
        
        let nextIndex;
        if (dir === "next") {
            if (currentIndex >= services.length) {
                // Jump to next section (How We Do It)
                const targetScroll = 0.25 * totalHeight;
                if (window.lenis) {
                    window.lenis.scrollTo(targetScroll, { duration: 1.2, force: true });
                } else {
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
                return;
            }
            nextIndex = Math.min(services.length, currentIndex + 1);
        } else {
            if (currentIndex <= 0) {
                // Jump to previous section (Home Hero)
                const targetScroll = 0.10 * totalHeight;
                if (window.lenis) {
                    window.lenis.scrollTo(targetScroll, { duration: 1.2, force: true });
                } else {
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
                return;
            }
            nextIndex = Math.max(0, currentIndex - 1);
        }

        // Optimistically set current index for instant dots state
        setCurrentIndex(nextIndex);

        // Sync vertical scroll position
        const targetGlobal = sectionStart + (nextIndex * step * (sectionEnd - sectionStart));
        const targetScroll = targetGlobal * totalHeight;
        if (window.lenis) {
            window.lenis.scrollTo(targetScroll, { duration: 1.0, force: true });
        } else {
            window.scrollTo({
                top: targetScroll,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative h-screen bg-secondary flex items-center overflow-hidden font-serif">
            {/* Background Large Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <h2 className="text-[30vw] md:text-[15vw] font-black text-black uppercase leading-none whitespace-nowrap">Niche & Form</h2>
            </div>

            {/* MOBILE PERSISTENT HEADER */}
            <motion.div 
                className="absolute top-20 left-4 z-30 pointer-events-none md:hidden text-left"
            >
                <span className="text-[8px] font-black tracking-[0.5em] text-[#BFA88F] uppercase italic mb-0.5 block opacity-60">Services Matrix</span>
                <h2 className="text-lg font-black text-black tracking-tighter uppercase leading-[0.85]">
                    WHAT <span className="text-transparent" style={{ WebkitTextStroke: "1px #000000" }}>WE DO.</span>
                </h2>
            </motion.div>

            {/* Horizontal Carousel — driven by springX */}
            <motion.div
                ref={scrollRef}
                style={{ x: springX, willChange: "transform" }}
                className="flex gap-4 sm:gap-6 md:gap-20 px-4 sm:px-6 md:px-[10vw] relative z-10 w-max"
            >
                {/* Intro Block */}
                <div className="flex-shrink-0 w-[160px] sm:w-[220px] md:w-[400px] flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl md:text-8xl font-black text-black leading-[0.85] tracking-tighter uppercase mb-3 sm:mb-5 md:mb-12">
                        What <br /> We <br /> Do?
                    </h2>
                    <p className="text-black/60 font-medium text-[8px] md:text-sm uppercase tracking-widest border-l-2 md:border-l-4 border-black pl-3 md:pl-8 max-w-[140px] sm:max-w-[180px] md:max-w-xs font-sans leading-snug" style={{ textWrap: "pretty" }}>
                        Luxury spatial design companions. We don't just build, we curate{"\u00A0"}experiences.
                    </p>
                </div>

                {/* Service Cards */}
                {services.map((service, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.08,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        viewport={{ once: true, margin: "-10%" }}
                        key={i}
                        className="flex-shrink-0 w-[72vw] sm:w-[58vw] md:w-[320px] group will-change-transform"
                    >
                        <div className="relative h-[310px] sm:h-[360px] md:h-[420px] w-full rounded-[1.5rem] sm:rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-[0_16px_32px_-8px_rgba(0,0,0,0.3)] transition-shadow duration-700 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                            <img
                                src={service.image}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover brightness-90 md:brightness-[0.7] group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1s] ease-out"
                                style={{ willChange: "transform, filter" }}
                                alt={service.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-8">
                                <span className="text-[9px] sm:text-[10px] md:text-xs text-accent font-black tracking-[0.2em] mb-1.5 sm:mb-2 block">
                                    {service.code.replace("-", " - ")}
                                </span>
                                <h3 className="text-lg sm:text-xl md:text-3xl font-serif font-medium text-white leading-[1.05] mb-3 sm:mb-4 md:mb-6 group-hover:text-accent transition-colors duration-500">
                                    {service.title}
                                </h3>

                              
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* ─── MOBILE NAV ARROWS ─── */}
            <button 
                onClick={() => handleNav("prev")}
                className={`absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 md:hidden z-30 
                    w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center 
                    text-white shadow-xl active:scale-90 transition-all duration-300
                    ${currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                aria-label="Previous card"
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button 
                onClick={() => handleNav("next")}
                className={`absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 md:hidden z-30 
                    w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center 
                    text-white shadow-xl active:scale-90 transition-all duration-300
                    ${currentIndex >= services.length ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                aria-label="Next card"
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* ─── DESKTOP NAV ─── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-8">
                <button 
                    onClick={() => handleNav("prev")}
                    className={`p-3 rounded-full border border-black/20 hover:bg-black hover:text-secondary transition-all duration-300 active:scale-90
                        ${currentIndex === 0 ? "opacity-20 pointer-events-none" : "bg-black/10"}`}
                    aria-label="Previous card"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                    {[...Array(services.length + 1)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-[2px] transition-all duration-500 ease-out rounded-full ${i === currentIndex ? "bg-accent w-10" : "bg-black/15 w-6"}`} 
                        />
                    ))}
                </div>

                <button 
                    onClick={() => handleNav("next")}
                    className={`p-3 rounded-full border border-black/20 hover:bg-black hover:text-secondary transition-all duration-300 active:scale-90
                        ${currentIndex >= services.length ? "opacity-20 pointer-events-none" : "bg-black/10"}`}
                    aria-label="Next card"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* ─── MOBILE PROGRESS DOTS ─── */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 md:hidden flex items-center gap-1.5 bg-black/10 backdrop-blur-sm rounded-full px-3 py-2">
                {[...Array(services.length + 1)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === currentIndex ? "bg-accent w-5" : "bg-black/20 w-1.5"}`} 
                    />
                ))}
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default WhatWeDo;

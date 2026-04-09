import React, { useRef, useState } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import mkImg from "../assets/whatwedo/mk.jpg";
import resImg from "../assets/whatwedo/res.jpg";
import spaceImg from "../assets/whatwedo/space.png";
import turkeyImg from "../assets/whatwedo/turkey.jpg";
import projectManagementImg from "../assets/whatwedo/project-management.jpg";
import materialImg from "../assets/whatwedo/material.jpg";

const services = [
    { title: "MODULAR KITCHENS", code: "MK-01", image: mkImg },
    { title: "RESIDENTIAL INTERIORS", code: "RI-02", image: resImg },
    { title: "SPACE OPTIMISATION", code: "SO-03", image: spaceImg },
    { title: "TURNKEY EXECUTION", code: "TE-04", image: turkeyImg },
    { title: "PROJECT MANAGEMENT", code: "PM-05", image: projectManagementImg },
    { title: "MATERIAL SOURCING", code: "MS-06", image: materialImg },
];

const FloatingSketches = ({ progress }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Chair Sketch */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [150, -150]),
                    rotate: useTransform(progress, [0, 1], [-10, 20]),
                    opacity: 0.08,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[12%] left-[4%] w-24 h-24 md:w-40 md:h-40 text-black"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M7 20v-5h10v5M7 15V4h10v11M5 15h14" />
                <path d="M9 10h6M9 7h6" />
            </motion.svg>

            {/* Wardrobe/Cupboard Sketch */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [100, -200]),
                    rotate: useTransform(progress, [0, 1], [30, -10]),
                    opacity: 0.06,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[35%] right-[4%] w-32 h-32 md:w-56 md:h-56 text-black"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3"
            >
                <path d="M4 18h16M4 14h16M4 10h16M4 6h16" />
                <path d="M6 18V6M10 18V10M14 18V6M18 18V10" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
            </motion.svg>

            {/* Sofa Sketch */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [400, -200]),
                    rotate: useTransform(progress, [0, 1], [-5, 10]),
                    opacity: 0.07,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[75%] left-[20%] w-40 h-20 md:w-64 md:h-32 text-black"
                viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.5"
            >
                <path d="M10,20 L10,40 M90,20 L90,40 M10,35 L90,35 M20,20 L20,35 M80,20 L80,35 M20,25 L80,25" />
                <path d="M10,20 Q50,15 90,20" />
            </motion.svg>

            {/* Scribble Element */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [300, -100]),
                    rotate: useTransform(progress, [0, 1], [-20, 30]),
                    opacity: 0.08,
                    willChange: "transform, opacity"
                }}
                className="absolute bottom-[10%] left-[25%] w-32 h-32 text-black"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"
            >
                <path d="M12 2v20M2 12h20" strokeDasharray="2 2" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 8l-2 2 4 4 2-2" />
            </motion.svg>
        </div>
    );
};

const WhatWeDo = ({ progress }) => {
    const scrollRef = useRef(null);
    const [constraints, setConstraints] = useState({ start: 0, end: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const highWaterMark = useRef(0);
    const isMobile = useRef(false);
    const isNavigating = useRef(false);

    // Detect mobile once
    React.useEffect(() => {
        isMobile.current = window.innerWidth < 768;
        const onResize = () => { isMobile.current = window.innerWidth < 768; };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

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
                }
            }
        };

        calculateScroll();
        window.addEventListener("resize", calculateScroll);
        return () => window.removeEventListener("resize", calculateScroll);
    }, []);

    // MotionValue that drives the spring — initialized at 0
    const xTarget = useMotionValue(0);

    // ONE-WAY FORWARD SCROLL:
    // Only advance cards when progress exceeds our high-water-mark.
    // Scrolling back up does NOT move cards backward.
    React.useEffect(() => {
        const unsubscribe = progress.on("change", (v) => {
            // Calculate which step index we'd be at  
            const rawIndex = Math.round(v * services.length);
            const clampedIndex = Math.min(rawIndex, services.length);

            // Auto-advance only if NOT currently navigating via buttons
            if (!isNavigating.current && clampedIndex > highWaterMark.current) {
                // Moving forward — update high-water-mark and card position
                highWaterMark.current = clampedIndex;
                setCurrentIndex(clampedIndex);

                // Calculate target pixel position
                const fraction = clampedIndex / services.length;
                const targetPx = constraints.start + fraction * (constraints.end - constraints.start);
                xTarget.set(targetPx);
            }
            
            // Reset when completely exiting the section from above
            if (v < 0.01 && highWaterMark.current !== 0) {
                highWaterMark.current = 0;
                setCurrentIndex(0);
                xTarget.set(constraints.start);
            }
        });
        return () => unsubscribe();
    }, [progress, constraints, xTarget]);

    // Smooth spring animation — tuned for each screen size
    const springX = useSpring(xTarget, {
        damping: isMobile.current ? 35 : 28,
        stiffness: isMobile.current ? 200 : 140,
        mass: isMobile.current ? 0.5 : 0.8,
        restDelta: 0.5,
    });

    // Button navigation — buttons CAN go backward (they update high-water-mark too)
    const handleNav = (dir) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const sectionStart = 0.24;
        const sectionEnd = 0.34;
        const step = 1 / services.length;

        // Block auto-scroll updates during manual navigation
        isNavigating.current = true;
        
        let nextIndex;
        if (dir === "next") {
            if (currentIndex >= services.length) {
                // Jump to next section
                window.scrollTo({ top: 0.42 * totalHeight, behavior: "smooth" });
                return;
            }
            nextIndex = Math.min(services.length, currentIndex + 1);
        } else {
            if (currentIndex <= 0) {
                // Jump to previous section
                window.scrollTo({ top: 0.05 * totalHeight, behavior: "smooth" });
                return;
            }
            nextIndex = Math.max(0, currentIndex - 1);
        }

        // Update state + high-water-mark (so backward button works correctly)
        highWaterMark.current = nextIndex;
        setCurrentIndex(nextIndex);

        // Move the carousel
        const fraction = nextIndex / services.length;
        const targetPx = constraints.start + fraction * (constraints.end - constraints.start);
        xTarget.set(targetPx);

        // Sync vertical scroll position
        const targetGlobal = sectionStart + (nextIndex * step * (sectionEnd - sectionStart));
        window.scrollTo({
            top: targetGlobal * totalHeight,
            behavior: "smooth",
        });

        // Release the lock after animation roughly completes
        setTimeout(() => {
            isNavigating.current = false;
        }, 800);
    };

    return (
        <div className="relative h-screen bg-secondary flex items-center overflow-hidden font-serif">
            {/* Background Large Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <h2 className="text-[30vw] md:text-[15vw] font-black text-black uppercase leading-none whitespace-nowrap">Niche & Form</h2>
            </div>

            <FloatingSketches progress={progress} />

            {/* Horizontal Carousel — driven by springX */}
            <motion.div
                ref={scrollRef}
                style={{ x: springX, willChange: "transform" }}
                className="flex gap-4 sm:gap-6 md:gap-20 px-4 sm:px-6 md:px-[10vw] relative z-10 w-max"
            >
                {/* Intro Block */}
                <div className="flex-shrink-0 w-[200px] sm:w-[260px] md:w-[400px] flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl md:text-8xl font-black text-black leading-[0.8] tracking-tighter uppercase mb-4 sm:mb-6 md:mb-12">
                        What <br /> We <br /> Do?
                    </h2>
                    <p className="text-black/60 font-medium text-[9px] md:text-sm uppercase tracking-widest border-l-2 md:border-l-4 border-black pl-3 md:pl-8 max-w-[160px] sm:max-w-[180px] md:max-w-xs font-sans">
                        Luxury spatial design companions. We don't just build, we curate experiences.
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
                        className="flex-shrink-0 w-[55vw] sm:w-[60vw] md:w-[320px] group will-change-transform"
                    >
                        <div className="relative h-[260px] sm:h-[300px] md:h-[420px] w-full rounded-[1rem] sm:rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-[0_16px_32px_-8px_rgba(0,0,0,0.3)] transition-shadow duration-700 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
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

                                <div className="flex items-center gap-3 group/btn cursor-pointer">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-accent transition-all duration-500 flex items-center justify-center group-hover:border-accent border border-white/20">
                                        <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 text-white group-hover/btn:text-black transition-transform duration-500 group-hover/btn:rotate-45" />
                                    </div>
                                </div>
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
                            className={`h-[2px] transition-all duration-500 ease-out rounded-full ${i === currentIndex ? "bg-black w-10" : "bg-black/15 w-6"}`} 
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
            <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 md:hidden flex items-center gap-1.5 bg-black/10 backdrop-blur-sm rounded-full px-3 py-2">
                {[...Array(services.length + 1)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === currentIndex ? "bg-black w-5" : "bg-black/20 w-1.5"}`} 
                    />
                ))}
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default WhatWeDo;

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

    const [lastProgress, setLastProgress] = useState(0);
    const [direction, setDirection] = useState("down");

    // Tracks current index and direction based on progress
    React.useEffect(() => {
        const unsubscribe = progress.on("change", (v) => {
            // Direction Detection
            if (v > lastProgress) setDirection("down");
            else if (v < lastProgress) setDirection("up");
            setLastProgress(v);

            const index = Math.round(v * services.length);
            setCurrentIndex(Math.min(index, services.length));
        });
        return () => unsubscribe();
    }, [progress, lastProgress]);

    // Asymmetric Movement Logic:
    // When going down (forward), we use the standard mapping.
    // When going up (backward), we "telescope" the progress to reset the cards significantly faster.
    const forwardX = useTransform(progress, [0, 1], [`${constraints.start}px`, `${constraints.end}px`]);
    const backwardX = useTransform(progress, [0.4, 1], [`${constraints.start}px`, `${constraints.end}px`]);
    
    // Choose the target X based on scroll direction
    // If going UP, we want to hit the 'Initial Position' (start) much sooner.
    const targetX = useTransform(progress, (v) => {
        if (direction === "down" || v === 0) {
            // Normal forward travel
            return constraints.start + (v * (constraints.end - constraints.start));
        } else {
            // REWIND LOGIC:
            // We want to reach constraints.start (the title) much faster when scrolling up.
            // Map 0.7 -> 1.0 (downwards progress) to 0 -> 1.0 (actual visual movement)
            // This means if we are scrolling up from 1.0, we hit 0 after only 30% of the reverse scroll.
            const rewindThreshold = 0.75; 
            const fastProgress = Math.max(0, (v - rewindThreshold) / (1 - rewindThreshold));
            return constraints.start + (fastProgress * (constraints.end - constraints.start));
        }
    });

    const springX = useSpring(targetX, { 
        damping: direction === "up" ? 45 : 25, 
        stiffness: direction === "up" ? 240 : 120,
        mass: direction === "up" ? 0.4 : 1
    });

    const handleNav = (direction) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Range 0.24 -> 0.34 of 2500vh (Updated for new architecture)
        const start = 0.24;
        const end = 0.34;
        const currentP = progress.get();
        const step = 1 / services.length;
        
        let nextP;
        if (direction === "next") {
            if (currentIndex >= services.length) {
                // If at last item, skip to NEXT section (How We Do It)
                window.scrollTo({ top: 0.38 * totalHeight, behavior: "smooth" });
                return;
            }
            nextP = Math.min(1, currentP + step);
        } else {
            if (currentIndex <= 0) {
                // If at first item, skip to PREVIOUS section (Home Hero)
                window.scrollTo({ top: 0.18 * totalHeight, behavior: "smooth" });
                return;
            }
            nextP = Math.max(0, currentP - step);
        }

        const targetGlobal = start + (nextP * (end - start));
        window.scrollTo({
            top: targetGlobal * totalHeight,
            behavior: "smooth"
        });
    };

    return (
        <div className="relative h-screen bg-secondary flex items-center overflow-hidden font-serif">
            {/* Background Large Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <h2 className="text-[30vw] md:text-[15vw] font-black text-black uppercase leading-none whitespace-nowrap">Niche & Form</h2>
            </div>

            <FloatingSketches progress={progress} />

            <motion.div ref={scrollRef} style={{ x: springX, willChange: "transform" }} className="flex gap-6 md:gap-20 px-4 md:px-[10vw] relative z-10 w-max">
                {/* Intro Block */}
                <div className="flex-shrink-0 w-[260px] md:w-[400px] flex flex-col justify-center">
                    <h2 className="text-4xl md:text-8xl font-black text-black leading-[0.8] tracking-tighter uppercase mb-6 md:mb-12">
                        What <br /> We <br /> Do?
                    </h2>
                    <p className="text-black/60 font-medium text-[9px] md:text-sm uppercase tracking-widest border-l-2 md:border-l-4 border-black pl-3 md:pl-8 max-w-[180px] md:max-w-xs font-sans">
                        Luxury spatial design companions. We don't just build, we curate experiences.
                    </p>
                </div>

                {/* Service Cards rendered Horizontally */}
                {services.map((service, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        key={i}
                        className="flex-shrink-0 w-[70vw] md:w-[320px] group will-change-transform"
                    >
                        <div className="relative h-[320px] md:h-[420px] w-full rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
                            <img
                                src={service.image}
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover brightness-90 md:brightness-[0.7] group-hover:brightness-100 group-hover:scale-110 transition-all duration-[1.2s] ease-out"
                                style={{ willChange: "transform, filter" }}
                                alt={service.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                                <span className="text-[10px] md:text-xs text-accent font-black tracking-[0.2em] mb-2 block">
                                    {service.code.replace("-", " - ")}
                                </span>
                                <h3 className="text-xl md:text-3xl font-serif font-medium text-white leading-[1.05] mb-4 md:mb-6 group-hover:text-accent transition-colors">
                                    {service.title}
                                </h3>

                                <div className="flex items-center gap-3 group/btn cursor-pointer">
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-accent transition-all duration-500 flex items-center justify-center group-hover:border-accent border border-white/20">
                                        <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 text-white group-hover/btn:text-black transition-transform duration-500 group-hover/btn:rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Navigation Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
                <button 
                    onClick={() => handleNav("prev")}
                    className="p-3 bg-black/10 border border-black/10 rounded-full hover:bg-black hover:text-secondary transition-all disabled:opacity-0"
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                {/* Progress Indicators */}
                <div className="flex gap-2">
                    {[...Array(services.length + 1)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-[2px] w-6 transition-all duration-500 rounded-full ${i === currentIndex ? "bg-black w-10" : "bg-black/10"}`} 
                        />
                    ))}
                </div>

                <button 
                    onClick={() => handleNav("next")}
                    className="p-3 bg-black/10 border border-black/10 rounded-full hover:bg-black hover:text-secondary transition-all disabled:opacity-0"
                    disabled={currentIndex === services.length}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Performance Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default WhatWeDo;

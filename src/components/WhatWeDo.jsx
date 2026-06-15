import React, { useRef, useState, useCallback } from "react";
import { motion, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import mkImg from "../assets/whatwedo/mk.png";
import resImg from "../assets/whatwedo/res.png";
import spaceImg from "../assets/whatwedo/space.png";
import turkeyImg from "../assets/whatwedo/turkey.png";
import projectManagementImg from "../assets/whatwedo/project-management.png";
import materialImg from "../assets/whatwedo/material.png";

const services = [
    {
        title: "MODULAR KITCHENS",
        code: "MK – 01",
        image: mkImg,
        backTitle: "Modular Kitchens",
        description: "Kitchens that balance craft with function. We design modular setups tailored to how you cook, store, and live — with finishes that hold their own long after the novelty wears off.",
    },
    {
        title: "RESIDENTIAL INTERIORS",
        code: "RI – 02",
        image: resImg,
        backTitle: "Residential Interiors",
        description: "Your home, designed around you. From layout to light, every decision is made with your daily rhythms in mind — so the space feels less decorated and more deeply yours.",
    },
    {
        title: "SPACE OPTIMISATION",
        code: "SO – 03",
        image: spaceImg,
        backTitle: "Space Optimisation",
        description: "More room isn't always the answer. We work with what exists — reconfiguring, rethinking, and reimagining — to make every square foot count without compromising on form.",
    },
    {
        title: "TURNKEY EXECUTION",
        code: "TE – 04",
        image: turkeyImg,
        backTitle: "Turnkey Execution",
        description: "One brief. Full delivery. We handle design, procurement, and on-site execution end to end, so you step into a finished space — not a work in progress.",
    },
    {
        title: "PROJECT MANAGEMENT",
        code: "PM – 05",
        image: projectManagementImg,
        backTitle: "Project Management",
        description: "Design is only as good as its execution. We coordinate every moving part — timelines, vendors, and site activity — so the process stays as considered as the outcome.",
    },
    {
        title: "MATERIAL SOURCING",
        code: "MS – 06",
        image: materialImg,
        backTitle: "Material Sourcing",
        description: "The right material makes the difference. We source finishes, textures, and fixtures that align with your design intent — curated for quality, longevity, and visual coherence.",
    },
];

// ─── FLIP CARD ────────────────────────────────────────────────────────────────
const FlipCard = ({ service, index, isDragging }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = useCallback((e) => {
        // Don't flip if the carousel is being dragged
        if (isDragging.current) return;
        e.stopPropagation();
        setIsFlipped((prev) => !prev);
    }, [isDragging]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-10%" }}
            className="flex-shrink-0 w-[72vw] sm:w-[58vw] md:w-[320px] group will-change-transform"
            style={{ perspective: "1200px" }}
            onClick={handleFlip}
        >
            {/* Inner flip wrapper */}
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d", position: "relative" }}
                className="relative h-[310px] sm:h-[360px] md:h-[420px] w-full cursor-pointer"
            >
                {/* ── FRONT ── */}
                <div
                    className="absolute inset-0 rounded-[1.5rem] sm:rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-[0_16px_32px_-8px_rgba(0,0,0,0.3)] group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-shadow duration-700"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
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
                            {service.code}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-3xl font-serif font-medium text-white leading-[1.05] mb-3 sm:mb-4 md:mb-5 group-hover:text-accent transition-colors duration-500">
                            {service.title}
                        </h3>
                        {/* Tap hint */}
                        <div className="flex items-center gap-1.5 opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                            <RotateCcw className="w-3 h-3 text-white/70" />
                            <span className="text-[8px] md:text-[9px] text-white/70 font-sans tracking-[0.18em] uppercase">
                                Tap to learn more
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── BACK ── */}
                <div
                    className="absolute inset-0 rounded-[1.5rem] sm:rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_16px_32px_-8px_rgba(0,0,0,0.25)] flex flex-col justify-between"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(145deg, #1a1814 0%, #111009 100%)",
                        border: "1px solid rgba(191,168,143,0.12)",
                    }}
                >
                    {/* Decorative top corner accent */}
                    <div className="absolute top-0 right-0 w-28 h-28 opacity-10"
                        style={{ background: "radial-gradient(circle at top right, #BFA88F, transparent 70%)" }}
                    />

                    <div className="p-5 sm:p-6 md:p-8 flex flex-col h-full justify-between relative z-10">
                        {/* Header */}
                        <div>
                            <span className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] text-[#BFA88F] uppercase block mb-3 md:mb-4">
                                {service.code}
                            </span>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-4 md:mb-6">
                                {service.backTitle}
                            </h3>
                            {/* Divider */}
                            <div className="w-8 h-px bg-[#BFA88F]/40 mb-4 md:mb-6" />
                            <p className="text-white/65 font-sans text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed" style={{ textWrap: "pretty" }}>
                                {service.description}
                            </p>
                        </div>

                        {/* Back flip hint */}
                        <div className="flex items-center gap-1.5 opacity-40 mt-4">
                            <RotateCcw className="w-3 h-3 text-[#BFA88F]" />
                            <span className="text-[8px] md:text-[9px] text-[#BFA88F] font-sans tracking-[0.18em] uppercase">
                                Tap to flip back
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const WhatWeDo = ({ progress }) => {
    const scrollRef = useRef(null);
    const [constraints, setConstraints] = useState({ start: 0, end: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
    const isDragging = useRef(false);

    React.useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const xTarget = useMotionValue(0);

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

                    const currentProgress = progress.get();
                    const targetPx = titlePos + currentProgress * (lastCardPos - titlePos);
                    xTarget.set(targetPx);
                }
            }
        };

        calculateScroll();
        const timer = setTimeout(calculateScroll, 100);
        window.addEventListener("resize", calculateScroll);
        return () => {
            window.removeEventListener("resize", calculateScroll);
            clearTimeout(timer);
        };
    }, [xTarget, progress]);

    useMotionValueEvent(progress, "change", (v) => {
        const rawIndex = Math.round(v * services.length);
        const clampedIndex = Math.min(Math.max(rawIndex, 0), services.length);
        setCurrentIndex(clampedIndex);
        const targetPx = constraints.start + v * (constraints.end - constraints.start);
        xTarget.set(targetPx);
    });

    const springX = useSpring(xTarget, {
        damping: 28,
        stiffness: 140,
        mass: 0.8,
        restDelta: 0.5,
    });

    const motionX = isMobile ? xTarget : springX;

    const handleNav = (dir) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const sectionStart = 0.19;
        const sectionEnd = 0.23;
        const step = 1 / services.length;

        let nextIndex;
        if (dir === "next") {
            if (currentIndex >= services.length) {
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

        setCurrentIndex(nextIndex);

        const targetGlobal = sectionStart + (nextIndex * step * (sectionEnd - sectionStart));
        const targetScroll = targetGlobal * totalHeight;
        if (window.lenis) {
            window.lenis.scrollTo(targetScroll, { duration: 1.0, force: true });
        } else {
            window.scrollTo({ top: targetScroll, behavior: "smooth" });
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

            {/* Horizontal Carousel */}
            <motion.div
                ref={scrollRef}
                style={{ x: motionX, willChange: "transform" }}
                className="flex gap-4 sm:gap-6 md:gap-20 px-4 sm:px-6 md:px-[10vw] relative z-10 w-max"
                onDragStart={() => { isDragging.current = true; }}
                onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 50); }}
            >
                {/* Intro Block */}
                <div className="flex-shrink-0 w-[160px] sm:w-[220px] md:w-[400px] flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl md:text-8xl font-black text-black leading-[0.85] tracking-tighter uppercase mb-3 sm:mb-5 md:mb-12">
                        <span className="block md:hidden">Our <br /> Craft</span>
                        <span className="hidden md:block">What <br /> We <br /> Do?</span>
                    </h2>
                    <p className="text-black/60 font-medium text-[8px] md:text-sm uppercase tracking-widest border-l-2 md:border-l-4 border-black pl-3 md:pl-8 max-w-[140px] sm:max-w-[180px] md:max-w-xs font-sans leading-snug" style={{ textWrap: "pretty" }}>
                        Luxury spatial design companions. We don't just build, we curate{"\u00A0"}experiences.
                    </p>
                </div>

                {/* Service Cards */}
                {services.map((service, i) => (
                    <FlipCard
                        key={service.code}
                        service={service}
                        index={i}
                        isDragging={isDragging}
                    />
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

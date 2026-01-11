import React, { useRef } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
    { title: "MODULAR KITCHENS", code: "MK-01", image: "/whatwedo/mk.jpg" },
    { title: "RESIDENTIAL INTERIORS", code: "RI-02", image: "/whatwedo/res.jpg" },
    { title: "SPACE OPTIMISATION", code: "SO-03", image: "/whatwedo/space.png" },
    { title: "TURNKEY EXECUTION", code: "TE-04", image: "/whatwedo/turkey.jpg" },
    { title: "PROJECT MANAGEMENT", code: "PM-05", image: "/whatwedo/project-management.jpg" },
    { title: "MATERIAL SOURCING", code: "MS-06", image: "/whatwedo/material.jpg" },
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
    const [constraints, setConstraints] = React.useState({ start: 0, end: 0 });

    React.useEffect(() => {
        const calculateScroll = () => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const fullWidth = container.scrollWidth;
                const viewportW = window.innerWidth;

                // Container Padding Info
                const style = window.getComputedStyle(container);
                const paddingLeft = parseFloat(style.paddingLeft);
                const paddingRight = parseFloat(style.paddingRight);

                // 1. Calculate START position (Title Centered - "Default Place")
                const introBlock = container.firstElementChild;
                const introWidth = introBlock.offsetWidth;
                const titlePos = (viewportW / 2) - (paddingLeft + (introWidth / 2));

                // 2. Calculate END position (Last Card Centered)
                const lastCard = container.lastElementChild;
                if (lastCard) {
                    const lastCardWidth = lastCard.offsetWidth;
                    const distanceToCenterOfLastCard = fullWidth - paddingRight - (lastCardWidth / 2);
                    const lastCardPos = -(distanceToCenterOfLastCard - (viewportW / 2));

                    // First to Last: Start = Title, End = Last Card
                    setConstraints({ start: titlePos, end: lastCardPos });
                }
            }
        };

        calculateScroll();
        window.addEventListener("resize", calculateScroll);
        return () => window.removeEventListener("resize", calculateScroll);
    }, []);

    // 4. MOTION: Start at Title (Default) and move to Last Card
    const x = useTransform(progress, [0, 1], [`${constraints.start}px`, `${constraints.end}px`]);

    return (
        <div className="relative h-screen bg-[#FBF2C0] flex items-center overflow-hidden font-serif">
            {/* Background Large Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                <h2 className="text-[40vw] font-black text-black uppercase">Atélia</h2>
            </div>

            <FloatingSketches progress={progress} />

            <motion.div ref={scrollRef} style={{ x, willChange: "transform" }} className="flex gap-6 md:gap-20 px-4 md:px-[10vw] relative z-10 w-max">
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
                            {/* Image */}
                            <img
                                src={service.image}
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover brightness-90 md:brightness-[0.7] group-hover:brightness-100 group-hover:scale-110 transition-all duration-[1.2s] ease-out"
                                style={{ willChange: "transform, filter" }}
                                alt={service.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                                <span className="text-[10px] md:text-xs text-[#FFEA00] font-black tracking-[0.2em] mb-2 block">
                                    {service.code.replace("-", " - ")}
                                </span>
                                <h3 className="text-xl md:text-3xl font-serif font-medium text-white leading-[1.05] mb-4 md:mb-6 group-hover:text-[#FFEA00] transition-colors">
                                    {service.title}
                                </h3>

                                <div className="flex items-center gap-3 group/btn cursor-pointer">
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-[#FFEA00] transition-all duration-500 flex items-center justify-center group-hover:border-[#FFEA00] border border-white/20">
                                        <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 text-white group-hover/btn:text-black transition-transform duration-500 group-hover/btn:rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Closing Block Removed */}
            </motion.div>

            {/* Performance Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <style>{`
                .outline-text {
                    -webkit-text-stroke: 2px black;
                }
                @media (min-width: 1024px) {
                    .outline-text {
                        -webkit-text-stroke: 3px black;
                    }
                }
            `}</style>
        </div>
    );
};

export default WhatWeDo;

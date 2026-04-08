import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../lib/utils";
import onlineConsultionImg from "../assets/howwedo/online-consulting.jpg";
import explorationDesignImg from "../assets/howwedo/exploration-design.jpg";
import siteFeasibilityImg from "../assets/howwedo/site_feasibility.png";
import quotationScopeImg from "../assets/howwedo/quotation_and_scope.jpg";
import executionImg from "../assets/howwedo/Execution.png";
import postDeliveryImg from "../assets/howwedo/post_delivery.jpg";

const items = [
    {
        title: "Online Consultation",
        description: "Understanding lifestyle, budget, space constraints, and expectations.",
        image: onlineConsultionImg,
        tag: "Phase 01 // Inception",
    },
    {
        title: "Design & Layout Exploration",
        description: "We provide two unique layout options that focus on functionality, storage, and flow—before commitment.",
        image: explorationDesignImg,
        tag: "Phase 02 // Drafting",
    },
    {
        title: "Site Visit",
        description: "Detailed measurements, feasibility checks, and technical alignment.",
        image: siteFeasibilityImg,
        tag: "Phase 03 // Validation",
    },
    {
        title: "Quotation & Scope Finalisation",
        description: "Clear pricing, defined timelines, no vague promises.",
        image: quotationScopeImg,
        tag: "Phase 04 // Protocol",
    },
    {
        title: "Execution & Project Management",
        description: "Design, coordination, execution—all handled seamlessly.",
        image: executionImg,
        tag: "Phase 05 // Action",
    },
    {
        title: "Post-Delivery Care",
        description: "Support even after handover. Because good design doesn’t end at delivery.",
        image: postDeliveryImg,
        tag: "Phase 06 // Heritage",
    },
];

const HowWeDoIt = ({ progress }) => {
    const [cards, setCards] = useState(items);
    const lockRef = useRef(false);

    // Cinematic entrance transforms driven by scroll progress
    const headerY = useTransform(progress, [0, 0.2], [50, 0]);
    const headerOpacity = useTransform(progress, [0, 0.2], [0, 1]);

    const contentY = useTransform(progress, [0.1, 0.4], [100, 0]);
    const contentOpacity = useTransform(progress, [0.1, 0.3], [0, 1]);
    const contentScale = useTransform(progress, [0.1, 0.4], [0.95, 1]);

    const handleCardReveal = () => {
        if (lockRef.current) return;
        lockRef.current = true;

        setCards((prev) => {
            const newCards = [...prev];
            const swipedCard = newCards.shift();
            return [...newCards, swipedCard];
        });

        // Cooldown to prevent skipping cards during fast gestures or reload-induced double events
        setTimeout(() => {
            lockRef.current = false;
        }, 800);
    };

    return (
        <motion.div
            className="relative w-full h-full bg-[#2E2E2E] overflow-hidden"
        >
            {/* Header Section: Adjusted to clear fixed menu button on mobile */}
            <motion.div
                style={{ y: headerY, opacity: headerOpacity }}
                className="absolute top-20 left-4 sm:top-24 sm:left-6 md:top-12 md:left-24 z-50 pointer-events-none"
            >
                <span className="text-[9px] md:text-[10px] font-black tracking-[0.6em] text-[#D2B68A] uppercase italic mb-1 md:mb-2 block opacity-40">The Methodology</span>
                <h2 className="text-xl sm:text-2xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.8]">
                    THE <span className="text-transparent outline-text">PATH.</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
                className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full h-full px-4 sm:px-6 md:px-24 gap-4 md:gap-12 pt-28 sm:pt-32 md:pt-0 pb-16 sm:pb-20 md:pb-0"
            >
                {/* Information Content: Moved UP on mobile to avoid CTA collision */}
                <div className="w-full md:w-3/5 flex flex-col justify-center min-h-[160px] md:h-auto order-1 md:order-1 mb-4 md:mb-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={cards[0].title}
                            initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-3 md:space-y-8"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] text-[#D2B68A] uppercase italic bg-black/20 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/5">
                                    {cards[0].tag}
                                </span>
                            </div>

                            <h2 className="text-xl sm:text-2xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95] max-w-2xl">
                                {cards[0].title.split(' & ').map((part, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <span className="text-white/20 italic font-light mx-2">&</span>}
                                        {part}
                                    </React.Fragment>
                                ))}
                            </h2>

                            <p className="text-[12px] sm:text-[13px] md:text-3xl text-white/50 font-serif italic leading-[1.3] max-w-xl border-l-2 border-[#D2B68A]/30 pl-3 sm:pl-4 md:pl-10">
                                {cards[0].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT SIDE: Minimized Card Stack */}
                <div className="w-full md:w-2/5 flex flex-col items-center justify-center relative mt-2 md:mt-20 md:pb-32 order-2 md:order-2">
                    {/* Progress Dots: Hidden on mobile to save space */}
                    <div className="absolute top-0 right-0 md:-right-12 flex flex-col gap-2 z-50 hidden md:flex">
                        {items.map((_, i) => {
                            const isActive = cards[0].title === items[i].title;
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: isActive ? 24 : 6,
                                        backgroundColor: isActive ? "#D2B68A" : "rgba(255,255,255,0.1)"
                                    }}
                                    className="w-1.5 rounded-full transition-colors duration-500"
                                />
                            );
                        })}
                    </div>

                    <div className="relative w-52 h-72 sm:w-60 sm:h-80 md:w-72 md:h-96 flex items-center justify-center">
                        {/* Visual Haptic */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">
                            <motion.div
                                animate={{
                                    x: [-20, 20, -20],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                className="w-10 h-10 rounded-full border border-[#D2B68A]/30 flex items-center justify-center"
                            >
                                <div className="w-1 h-1 rounded-full bg-[#D2B68A]" />
                            </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                            {cards.slice(0, 4).map((card, index) => (
                                <Card
                                    key={card.title}
                                    card={card}
                                    index={index}
                                    total={cards.length}
                                    items={items}
                                    topCardTitle={cards[0].title}
                                    handleCardReveal={handleCardReveal}
                                    isFirstCard={card.title === items[0].title}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            <style>{`
                .outline-text { -webkit-text-stroke: 1.2px rgba(255,255,255,0.4); }
            `}</style>
        </motion.div>
    );
};

const Card = ({ card, index, total, items, topCardTitle, handleCardReveal, isFirstCard }) => {
    const isTop = index === 0;
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const isFinalPhase = topCardTitle === items[items.length - 1].title;
    const rotate = useTransform(x, [-200, 200], [-20, 20]);

    const zigZagX = isFinalPhase ? 0 : (index % 2 === 0 ? 1 : -1) * (index * 12);
    const rotateOffset = isFinalPhase ? 0 : (index % 2 === 0 ? 1 : -1) * (index * 2) + (index * 1.5);
    const scale = 1 - index * 0.04;
    const yOffset = isFinalPhase ? (index * 4) : (index * 10);

    return (
        <motion.div
            key={card.title}
            style={{
                x: isTop ? x : zigZagX,
                y: isTop ? y : yOffset,
                rotate: isTop ? rotate : rotateOffset,
                zIndex: total - index,
                willChange: "transform, opacity, rotate"
            }}
            drag={isTop}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.9}
            onDragEnd={(event, info) => {
                const isMobile = window.innerWidth < 768;
                const swipeThreshold = isMobile ? 80 : 120;
                const velocityThreshold = isMobile ? 400 : 600;

                if (
                    Math.abs(info.offset.x) > swipeThreshold ||
                    Math.abs(info.offset.y) > swipeThreshold ||
                    Math.abs(info.velocity.x) > velocityThreshold ||
                    Math.abs(info.velocity.y) > velocityThreshold
                ) {
                    handleCardReveal();
                } else {
                    x.set(0);
                    y.set(0);
                }
            }}
            onTap={() => {
                if (isTop) handleCardReveal();
            }}
            whileHover={isTop ? {
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            } : {}}
            whileTap={isTop ? {
                scale: 0.94,
                y: 5,
                transition: { type: "spring", stiffness: 600, damping: 20 }
            } : {}}
            animate={{
                scale,
                x: isTop ? x.get() : zigZagX,
                opacity: index > 2 ? 0 : 1,
                y: isTop ? y.get() : yOffset,
                rotate: isTop ? rotate.get() : rotateOffset,
                transition: { type: "spring", stiffness: 400, damping: 35 }
            }}
            exit={{
                x: x.get() >= 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.5,
                rotate: x.get() >= 0 ? 45 : -45,
                transition: { duration: 0.4 }
            }}
            className={cn(
                "absolute inset-0 bg-[#1a1a1a] p-2.5 md:p-3 rounded-[1.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 cursor-grab active:cursor-grabbing transform-gpu overflow-hidden",
                isTop ? "pointer-events-auto border-[#D2B68A]/30" : "pointer-events-none"
            )}
        >
            <div className="relative h-[80%] w-full overflow-hidden rounded-[1rem]">
                <img
                    src={card.image}
                    alt={card.title}
                    className="pointer-events-none h-full w-full object-cover"
                />

                {/* TUTORIAL OVERLAY: Only on the first card, at the very top */}
                {isFirstCard && isTop && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] pointer-events-none"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="flex flex-col items-center gap-3 px-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-full border-2 border-[#D2B68A] flex items-center justify-center">
                                <motion.div
                                    animate={{ x: [-10, 10, -10] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="w-2 h-2 rounded-full bg-[#D2B68A]"
                                />
                            </div>
                            <p className="text-[10px] md:text-[11px] text-white font-black uppercase tracking-[0.2em] leading-tight">
                                Drag & drop or touch <br /> to reveal next phase
                            </p>
                        </motion.div>
                    </motion.div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
            </div>

            <div className="mt-3 md:mt-4">
                <h3 className="text-xs md:text-sm font-black text-white/40 uppercase tracking-widest leading-none">
                    {card.tag.split(' // ')[1]}
                </h3>
            </div>
        </motion.div>
    );
};

export default HowWeDoIt;

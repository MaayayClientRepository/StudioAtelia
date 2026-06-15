import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "../lib/utils";
import onlineConsultionImg from "../assets/howwedo/online-consulting.jpg";
import explorationDesignImg from "../assets/howwedo/exploration-design.jpg";
import siteFeasibilityImg from "../assets/howwedo/site_feasibility.png";
import quotationScopeImg from "../assets/howwedo/quotation_and_scope.jpg";
import executionImg from "../assets/howwedo/Execution.png";
import postDeliveryImg from "../assets/howwedo/post_delivery.jpg";

const preventOrphan = (text) => {
    if (typeof text !== "string") return text;
    const trimmed = text.trim();
    const lastSpaceIndex = trimmed.lastIndexOf(" ");
    if (lastSpaceIndex === -1) return trimmed;
    return trimmed.substring(0, lastSpaceIndex) + "\u00A0" + trimmed.substring(lastSpaceIndex + 1);
};

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
    const [isMobile, setIsMobile] = useState(false);
    const [isInteractive, setIsInteractive] = useState(false);

    useMotionValueEvent(progress, "change", (latest) => {
        setIsInteractive(latest >= 0.45);
    });

    React.useEffect(() => {
        setIsInteractive(progress.get() >= 0.45);
    }, [progress]);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Cinematic entrance transforms driven by scroll progress
    const headerY = useTransform(progress, [0, 0.2], [50, 0]);
    const headerOpacity = useTransform(progress, [0, 0.2], [0, 1]);
    const titleX = useTransform(progress, [0, 0.25], ["0vw", isMobile ? "55vw" : "0vw"]);

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
            className="relative w-full h-full bg-[#121212] overflow-hidden"
        >
            {/* Header Section: Adjusted to clear fixed menu button on mobile */}
            <motion.div
                style={{ y: headerY, opacity: headerOpacity }}
                className="absolute top-20 left-4 md:top-12 md:left-24 z-50 pointer-events-none text-left"
            >
                <span className="text-[8px] md:text-[10px] font-black tracking-[0.5em] md:tracking-[0.6em] text-[#BFA88F] uppercase italic mb-0.5 md:mb-2 block opacity-40">The Methodology</span>
                <h2 className="text-lg md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                    THE <span className="text-transparent outline-text">PATH.</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
                className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full h-full px-5 md:px-24 2xl:px-36 gap-3 md:gap-12 2xl:gap-20 pt-[4.5rem] pb-4 md:pt-0 md:pb-0"
            >
                {/* Information Content */}
                <div className="w-full md:w-3/5 flex flex-col justify-center min-h-0 md:h-auto order-2 md:order-1 mb-1 md:mb-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={cards[0].title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-3 md:space-y-8"
                        >
                            <h2 className="text-xl sm:text-2xl md:text-7xl 2xl:text-8xl font-bold text-white tracking-tighter leading-[0.95] max-w-2xl 2xl:max-w-3xl">
                                {cards[0].title.split(' & ').map((part, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <span className="text-white/20 italic font-light mx-2">&</span>}
                                        {part}
                                    </React.Fragment>
                                ))}
                            </h2>

                             <p className="text-[14px] sm:text-[15px] md:text-2xl 2xl:text-3xl text-white/60 font-sans leading-relaxed max-w-xl 2xl:max-w-2xl border-l-2 border-[#BFA88F]/30 pl-3 sm:pl-4 md:pl-10 2xl:pl-12" style={{ textWrap: "pretty" }}>
                                {preventOrphan(cards[0].description)}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT SIDE: Minimized Card Stack */}
                <div className="w-full md:w-2/5 flex flex-col items-center justify-center relative -mt-6 md:mt-20 2xl:mt-10 pb-2 md:pb-32 2xl:pb-16 order-1 md:order-2">
                    {/* Progress Dots: Hidden on mobile to save space */}
                    <div className="absolute top-0 right-0 md:-right-12 flex flex-col gap-2 z-50 hidden md:flex">
                        {items.map((_, i) => {
                            const isActive = cards[0].title === items[i].title;
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: isActive ? 24 : 6,
                                        backgroundColor: isActive ? "#BFA88F" : "rgba(255,255,255,0.1)"
                                    }}
                                    className="w-1.5 rounded-full transition-colors duration-500"
                                />
                            );
                        })}
                    </div>

                    <div className="relative w-[210px] h-[270px] sm:w-56 sm:h-72 md:w-72 md:h-[420px] 2xl:w-[460px] 2xl:h-[620px] flex items-center justify-center">
                        {/* Visual Haptic */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">
                            <motion.div
                                animate={{
                                    x: [-20, 20, -20],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                className="w-10 h-10 rounded-full border border-[#BFA88F]/30 flex items-center justify-center"
                            >
                                <div className="w-1 h-1 rounded-full bg-[#BFA88F]" />
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
                                    isInteractive={isInteractive}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Tutorial Prompt (Positioned below the cards, clean and never blurs the card image) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isInteractive ? 1 : 0 }}
                        className="mt-6 flex flex-col items-center gap-2 pointer-events-none select-none"
                    >
                        {/* Bouncing arrow pointing down to the hint text */}
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-0.5"
                        >
                            <div className="w-px h-5 bg-gradient-to-b from-transparent to-[#BFA88F]/60" />
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="#BFA88F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </motion.div>
                        <p className="text-[9px] text-white/40 font-medium tracking-[0.2em] uppercase text-center leading-tight">
                            Swipe or click top card to reveal next phase
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <style>{`
                .outline-text { -webkit-text-stroke: 1.2px rgba(255,255,255,0.4); }
            `}</style>
        </motion.div>
    );
};

const Card = ({ card, index, total, items, topCardTitle, handleCardReveal, isFirstCard, isInteractive }) => {
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
            drag={isTop && isInteractive}
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
                if (isTop && isInteractive) handleCardReveal();
            }}
            whileHover={isTop && isInteractive ? {
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            } : {}}
            whileTap={isTop && isInteractive ? {
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
                "absolute inset-0 bg-[#161616] p-2.5 md:p-3 2xl:p-5 rounded-[1.5rem] 2xl:rounded-[2.2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 cursor-grab active:cursor-grabbing transform-gpu overflow-hidden touch-none",
                (isTop && isInteractive) ? "pointer-events-auto border-[#BFA88F]/30" : "pointer-events-none"
            )}
        >
            <div className="relative h-[68%] w-full overflow-hidden rounded-[1rem] 2xl:rounded-[1.5rem]">
                <img
                    src={card.image}
                    alt={card.title}
                    className="pointer-events-none h-full w-full object-cover will-change-transform"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
            </div>

            <div className="mt-2 md:mt-3 2xl:mt-5 flex flex-col gap-0.5 md:gap-1 2xl:gap-2 text-center">
                <div className="flex justify-center items-center border-b border-white/5 pb-1 mb-0.5 md:pb-1 md:mb-1 2xl:pb-1.5 2xl:mb-1.5">
                    <span className="text-[9px] md:text-[10px] 2xl:text-[12px] font-sans font-bold tracking-[0.2em] text-[#BFA88F] uppercase">
                        {card.tag.split(' // ')[0]}
                    </span>
                </div>
                <h3 className="text-[18px] sm:text-[22px] md:text-[26px] 2xl:text-[34px] font-bold text-white tracking-tight leading-tight text-center">
                    {card.tag.split(' // ')[1]}
                </h3>
            </div>
        </motion.div>
    );
};

export default HowWeDoIt;

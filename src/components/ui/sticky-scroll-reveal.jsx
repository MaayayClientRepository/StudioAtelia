import React, { useRef, useState } from "react";
import { useScroll, motion, useMotionValueEvent, AnimatePresence, useTransform } from "framer-motion";

export const StickyScroll = ({ content, progress }) => {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef(null);

    const { scrollYProgress: internalScroll } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const activeProgress = progress || internalScroll;
    const cardLength = content.length;

    useMotionValueEvent(activeProgress, "change", (latest) => {
        const index = Math.min(
            Math.floor(latest * cardLength),
            cardLength - 1
        );
        if (index !== activeCard && index >= 0) {
            setActiveCard(index);
        }
    });

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex flex-col md:flex-row md:px-24"
        >
            {/* MOBILE & DESKTOP: STICKY IMAGE CONTAINER
                - Mobile: Absolute at top, takes 38% height.
                - Desktop: Sticky right half, takes full height.
            */}
            <div className="absolute top-0 left-0 right-0 h-[40vh] md:relative md:w-1/2 md:h-screen md:sticky md:top-0 flex items-center justify-end overflow-hidden z-0 md:order-2">
                <div className="relative w-full h-full md:w-[95%] md:aspect-[16/8] md:rounded-[1.5rem] md:h-auto overflow-hidden md:shadow-[0_0_80px_rgba(0,0,0,0.5)] md:border md:border-white/5 bg-neutral-900 md:border-[#D2B68A]/10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCard}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2E2E2E] via-transparent to-black/40 z-10 md:from-black/80 md:via-black/20 md:to-transparent" />
                            {content[activeCard].content}
                        </motion.div>
                    </AnimatePresence>

                    {/* Metadata Label - Desktop Only or refined Mobile */}
                    <motion.div
                        key={`label-${activeCard}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-4 left-6 md:bottom-6 md:left-8 z-20"
                    >
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#D2B68A] mb-1 font-black italic">Sequence 0{activeCard + 1}</p>
                        <h3 className="hidden md:block text-sm font-serif italic text-white/90 leading-none">Studio Atélia</h3>
                    </motion.div>
                </div>
            </div>

            {/* TEXT CONTAINER
                - Mobile: Full width, padded top to clear image.
                - Desktop: Left half, normal flow.
            */}
            <div className="relative w-full md:w-1/2 h-full overflow-hidden z-10 md:order-1 px-6 md:px-0 pointer-events-none md:pointer-events-auto">
                <motion.div
                    className="relative w-full"
                    style={{
                        y: progress ? useTransform(activeProgress, [0, 1], ["0vh", `-${(cardLength - 1) * 100}vh`]) : 0,
                    }}
                >
                    {content.map((item, index) => (
                        <StickyScrollItem
                            key={index}
                            item={item}
                            index={index}
                            cardLength={cardLength}
                            activeProgress={activeProgress}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const StickyScrollItem = ({ item, index, cardLength, activeProgress }) => {
    const isLast = index === cardLength - 1;
    const isFirst = index === 0;

    const segmentSize = 1 / cardLength;
    const start = index * segmentSize;
    const mid = start + segmentSize / 2;
    const end = (index + 1) * segmentSize;

    // Fixed Opacity Logic
    const opacityInput = isFirst
        ? [0, 0.05, mid, end - 0.05, end + 0.05]
        : isLast
            ? [start - 0.05, start + 0.05, mid, 1.0]
            : [start - 0.05, start + 0.05, mid, end - 0.05, end + 0.05];

    const opacityOutput = isFirst
        ? [1, 1, 1, 1, 0]
        : isLast
            ? [0, 1, 1, 1]
            : [0, 1, 1, 1, 0];

    const itemOpacity = useTransform(activeProgress, opacityInput, opacityOutput);
    const itemScale = useTransform(activeProgress, [start - 0.05, mid, end + 0.05], [0.95, 1, 0.95]);

    return (
        <div className="h-screen flex flex-col justify-end pb-[25vh] md:justify-center md:pb-0 md:pt-0 transform-gpu">
            <motion.div
                style={{
                    opacity: itemOpacity,
                    scale: itemScale,
                    willChange: "opacity, transform"
                }}
                className="max-w-xl md:pr-12 pointer-events-auto bg-black/50 md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none shadow-2xl md:shadow-none"
            >
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#D2B68A] font-black italic">
                    {item.tag || `Step 0${index + 1}`}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-white leading-[1.1] tracking-tighter mt-2 mb-3 md:mt-4 md:mb-6">
                    {item.title}
                </h2>
                <p className="text-sm md:text-lg text-white/90 font-light leading-relaxed max-w-sm md:max-w-lg">
                    {item.description}
                </p>

                {item.details && (
                    <ul className="mt-8 flex flex-col gap-3">
                        {item.details.map((detail, di) => (
                            <li key={di} className="text-[10px] uppercase tracking-[0.4em] text-[#D2B68A]/60 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D2B68A]/40" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </div>
    );
};

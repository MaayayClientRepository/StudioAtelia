import React, { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * WhyUs Component: The Brand Philosophy
 * Theme: "Moodboard Cream" - inspired by the current beige design injection.
 * Typography: Playfair Display + Reactive Word Reveal
 */
const FloatingSketches = ({ progress }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Chair Sketch */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [150, -150]),
                    rotate: useTransform(progress, [0, 1], [-5, 15]),
                    opacity: 0.1,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[10%] left-[8%] w-48 h-48 text-black"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M7 20v-5h10v5M7 15V4h10v11M5 15h14" />
                <path d="M9 10h6M9 7h6" />
            </motion.svg>

            {/* Wardrobe Sketch */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [100, -100]),
                    rotate: useTransform(progress, [0, 1], [20, -20]),
                    opacity: 0.08,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[60%] right-[12%] w-32 h-32 text-black"
                viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"
            >
                <circle cx="50" cy="50" r="10" />
                <path d="M50,15 L50,40 M85,50 L60,50 M50,85 L50,60 M15,50 L40,50" />
            </motion.svg>

            {/* Sofa Sketch */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [400, -200]),
                    rotate: useTransform(progress, [0, 1], [-5, 10]),
                    opacity: 0.08,
                    willChange: "transform, opacity"
                }}
                className="absolute top-[75%] left-[25%] w-64 h-32 text-black"
                viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.5"
            >
                <path d="M10,20 L10,40 M90,20 L90,40 M10,35 L90,35 M20,20 L20,35 M80,20 L80,35 M20,25 L80,25" />
                <path d="M10,20 Q50,15 90,20" />
            </motion.svg>

            {/* Scribble Element */}
            <motion.svg
                style={{
                    y: useTransform(progress, [0, 1], [250, -250]),
                    rotate: useTransform(progress, [0, 1], [0, 45]),
                    opacity: 0.12,
                    willChange: "transform, opacity"
                }}
                className="absolute bottom-[15%] left-[15%] w-40 h-40 text-black"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"
            >
                <path d="M12 22V12M12 12L8 8M12 12L16 8M8 8C6 8 4 10 4 12M16 8C18 8 20 10 20 12" />
            </motion.svg>
        </div>
    );
};

const IndividualWord = ({ word, progress, wordStart, wordEnd }) => {
    const opacity = useTransform(progress, [wordStart, wordEnd], [0, 1], { clamp: true });
    const blurValue = useTransform(progress, [wordStart, wordEnd], [8, 0], { clamp: true });
    const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
    const y = useTransform(progress, [wordStart, wordEnd], [10, 0], { clamp: true });

    return (
        <motion.span
            style={{
                opacity,
                filter,
                y,
                display: "inline-block",
                willChange: "transform, opacity, filter"
            }}
            className="mr-[0.3em]"
        >
            {word}
        </motion.span>
    );
};

const WordReveal = ({ text, progress, range, className }) => {
    const words = text.split(" ");
    const totalWords = words.length;

    return (
        <div className={className}>
            {words.map((word, i) => {
                const wordStep = (range[1] - range[0]) / totalWords;
                const wordStart = range[0] + (i * wordStep);
                const wordEnd = Math.min(range[1], wordStart + (wordStep * 3));

                return (
                    <IndividualWord
                        key={i}
                        word={word}
                        progress={progress}
                        wordStart={wordStart}
                        wordEnd={wordEnd}
                    />
                );
            })}
        </div>
    );
};

const WhyUs = ({ progress }) => {
    // 7. SLOW FADE Logic: Start fading earlier to make it feel expensive
    const titleOpacity = useTransform(progress, [0, 0.1], [0, 1]); // Fast title reveal on entrance
    const titleBlurValue = useTransform(progress, [0, 0.1], [8, 0]);
    const titleFilter = useTransform(titleBlurValue, (v) => `blur(${v}px)`);
    const titleY = useTransform(progress, [0, 0.1], [30, 0]);

    // philosophyOpacity: Focus on the text area
    // Now holds until progress 1.0 (CTA centering)
    const philosophyOpacity = useTransform(progress, [0.1, 0.2, 1.0, 1.1], [0, 1, 1, 0]);

    // formOpacity: Fades in ONLY AFTER philosophy and CTA are settled
    const formOpacity = useTransform(progress, [1.1, 1.4], [0, 1]);
    
    // TWO PHASE TRANSFORM:
    // 1. Entrance: Zoom out and Settle (1.1 -> 1.4)
    const formY = useTransform(progress, [1.1, 1.4], [80, -80]); // Slightly lower settle point for better balance
    const formScale = useTransform(progress, [1.1, 1.4], [1.15, 1]); 

    const sketchOpacity = useTransform(progress, [1.2, 1.4], [0.1, 0]);

    const phrase1 = "At Niche & Form Design Studio, we believe good design starts long before colours and finishes come into play. We take the time to understand how you live, move, and use your space—because a home should work beautifully.";
    const phrase2 = "Our approach is rooted in thoughtful planning, smart layouts, and practical storage, paired with a refined, modern aesthetic that feels elegant without being excessive.";
    const phrase3 = "We focus on clarity, honesty, and end-to-end execution, right from concept and layout options to on-site coordination. The result is a space that feels intentional, personal, and built to last.";

    return (
        <div className="relative h-screen bg-secondary overflow-hidden flex items-center justify-center font-serif text-[#1a1a1a]">

            {/* BACKGROUND: Drawing Texture & Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <motion.div style={{ opacity: sketchOpacity }}>
                <FloatingSketches progress={progress} />
            </motion.div>

            {/* PHILOSOPHY TEXT WRAPPER */}
            <motion.div
                style={{ opacity: philosophyOpacity }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 pt-16 sm:pt-12 pb-24 sm:pb-32"
            >
                <div className="max-w-4xl w-full flex flex-col items-center gap-4 md:gap-10">
                    <motion.div style={{ opacity: titleOpacity, filter: titleFilter, y: titleY }} className="text-center">
                        <span className="text-[10px] sm:text-[12px] font-sans font-black tracking-[0.4em] sm:tracking-[0.6em] text-black/30 uppercase mb-2 sm:mb-4 block">Our Philosophy</span>
                        <h2 className="text-5xl sm:text-6xl md:text-[7rem] font-serif text-black leading-[0.9] font-bold tracking-tighter">
                            Why <span className="italic font-black">Us?</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-3 md:space-y-6 flex flex-col items-center">
                        <WordReveal
                            text={phrase1}
                            progress={progress}
                            range={[0.3, 0.5]}
                            className="text-xs sm:text-sm md:text-2xl leading-[1.6] md:leading-[1.7] max-w-3xl text-black/90 text-center font-serif italic"
                        />
                        <WordReveal
                            text={phrase2}
                            progress={progress}
                            range={[0.55, 0.75]}
                            className="text-xs sm:text-sm md:text-2xl leading-[1.6] md:leading-[1.7] max-w-3xl text-black/90 text-center font-serif italic"
                        />
                        <WordReveal
                            text={phrase3}
                            progress={progress}
                            range={[0.8, 1.0]}
                            className="text-xs sm:text-sm md:text-2xl leading-[1.6] md:leading-[1.7] max-w-3xl text-black/90 text-center font-serif italic"
                        />
                    </div>
                </div>
            </motion.div>

            {/* CONTACT FORM — Mobile-first, full viewport on small screens */}
            <motion.div
                style={{
                    opacity: formOpacity,
                    pointerEvents: useTransform(progress, (v) => v > 1.1 ? "auto" : "none"),
                    willChange: "opacity"
                }}
                className="absolute inset-0 z-20 flex items-start md:items-center justify-center font-sans overflow-y-auto"
            >
                <motion.div 
                    style={{ y: formY, scale: formScale }}
                    className="w-full md:max-w-4xl min-h-screen md:min-h-0 md:h-auto flex flex-col md:flex-row bg-secondary/90 md:bg-secondary/80 backdrop-blur-3xl md:rounded-[2.5rem] overflow-hidden md:border md:border-black/10 md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] md:mx-4"
                >
                    
                    {/* LEFT PANEL — Compact header on mobile, tall side panel on desktop */}
                    <div className="md:w-2/5 px-6 py-8 sm:px-8 sm:py-10 md:p-14 bg-black flex flex-row md:flex-col items-center md:items-start justify-between md:justify-between text-secondary relative overflow-hidden">
                        {/* Huge Watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vw] md:text-[25vw] font-black opacity-[0.03] select-none pointer-events-none tracking-tighter">N&F</div>
                        
                        <div className="relative z-10">
                            <span className="text-[8px] sm:text-[9px] font-black tracking-[0.4em] sm:tracking-[0.5em] text-accent uppercase mb-1 sm:mb-3 block">Crafting Sanctuaries</span>
                            <h3 className="text-xl sm:text-2xl md:text-6xl font-serif font-black leading-[0.9] tracking-tighter italic">Start Your Project.</h3>
                        </div>

                        <div className="relative z-10 flex md:flex-col gap-6 sm:gap-8 md:gap-0 md:space-y-6">
                            <div className="hidden md:block border-t border-secondary/10 pt-8">
                                <div className="flex gap-12">
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-black tracking-widest text-[#D2B68A] uppercase">Office</p>
                                        <p className="text-[10px] font-light text-secondary/60">Bangalore, Ind.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-black tracking-widest text-[#D2B68A] uppercase">Email</p>
                                        <p className="text-[10px] font-light text-secondary/60">hello@nicheandform.com</p>
                                    </div>
                                </div>
                            </div>
                            {/* Mobile-only compact info */}
                            <div className="md:hidden flex items-center gap-1">
                                <span className="text-[8px] text-accent/60 font-black tracking-wider uppercase">Bangalore</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL — Full scrollable form */}
                    <div className="md:w-3/5 flex-1 px-6 py-8 sm:px-8 sm:py-8 md:p-10 flex flex-col justify-center relative bg-white/10">
                        <form className="space-y-6 sm:space-y-6 md:space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-6 md:gap-x-12 md:gap-y-8">
                                {/* Name Input */}
                                <div className="group">
                                    <label className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-black/30 uppercase group-focus-within:text-accent transition-colors block mb-2">Client</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-transparent border-b border-black/15 py-1.5 text-[15px] sm:text-lg md:text-lg font-serif text-black focus:outline-none focus:border-accent transition-colors placeholder:text-black/35 italic"
                                    />
                                </div>

                                {/* Contact Input */}
                                <div className="group">
                                    <label className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-black/30 uppercase group-focus-within:text-accent transition-colors block mb-2">Contact</label>
                                    <input
                                        type="tel"
                                        placeholder="WhatsApp / Phone"
                                        className="w-full bg-transparent border-b border-black/15 py-1.5 text-[15px] sm:text-lg md:text-lg font-serif text-black focus:outline-none focus:border-accent transition-colors placeholder:text-black/35 italic"
                                    />
                                </div>

                                {/* Project Type */}
                                <div className="group">
                                    <label className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-black/30 uppercase group-focus-within:text-accent transition-colors block mb-2">Service</label>
                                    <select className="w-full bg-transparent border-b border-black/15 py-1.5 text-[15px] sm:text-lg md:text-lg font-serif text-black focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer italic">
                                        <option className="bg-secondary" disabled selected>Nature of Project</option>
                                        <option className="bg-secondary">Luxury Apartment</option>
                                        <option className="bg-secondary">Modern Villa</option>
                                        <option className="bg-secondary">Bespoke Commercial</option>
                                        <option className="bg-secondary">Hospitality</option>
                                    </select>
                                </div>

                                {/* Timeline */}
                                <div className="group">
                                    <label className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-black/30 uppercase group-focus-within:text-accent transition-colors block mb-2">Timeline</label>
                                    <input
                                        type="text"
                                        placeholder="Looking to start in?"
                                        className="w-full bg-transparent border-b border-black/15 py-1.5 text-[15px] sm:text-lg md:text-lg font-serif text-black focus:outline-none focus:border-accent transition-colors placeholder:text-black/35 italic"
                                    />
                                </div>
                            </div>

                            {/* Brief Textarea */}
                            <div className="group">
                                <label className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-black/30 uppercase group-focus-within:text-accent transition-colors block mb-2">The Brief</label>
                                <textarea
                                    rows="1"
                                    placeholder="Tell us about your space..."
                                    className="w-full bg-transparent border-b border-black/15 py-1.5 text-[15px] sm:text-lg md:text-lg font-serif text-black focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-black/35 italic min-h-[40px] sm:min-h-[50px]"
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-2">
                                <motion.button
                                    whileHover={{ x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-4 sm:gap-6 group/btn"
                                >
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.8em] text-black group-hover/btn:text-accent transition-colors">Send Inquiry</span>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-black flex items-center justify-center text-accent group-hover/btn:scale-110 transition-transform shadow-2xl">
                                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    </div>
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>

            {/* Aesthetic Detail (Built to Last) */}
            <motion.div
                style={{ opacity: useTransform(progress, [1.3, 1.5], [0, 0.3]) }}
                className="absolute bottom-12 md:bottom-16 w-full text-center text-[10px] font-sans font-bold uppercase tracking-[0.6em] text-black/40 z-30"
            >
                Built to last • Niche & Form Design Studio
            </motion.div>

        </div>
    );
};

export default WhyUs;
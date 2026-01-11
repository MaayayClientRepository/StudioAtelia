import React, { useRef } from "react";
import { motion, useTransform } from "framer-motion";

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
    const titleOpacity = useTransform(progress, [0, 0.15], [0, 1]); // Slower title reveal
    const titleBlurValue = useTransform(progress, [0, 0.15], [8, 0]);
    const titleFilter = useTransform(titleBlurValue, (v) => `blur(${v}px)`);
    const titleY = useTransform(progress, [0, 0.15], [30, 0]);

    // philosophyOpacity: Fades out completely BEFORE form entrance (1.0 -> 1.5)
    const philosophyOpacity = useTransform(progress, [0, 0.05, 1.0, 1.5], [0, 1, 1, 0]);

    // formOpacity: Fades in ONLY AFTER philosophy is fully gone (1.5 -> 1.75)
    const formOpacity = useTransform(progress, [1.5, 1.75], [0, 1]);
    const formY = useTransform(progress, [1.5, 1.75], [30, -100]);

    const sketchOpacity = useTransform(progress, [1.6, 2.0], [0.1, 0]);

    const phrase1 = "At Studio Atélia, we believe good design starts long before colours and finishes come into play. We take the time to understand how you live, move, and use your space—because a home should work beautifully.";
    const phrase2 = "Our approach is rooted in thoughtful planning, smart layouts, and practical storage, paired with a refined, modern aesthetic that feels elegant without being excessive.";
    const phrase3 = "We focus on clarity, honesty, and end-to-end execution, right from concept and layout options to on-site coordination. The result is a space that feels intentional, personal, and built to last.";

    return (
        <div className="relative h-screen bg-[#FBF2C0] overflow-hidden flex items-center justify-center font-serif text-[#1a1a1a]">

            {/* BACKGROUND: Drawing Texture & Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <motion.div style={{ opacity: sketchOpacity }}>
                <FloatingSketches progress={progress} />
            </motion.div>

            {/* PHILOSOPHY TEXT WRAPPER */}
            <motion.div
                style={{ opacity: philosophyOpacity }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 pt-12 pb-32"
            >
                <div className="max-w-4xl w-full flex flex-col items-center gap-4 md:gap-10">
                    <motion.div style={{ opacity: titleOpacity, filter: titleFilter, y: titleY }} className="text-center">
                        <span className="text-[10px] font-sans font-black tracking-[0.5em] text-black/20 uppercase mb-3 block">Our Philosophy</span>
                        <h2 className="text-5xl md:text-8xl font-serif text-black leading-none font-bold">
                            Why <span className="italic">Us?</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-3 md:space-y-6 flex flex-col items-center">
                        <WordReveal
                            text={phrase1}
                            progress={progress}
                            range={[0.15, 0.45]}
                            className="text-xs md:text-xl leading-[1.6] md:leading-[1.8] max-w-2xl text-black/90 text-center font-serif italic"
                        />
                        <WordReveal
                            text={phrase2}
                            progress={progress}
                            range={[0.4, 0.7]}
                            className="text-xs md:text-xl leading-[1.6] md:leading-[1.8] max-w-2xl text-black/90 text-center font-serif italic"
                        />
                        <WordReveal
                            text={phrase3}
                            progress={progress}
                            range={[0.65, 0.9]}
                            className="text-xs md:text-xl leading-[1.6] md:leading-[1.8] max-w-2xl text-black/90 text-center font-serif italic"
                        />
                    </div>
                </div>
            </motion.div>

            {/* CONTACT FORM WRAPPER - Horizontal Layout */}
            <motion.div
                style={{
                    opacity: formOpacity,
                    y: formY,
                    pointerEvents: useTransform(progress, (v) => v > 1.5 ? "auto" : "none"),
                    willChange: "opacity, transform"
                }}
                className="absolute inset-0 z-20 container mx-auto px-4 md:px-6 flex items-center justify-center font-sans"
            >
                <div className="w-full max-w-4xl bg-[#FBF2C0] px-6 py-8 md:px-12 md:py-16 rounded-[1.5rem] md:rounded-[3rem] border-[1px] border-black/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                        {/* Title - Side aligned on desktop */}
                        <div className="md:w-1/4 text-center md:text-left pt-2">
                            <h3 className="text-xl md:text-5xl font-bold tracking-tighter leading-tight uppercase font-serif text-black">Get in <br className="hidden md:block" /><span className="italic font-light opacity-60">Touch</span></h3>
                            <div className="w-16 h-0.5 bg-[#D2B68A] mt-6 md:mt-10 hidden md:block" />
                            <p className="hidden md:block text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-black/40 mt-10 leading-relaxed">Let's craft your <br />ideal Sanctuary.</p>
                        </div>

                        <form className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-6 md:gap-y-10">
                            {/* Row 1: Triple Inputs */}
                            <div className="space-y-2 md:space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-black text-black/60 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-white/50 border border-black/10 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#D2B68A] focus:bg-white text-sm md:text-base transition-all placeholder:text-black/20 text-black font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-2 md:space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-black text-black/60 ml-1">Contact</label>
                                <input
                                    type="tel"
                                    placeholder="WhatsApp / Phone"
                                    className="w-full bg-white/50 border border-black/10 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#D2B68A] focus:bg-white text-sm md:text-base transition-all placeholder:text-black/20 text-black font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-2 md:space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-black text-black/60 ml-1">Project</label>
                                <select className="w-full bg-white/60 border border-black/10 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#D2B68A] focus:bg-white text-sm md:text-base transition-all appearance-none cursor-pointer text-black font-medium shadow-sm">
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>Office</option>
                                    <option>Commercial</option>
                                </select>
                            </div>

                            {/* Row 2: Message & Submit */}
                            <div className="md:col-span-2 space-y-2 md:space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-black text-black/60 ml-1">Brief</label>
                                <textarea
                                    rows="3"
                                    placeholder="Tell us about your space..."
                                    className="w-full bg-white/50 border border-black/10 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#D2B68A] focus:bg-white text-sm md:text-base transition-all resize-none placeholder:text-black/20 text-black font-medium shadow-sm min-h-[100px] md:min-h-[120px]"
                                ></textarea>
                            </div>

                            <div className="flex items-start pt-6 md:pt-8">
                                <motion.button
                                    whileHover={{ y: -2, scale: 1.01, backgroundColor: "#000" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-black text-[#D2B68A] py-2.5 md:py-3.5 rounded-lg md:rounded-xl font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-[11px] transition-all shadow-lg hover:shadow-[#D2B68A]/10"
                                >
                                    Send Inquiry
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>

            {/* Aesthetic Detail (Built to Last) */}
            <motion.div
                style={{ opacity: useTransform(progress, [1.3, 1.5], [0, 0.3]) }}
                className="absolute bottom-12 md:bottom-16 w-full text-center text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-black z-30"
            >
                Built to last • Studio Atélia
            </motion.div>

        </div>
    );
};

export default WhyUs;
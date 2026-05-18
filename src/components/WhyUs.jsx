import React, { useRef, useState } from "react";
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
    const y = useTransform(progress, [wordStart, wordEnd], [10, 0], { clamp: true });

    return (
        <motion.span
            style={{
                opacity,
                y,
                display: "inline-block",
                willChange: "transform, opacity"
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
    const [spaceType, setSpaceType] = useState("");
    // 7. SLOW FADE Logic: Start fading earlier to make it feel expensive
    const titleOpacity = useTransform(progress, [0, 0.1], [0, 1]); // Fast title reveal on entrance
    const titleY = useTransform(progress, [0, 0.1], [30, 0]);

    // philosophyOpacity: Focus on the text area
    // Now holds until progress 1.0 (CTA centering)
    const philosophyOpacity = useTransform(progress, [0.1, 0.2, 1.0, 1.2], [0, 1, 1, 0]);

    // formOpacity: Fades in ONLY AFTER philosophy and CTA are settled
    // Speed up slightly from 1.8 to 1.5 range
    const formOpacity = useTransform(progress, [1.2, 1.5], [0, 1]);
    
    // TWO PHASE TRANSFORM:
    // 1. Entrance: Zoom out and Settle (1.2 -> 1.5)
    const formY = useTransform(progress, [1.2, 1.5], [100, -60]); 
    const formScale = useTransform(progress, [1.2, 1.5], [1.1, 1]); 

    const sketchOpacity = useTransform(progress, [1.1, 1.25], [0.1, 0]);

    const phrase1 = "At Niche & Form Design Studio, we believe good design starts long before colours and finishes come into play. We take the time to understand how you live, move, and use your space—because a home should work beautifully.";
    const phrase2 = "Our approach is rooted in thoughtful planning, smart layouts, and practical storage, paired with a refined, modern aesthetic that feels elegant without being excessive.";
    const phrase3 = "We focus on clarity, honesty, and end-to-end execution, right from concept and layout options to on-site coordination. The result is a space that feels intentional, personal, and built to last.";

    return (
        <div className="relative h-screen bg-[#FBF2C0] overflow-hidden flex items-center justify-center font-sans text-black">

            {/* BACKGROUND: Drawing Texture & Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <motion.div style={{ opacity: sketchOpacity }}>
                <FloatingSketches progress={progress} />
            </motion.div>

            {/* PHILOSOPHY TEXT WRAPPER */}
            <motion.div
                style={{ opacity: philosophyOpacity }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-start pointer-events-none px-6 pt-[5vh] sm:pt-[7vh] pb-24"
            >
                <div className="max-w-6xl w-full flex flex-col items-center">
                    
                    {/* Persistent Heading - Stays at top */}
                    <motion.div 
                        style={{ 
                            opacity: useTransform(progress, [0, 0.1, 1.0, 1.15], [0, 1, 1, 0]),
                            y: titleY 
                        }} 
                        className="text-center space-y-2 sm:space-y-4 mb-[4vh] md:mb-[6vh]"
                    >
                        <span className="text-[10px] sm:text-[14px] font-sans font-extrabold tracking-[0.5em] sm:tracking-[0.8em] text-black/40 uppercase block">Our Philosophy</span>
                        <h2 className="text-4xl sm:text-7xl md:text-[9.5rem] font-serif text-black leading-[0.85] font-black tracking-tighter">
                            Why <span className="italic font-light text-black">Us?</span>
                        </h2>
                    </motion.div>

                    {/* Sequential Content Blocks - Moved up slightly */}
                    <div className="relative w-full h-[45vh] flex items-center justify-center">
                        
                        {/* Phrase 1 */}
                        <motion.div 
                            style={{ 
                                opacity: useTransform(progress, [0.12, 0.18, 0.38, 0.44], [0, 1, 1, 0]),
                                y: useTransform(progress, [0.12, 0.18, 0.38, 0.44], [30, 0, 0, -30])
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <WordReveal
                                text={phrase1}
                                progress={progress}
                                range={[0.15, 0.38]}
                                className="text-base sm:text-xl md:text-[2rem] lg:text-[2.25rem] leading-[1.45] md:leading-[1.6] text-black font-sans font-medium text-center tracking-tight max-w-4xl"
                            />
                        </motion.div>

                        {/* Phrase 2 */}
                        <motion.div 
                            style={{ 
                                opacity: useTransform(progress, [0.44, 0.5, 0.68, 0.74], [0, 1, 1, 0]),
                                y: useTransform(progress, [0.44, 0.5, 0.68, 0.74], [30, 0, 0, -30])
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <WordReveal
                                text={phrase2}
                                progress={progress}
                                range={[0.46, 0.68]}
                                className="text-base sm:text-xl md:text-[2rem] lg:text-[2.25rem] leading-[1.45] md:leading-[1.6] text-black font-sans font-medium text-center tracking-tight max-w-4xl"
                            />
                        </motion.div>

                        {/* Phrase 3 - Fades in and STOPS for breathing room */}
                        <motion.div 
                            style={{ 
                                opacity: useTransform(progress, [0.74, 0.8, 1.0, 1.15], [0, 1, 1, 0]),
                                y: useTransform(progress, [0.74, 0.8, 1.0, 1.15], [30, 0, 0, -30])
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <WordReveal
                                text={phrase3}
                                progress={progress}
                                range={[0.76, 0.98]}
                                className="text-base sm:text-xl md:text-[2rem] lg:text-[2.25rem] leading-[1.45] md:leading-[1.6] text-black font-sans font-medium text-center tracking-tight max-w-4xl"
                            />
                        </motion.div>

                    </div>
                </div>
            </motion.div>

            {/* CONTACT FORM — Redesigned for High-End Impact */}
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
                    className="w-full md:max-w-4xl min-h-screen md:min-h-0 md:h-[560px] flex flex-col md:flex-row bg-[#FBF2C0] md:rounded-[2.5rem] overflow-hidden md:border md:border-black/5 md:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] md:mx-6"
                >
                    
                    {/* LEFT PANEL — Architectural Branding */}
                    <div className="md:w-2/5 pt-24 pb-10 px-8 md:px-12 md:py-16 bg-black flex flex-col justify-between text-secondary relative overflow-hidden group/panel">
                        {/* Huge Watermark */}
                        <div className="absolute -top-6 -left-6 text-[40vw] md:text-[25vw] font-black opacity-[0.04] select-none pointer-events-none tracking-tighter leading-none font-serif">N</div>
                        <div className="absolute -bottom-6 -right-6 text-[40vw] md:text-[25vw] font-black opacity-[0.04] select-none pointer-events-none tracking-tighter leading-none font-serif italic">F</div>
                        
                        <div className="relative z-10 space-y-3 md:space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-8 bg-accent" />
                                <span className="text-[9px] font-black tracking-[0.5em] text-accent uppercase">Let's Connect</span>
                            </div>
                            <h3 className="text-2xl md:text-7xl font-serif font-black leading-[0.85] tracking-tighter italic">
                                Ready to <br />
                                <span className="text-accent not-italic">Build?</span>
                            </h3>
                            <p className="text-secondary/40 text-[10px] md:text-xs font-medium uppercase tracking-widest leading-relaxed max-w-[180px] md:max-w-none">
                                Transforming your vision into architectural reality.
                            </p>
                        </div>

                        <div className="relative z-10 pt-10 md:pt-0">
                            <div className="space-y-6 md:space-y-8 border-t border-white/10 pt-10">
                                <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-8">
                                    <div className="space-y-2 group/info cursor-pointer">
                                        <p className="text-[9px] font-black tracking-[0.3em] text-accent uppercase group-hover/info:translate-x-1 transition-transform">Location</p>
                                        <p className="text-xs md:text-sm font-sans text-secondary/80">Bangalore HQ — Karnataka, India.</p>
                                    </div>
                                    <div className="space-y-2 group/info cursor-pointer">
                                        <p className="text-[9px] font-black tracking-[0.3em] text-accent uppercase group-hover/info:translate-x-1 transition-transform">Digital</p>
                                        <p className="text-xs md:text-sm font-sans text-secondary/80 underline underline-offset-4 decoration-accent/30">hello@nicheandform.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL — Refined Form Grid */}
                    <div className="md:w-3/5 flex-1 px-8 pt-12 pb-10 md:px-12 md:pt-16 md:pb-12 flex flex-col justify-start relative bg-white/[0.02]">
                        <form className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                                {/* Name Input */}
                                <div className="group relative">
                                    <label className="text-[10px] font-black tracking-[0.4em] text-black/65 uppercase group-focus-within:text-accent transition-all block mb-4">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name / Organization"
                                        className="w-full bg-transparent border-b border-black/20 py-3 text-lg md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all placeholder:text-black/25 placeholder:italic"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>

                                {/* Contact Input */}
                                <div className="group relative">
                                    <label className="text-[10px] font-black tracking-[0.4em] text-black/65 uppercase group-focus-within:text-accent transition-all block mb-4">Communication</label>
                                    <input
                                        type="tel"
                                        placeholder="Email / WhatsApp"
                                        className="w-full bg-transparent border-b border-black/20 py-3 text-lg md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all placeholder:text-black/25 placeholder:italic"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>

                                {/* Project Type */}
                                <div className="group relative">
                                    <label className="text-[10px] font-black tracking-[0.4em] text-black/65 uppercase group-focus-within:text-accent transition-all block mb-4">Space Type</label>
                                    <select 
                                        value={spaceType}
                                        onChange={(e) => setSpaceType(e.target.value)}
                                        className={`w-full bg-transparent border-b border-black/20 py-3 text-lg md:text-xl font-sans focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer ${spaceType ? "text-black/85" : "text-black/30 italic"}`}
                                    >
                                        <option value="" className="bg-secondary" disabled>Nature of Inquiry</option>
                                        <option className="bg-secondary" value="residential">High-End Residential</option>
                                        <option className="bg-secondary" value="commercial">Boutique Commercial</option>
                                        <option className="bg-secondary" value="hospitality">Hospitality & Leisure</option>
                                        <option className="bg-secondary" value="interior">Bespoke Interior</option>
                                    </select>
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>

                                {/* Timeline */}
                                <div className="group relative">
                                    <label className="text-[10px] font-black tracking-[0.4em] text-black/65 uppercase group-focus-within:text-accent transition-all block mb-4">Timeframe</label>
                                    <input
                                        type="text"
                                        placeholder="Estimated Start Date"
                                        className="w-full bg-transparent border-b border-black/20 py-3 text-lg md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all placeholder:text-black/25 placeholder:italic"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>
                            </div>

                            {/* Brief Textarea */}
                            <div className="group relative">
                                <label className="text-[10px] font-black tracking-[0.4em] text-black/65 uppercase group-focus-within:text-accent transition-all block mb-4">Initial Thoughts</label>
                                <textarea
                                    rows="1"
                                    placeholder="Briefly describe your dream space..."
                                    className="w-full bg-transparent border-b border-black/20 py-3 text-lg md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all resize-none placeholder:text-black/25 placeholder:italic min-h-[60px]"
                                ></textarea>
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                            </div>

                            <div className="flex justify-end pt-4">
                                <motion.button
                                    whileHover={{ gap: "2rem" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-6 group/btn"
                                >
                                    <span className="text-xs font-black uppercase tracking-[0.8em] text-black group-hover/btn:text-accent transition-all">Submit Brief</span>
                                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-accent group-hover/btn:scale-110 transition-all shadow-2xl border border-white/5">
                                        <ArrowUpRight className="w-6 h-6" />
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
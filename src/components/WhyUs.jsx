import React, { useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FurnitureSketches from "./FurnitureSketches";

/**
 * WhyUs Component: The Brand Philosophy
 * Theme: "Moodboard Cream" - inspired by the current beige design injection.
 * Typography: Playfair Display + Reactive Word Reveal
 */
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
    const rawWords = text.split(" ");
    const words = [...rawWords];
    if (words.length > 1) {
        const lastWord = words.pop();
        const secondLastWord = words.pop();
        words.push(`${secondLastWord}\u00A0${lastWord}`);
    }
    const totalWords = words.length;

    return (
        <div className={className} style={{ textWrap: "pretty" }}>
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
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
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
    const formYMobile = useTransform(progress, [1.2, 1.5], [100, 0]); 
    const formYDesktop = useTransform(progress, [1.2, 1.5], [100, -40]); 
    const formY = isMobile ? formYMobile : formYDesktop;
    const formScale = useTransform(progress, [1.2, 1.5], [1.1, 1]); 

    const sketchOpacityMobile = useTransform(progress, [1.1, 1.25], [1, 0]);
    const sketchOpacityDesktop = useTransform(progress, [1.1, 1.25], [1, 0]);
    const sketchOpacity = isMobile ? sketchOpacityMobile : sketchOpacityDesktop;

    const phrase1 = "At Niche & Form Design Studio, we believe good design starts long before colours and finishes come into play. We take the time to understand how you live, move, and use your space—because a home should work beautifully.";
    const phrase2 = "Our approach is rooted in thoughtful planning, smart layouts, and practical storage, paired with a refined, modern aesthetic that feels elegant without being excessive.";
    const phrase3 = "We focus on clarity, honesty, and end-to-end execution, right from concept and layout options to on-site coordination. The result is a space that feels intentional, personal, and built to last.";

    return (
        <div className="relative h-screen bg-[#FBF2C0] overflow-hidden flex items-center justify-center font-sans text-black">

            {/* BACKGROUND: Drawing Texture & Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <motion.div style={{ opacity: sketchOpacity }}>
                <FurnitureSketches 
                    progress={progress} 
                    theme="light" 
                    mobileOnly={true} 
                    fadeOutRange={[1.0, 1.25]}
                />
            </motion.div>

            {/* PHILOSOPHY TEXT WRAPPER */}
            <motion.div
                style={{ opacity: philosophyOpacity }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-5 py-4 sm:py-8 md:pt-[5vh] md:pb-10 md:justify-start"
            >
                <div className="max-w-6xl w-full flex flex-col items-center">
                    
                    {/* Persistent Heading - Stays at top */}
                    <motion.div 
                        style={{ 
                            opacity: useTransform(progress, [0, 0.1, 1.0, 1.15], [0, 1, 1, 0]),
                            y: titleY 
                        }} 
                        className="text-center space-y-0.5 sm:space-y-3 mb-[3vh] md:mb-[6vh]"
                    >
                        <span className="text-[9px] sm:text-[14px] font-sans font-extrabold tracking-[0.4em] sm:tracking-[0.8em] text-black/40 uppercase block">Our Philosophy</span>
                        <h2 className="text-3xl sm:text-7xl md:text-[9.5rem] font-serif text-black leading-[0.85] font-black tracking-tighter">
                            Why <span className="italic font-light text-black">Us?</span>
                        </h2>
                    </motion.div>

                    {/* Sequential Content Blocks */}
                    <div className="relative w-full h-[32vh] sm:h-60 md:h-[45vh] flex items-center justify-center">
                        
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
                                className="text-[16px] sm:text-xl md:text-[2rem] lg:text-[2.25rem] leading-[1.6] text-black font-sans font-medium text-center tracking-tight max-w-4xl px-4"
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
                                className="text-[16px] sm:text-xl md:text-[2rem] lg:text-[2.25rem] leading-[1.6] text-black font-sans font-medium text-center tracking-tight max-w-4xl px-4"
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
                                className="text-[16px] sm:text-xl md:text-[2rem] lg:text-[2.25rem] leading-[1.6] text-black font-sans font-medium text-center tracking-tight max-w-4xl px-4"
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
                className="absolute inset-0 z-20 flex items-center justify-center font-sans overflow-hidden p-4 sm:p-6"
            >
                <motion.div 
                    style={{ y: formY, scale: formScale }}
                    className="w-[92vw] max-w-[420px] md:max-w-4xl h-[80vh] max-h-[640px] md:h-[560px] flex flex-col md:flex-row bg-[#FBF2C0] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-black/10 md:border-black/5 shadow-[0_30px_60px_rgba(0,0,0,0.1)] md:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] md:mx-6 overflow-y-auto"
                >
                    
                    {/* LEFT PANEL — Architectural Branding */}
                    <div className="md:w-2/5 pt-8 pb-6 px-6 md:px-12 md:py-16 bg-black flex flex-col justify-between text-secondary relative overflow-hidden group/panel">
                        {/* Huge Watermark */}
                        <div className="absolute -top-6 -left-6 text-[30vw] md:text-[25vw] font-black opacity-[0.04] select-none pointer-events-none tracking-tighter leading-none font-serif">N</div>
                        <div className="absolute -bottom-6 -right-6 text-[30vw] md:text-[25vw] font-black opacity-[0.04] select-none pointer-events-none tracking-tighter leading-none font-serif italic">F</div>
                        
                        <div className="relative z-10 space-y-2 md:space-y-8">
                             <div className="flex items-center gap-4">
                                 <div className="h-[1px] w-8 bg-accent" />
                                 <span className="text-[9px] font-black tracking-[0.5em] text-accent uppercase">Let's Connect</span>
                             </div>
                             <h3 className="text-xl md:text-7xl font-serif font-black leading-[0.85] tracking-tighter italic">
                                 Ready to <br className="hidden md:block" />
                                 <span className="text-accent not-italic">Build?</span>
                             </h3>
                             <p className="text-secondary/40 text-[10px] md:text-xs font-medium uppercase tracking-widest leading-relaxed max-w-[180px] md:max-w-none hidden sm:block">
                                 Transforming your vision into architectural reality.
                             </p>
                        </div>
 
                        <div className="relative z-10 pt-4 md:pt-0">
                             <div className="space-y-3 md:space-y-8 border-t border-white/10 pt-3 md:pt-10">
                                 <div className="flex md:flex-col justify-between md:justify-start gap-4">
                                     <div className="space-y-1">
                                         <p className="text-[8px] font-black tracking-[0.2em] text-accent uppercase">Location</p>
                                         <p className="text-[10px] md:text-sm font-sans text-secondary/80">Bangalore HQ</p>
                                     </div>
                                     <div className="space-y-1">
                                         <p className="text-[8px] font-black tracking-[0.2em] text-accent uppercase">Digital</p>
                                         <p className="text-[10px] md:text-sm font-sans text-secondary/80 underline underline-offset-4 decoration-accent/30">hello@nicheandform.com</p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
 
                    {/* RIGHT PANEL — Refined Form Grid */}
                    <div className="md:w-3/5 flex-1 px-6 py-6 md:px-12 md:pt-16 md:pb-12 flex flex-col justify-start relative bg-white/[0.02]">
                        <form className="space-y-4 md:space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-12">
                                {/* Name Input */}
                                <div className="group relative">
                                    <label className="text-[9px] font-black tracking-[0.3em] text-black/60 uppercase group-focus-within:text-accent transition-all block mb-1 md:mb-4">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name / Organization"
                                        className="w-full bg-transparent border-b border-black/20 py-1 md:py-3 text-sm md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all placeholder:text-black/25 placeholder:italic"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>
 
                                {/* Contact Input */}
                                <div className="group relative">
                                    <label className="text-[9px] font-black tracking-[0.3em] text-black/60 uppercase group-focus-within:text-accent transition-all block mb-1 md:mb-4">Communication</label>
                                    <input
                                        type="tel"
                                        placeholder="Email / WhatsApp"
                                        className="w-full bg-transparent border-b border-black/20 py-1 md:py-3 text-sm md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all placeholder:text-black/25 placeholder:italic"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>
 
                                {/* Space Type */}
                                <div className="group relative">
                                    <label className="text-[9px] font-black tracking-[0.3em] text-black/60 uppercase group-focus-within:text-accent transition-all block mb-1 md:mb-4">Space Type</label>
                                    <select 
                                        value={spaceType}
                                        onChange={(e) => setSpaceType(e.target.value)}
                                        className={`w-full bg-transparent border-b border-black/20 py-1 md:py-3 text-sm md:text-xl font-sans focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer ${spaceType ? "text-black/85" : "text-black/30 italic"}`}
                                    >
                                        <option value="" className="bg-secondary" disabled>Nature of Inquiry</option>
                                        <option className="bg-secondary" value="residential">High-End Residential</option>
                                        <option className="bg-secondary" value="commercial">Boutique Commercial</option>
                                        <option className="bg-secondary" value="hospitality">Hospitality & Leisure</option>
                                        <option className="bg-secondary" value="interior">Bespoke Interior</option>
                                    </select>
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>
 
                                {/* Timeframe */}
                                <div className="group relative">
                                    <label className="text-[9px] font-black tracking-[0.3em] text-black/60 uppercase group-focus-within:text-accent transition-all block mb-1 md:mb-4">Timeframe</label>
                                    <input
                                        type="text"
                                        placeholder="Estimated Start Date"
                                        className="w-full bg-transparent border-b border-black/20 py-1 md:py-3 text-sm md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all placeholder:text-black/25 placeholder:italic"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                                </div>
                            </div>
 
                            {/* Brief Textarea */}
                            <div className="group relative">
                                <label className="text-[9px] font-black tracking-[0.3em] text-black/60 uppercase group-focus-within:text-accent transition-all block mb-1 md:mb-4">Initial Thoughts</label>
                                <textarea
                                    rows="1"
                                    placeholder="Briefly describe your dream space..."
                                    className="w-full bg-transparent border-b border-black/20 py-1 md:py-3 text-sm md:text-xl font-sans text-black/85 focus:text-black focus:outline-none focus:border-accent transition-all resize-none placeholder:text-black/25 placeholder:italic min-h-[36px] md:min-h-[60px]"
                                ></textarea>
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full" />
                            </div>
 
                            <div className="flex justify-end pt-2 md:pt-4">
                                <motion.button
                                    whileHover={{
                                        x: -2,
                                        y: -2,
                                        boxShadow: "4px 4px 0px rgba(0,0,0,0.3)"
                                    }}
                                    whileTap={{
                                        x: 2,
                                        y: 2,
                                        boxShadow: "0px 0px 0px #000"
                                    }}
                                    className="flex items-center gap-3 bg-[#F8D149] text-black px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl border-2 border-black/60 shadow-[3px_3px_0px_rgba(0,0,0,0.4)] transition-all cursor-pointer font-sans group"
                                >
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black transition-all">Submit Brief</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>



        </div>
    );
};

export default WhyUs;
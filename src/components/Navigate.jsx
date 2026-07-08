import React, { useState } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import { Menu, X, Instagram, Facebook, MessageCircle } from "lucide-react";
import { scrollToProgress } from "../lib/scrollTo";
import logoImg from "../assets/logo(3).png";

/**
 * Navigate Component: The Global Left-Dropdown Menu
 * Synchronized with the 1500vh Cinematic Scroll Journey.
 */
const Navigate = ({ progress }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Synchronized reveal with HomeHero entrance
    const navOpacity = useTransform(progress, [0.13, 0.18], [0, 1]);
    const navX = useTransform(progress, [0.13, 0.18], [-40, 0]);
    const logoX = useTransform(progress, [0.13, 0.18], [40, 0]);
    const navScale = useTransform(progress, [0.13, 0.18], [0.8, 1]);

    const menuItems = [
        { title: "HOME", sub: "The Sanctuary", target: 0.07 },           // Home Hero content start
        { title: "WHAT WE DO", sub: "Services Matrix", target: 0.19 },   // What We Do content start
        { title: "THE PROCESS", sub: "Design Methodology", target: 0.32 }, // How We Do It content start
        { title: "WHY US", sub: "Our Philosophy", target: 0.565 },        // WhyUs settled, first phrase fully readable
        { title: "CONTACT", sub: "Get in Touch", target: 0.88 },         // WhyUs form reveal start
    ];

    const handleScroll = (target) => {
        setIsOpen(false);
        const isMobile = window.innerWidth < 768;
        setTimeout(() => {
            scrollToProgress(target);
        }, isMobile ? 320 : 150);
    };

    return (
        <div className="relative">
            {/* Toggle Button - Neubrutalist Style */}
            <motion.button
                style={{
                    opacity: navOpacity,
                    x: navX,
                    scale: navScale,
                    willChange: "opacity, transform"
                }}
                onClick={() => setIsOpen(true)}
                whileHover={{ x: 2, y: 2, boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
                whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0px #000" }}
                className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-[100] p-3 sm:p-4 bg-[#F8D149] border-2 border-black/60 shadow-[3px_3px_0px_rgba(0,0,0,0.4)] rounded-lg sm:rounded-xl transition-all group overflow-hidden"
            >
                <div className="absolute inset-0 bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-accent relative z-10 transition-colors" />
            </motion.button>

            {/* Floating Brand Logo Badge */}
            <motion.div
                style={{
                    opacity: navOpacity,
                    x: logoX,
                    scale: navScale,
                    willChange: "opacity, transform"
                }}
                onClick={() => handleScroll(0)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[100] h-[46px] sm:h-[54px] flex items-center justify-center transition-all cursor-pointer pointer-events-auto"
            >
                <img src={logoImg} alt="Niche & Form Logo" className="h-8 sm:h-10 w-auto object-contain" />
            </motion.div>

            {/* Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[110]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ x: "-100%", skewX: 5 }}
                            animate={{ x: 0, skewX: 0 }}
                            exit={{ x: "-100%", skewX: -5 }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="absolute top-0 left-0 h-full w-full md:max-w-[500px] bg-base shadow-[50px_0_100px_rgba(0,0,0,0.9)] flex flex-col border-r border-white/5"
                        >
                            <div className="p-6 sm:p-8 md:p-12 h-full flex flex-col relative z-20">
                                <div className="flex justify-between items-center w-full mb-6 sm:mb-10 md:mb-20">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all group"
                                    >
                                        <X className="w-5 h-5 md:w-6 md:h-6 text-accent group-hover:rotate-90 transition-transform" />
                                    </button>
                                    <img 
                                        src={logoImg} 
                                        alt="Niche & Form Logo" 
                                        className="h-8 sm:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                                        onClick={() => handleScroll(0)}
                                    />
                                </div>

                                <nav className="space-y-5 sm:space-y-7 md:space-y-10">
                                    {menuItems.map((item, i) => (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i + 0.2 }}
                                            onClick={() => handleScroll(item.target)}
                                            className="group cursor-pointer block active:opacity-70 transition-opacity"
                                        >
                                            <div className="flex items-center gap-6 md:gap-8 translate-x-0 group-hover:translate-x-4 transition-transform duration-500">
                                                <span className="text-[9px] md:text-[10px] font-black tracking-[0.5em] text-accent opacity-40 group-hover:opacity-100 transition-opacity">
                                                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                                </span>
                                                <div className="flex flex-col">
                                                    <p className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] text-white/30 mb-1 md:mb-2 font-black transition-all group-hover:text-accent">
                                                        {item.sub}
                                                    </p>
                                                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-light tracking-tighter text-white/60 group-hover:text-white transition-colors">
                                                        {item.title}
                                                    </h2>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </nav>

                                <div className="mt-auto pt-8 md:pt-12 border-t border-white/5 flex justify-between items-end">
                                    <div className="flex gap-8 md:gap-10 items-center">
                                        <a href="#" className="flex"><Instagram className="w-4 h-4 md:w-5 md:h-5 text-white/20 hover:text-accent transition-colors cursor-pointer" /></a>
                                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex"><MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white/20 hover:text-accent transition-colors cursor-pointer" /></a>
                                        <a href="#" className="flex"><Facebook className="w-4 h-4 md:w-5 md:h-5 text-white/20 hover:text-accent transition-colors cursor-pointer" /></a>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <img src={logoImg} alt="Niche & Form Logo" className="h-10 md:h-12 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Text in Background of Sidebar */}
                            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rotate-90 opacity-[0.015] pointer-events-none select-none z-10 hidden md:block">
                                <h3 className="text-[120px] lg:text-[150px] font-black text-white whitespace-nowrap whitespace-pre tracking-widest">
                                    NICHE & FORM
                                </h3>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navigate;
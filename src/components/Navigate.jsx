import React, { useState } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import { Menu, X, Instagram, Linkedin, Facebook } from "lucide-react";

/**
 * Navigate Component: The Global Left-Dropdown Menu
 * Synchronized with the 1500vh Cinematic Scroll Journey.
 */
const Navigate = ({ progress }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Synchronized reveal with HomeHero entrance
    const navOpacity = useTransform(progress, [0.18, 0.24], [0, 1]);
    const navX = useTransform(progress, [0.18, 0.24], [-40, 0]);
    const navScale = useTransform(progress, [0.18, 0.24], [0.8, 1]);

    const menuItems = [
        { title: "HOME", sub: "The Sanctuary", target: 0.15 },          // Home Hero entrance (0.12-0.22)
        { title: "WHAT WE DO", sub: "Services Matrix", target: 0.29 },   // What We Do center (0.24-0.34)
        { title: "THE PROCESS", sub: "Design Methodology", target: 0.45 }, // How We Do It center (0.38-0.52)
        { title: "PHILOSOPHY", sub: "Built to Last", target: 0.625 },    // WhyUs typing center (0.50-0.75)
        { title: "CONTACT", sub: "Get in Touch", target: 0.86 },         // WhyUs form center (0.78-0.94)
    ];

    const handleScroll = (target) => {
        setIsOpen(false);
        // Small delay so sidebar animation finishes before scroll
        setTimeout(() => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({
                top: target * totalHeight,
                behavior: "smooth"
            });
        }, 350);
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
                whileHover={{ x: 2, y: 2, boxShadow: "2px 2px 0px #000" }}
                whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0px #000" }}
                className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100] p-3 sm:p-4 bg-[#F8D149] border-2 border-black shadow-[4px_4px_0px_#000] rounded-lg sm:rounded-xl transition-all group overflow-hidden"
            >
                <div className="absolute inset-0 bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-accent relative z-10 transition-colors" />
            </motion.button>

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
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="self-start p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all mb-8 sm:mb-12 md:mb-20 group"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6 text-accent group-hover:rotate-90 transition-transform" />
                                </button>

                                <nav className="space-y-6 sm:space-y-8 md:space-y-10">
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
                                    <div className="flex gap-8 md:gap-10">
                                        <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white/20 hover:text-accent transition-colors cursor-pointer" />
                                        <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white/20 hover:text-accent transition-colors cursor-pointer" />
                                        <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white/20 hover:text-accent transition-colors cursor-pointer" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[7px] md:text-[8px] tracking-[0.5em] text-white/10 font-black uppercase italic">Niche & Form</p>
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
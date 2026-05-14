import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone, ArrowUpRight, ArrowUp } from "lucide-react";

const Footer = () => {
    const socialLinks = [
        { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#" },
        { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
        { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "#" },
    ];

    const navLinks = [
        { title: "Home", target: 0.10 },
        { title: "What We Do", target: 0.21 },
        { title: "The Process", target: 0.32 },
        { title: "Philosophy", target: 0.625 },
        { title: "Contact", target: 0.86 },
    ];

    const handleScroll = (target) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
            top: target * totalHeight,
            behavior: "smooth"
        });
    };

    return (
        <footer className="relative min-h-screen md:h-screen w-full bg-base text-secondary overflow-hidden flex flex-col px-6 sm:px-12 md:px-24 pt-10 md:pt-20 pb-8 sm:pb-12 border-t border-white/5 shadow-[0_-40px_80px_rgba(0,0,0,0.6)] group/footer">
            
            {/* 1. BRAND MONOLITH: MASSIVE IMPACT */}
            <div className="relative z-10 w-full mb-8 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row items-baseline justify-between gap-6"
                >
                    <div className="overflow-hidden">
                        <h2 className="text-5xl sm:text-8xl md:text-[14vw] font-serif font-black leading-[0.75] tracking-[-0.04em] text-white flex flex-col">
                            <span className="italic">Niche &</span>
                            <span className="text-accent ml-[0.5em] md:ml-[1em] relative">
                                Form.
                                <motion.div 
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-accent origin-left opacity-30" 
                                />
                            </span>
                        </h2>
                    </div>
                    
                    <div className="max-w-[280px] md:max-w-md">
                        <p className="text-white/40 text-[10px] md:text-sm font-medium uppercase tracking-[0.4em] leading-relaxed mb-6">
                            Defining the intersection of <br /> utility and timeless elegance.
                        </p>
                        <motion.button
                            onClick={() => handleScroll(0.86)}
                            whileHover={{ x: 10 }}
                            className="flex items-center gap-4 text-accent group/cta"
                        >
                            <span className="text-[9px] md:text-[11px] font-black tracking-[0.6em] uppercase">Start a Project</span>
                            <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center group-hover/cta:bg-accent group-hover/cta:text-black transition-all">
                                <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* 2. REFINED INFORMATION GRID */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 flex-1">
                
                {/* STUDIO ADDRESS */}
                <div className="space-y-4 md:space-y-6 group/item">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-accent/40 group-hover/item:w-12 transition-all duration-500" />
                        <h4 className="text-[10px] font-black tracking-[0.5em] text-accent/60 uppercase">The Studio</h4>
                    </div>
                    <div className="space-y-3 text-white/80 text-lg md:text-2xl font-serif italic leading-snug">
                        <p className="group-hover/item:text-white transition-colors duration-500">Suite 102, Design Quarter</p>
                        <p className="group-hover/item:text-white transition-colors duration-500">Karnataka, Bangalore 560001</p>
                        <div className="pt-2">
                            <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-[8px] tracking-[0.2em] font-sans uppercase text-white/40">Headquarters</span>
                        </div>
                    </div>
                </div>

                {/* CONTACT CHANNELS */}
                <div className="space-y-4 md:space-y-6 group/item">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-accent/40 group-hover/item:w-12 transition-all duration-500" />
                        <h4 className="text-[10px] font-black tracking-[0.5em] text-accent/60 uppercase">Enquiries</h4>
                    </div>
                    <div className="space-y-4 text-white/80 text-lg md:text-2xl font-serif italic">
                        <a href="mailto:hello@nicheandform.com" className="block hover:text-accent transition-all hover:translate-x-2 duration-300">hello@nicheandform.com</a>
                        <a href="tel:+919876543210" className="block font-sans not-italic text-sm md:text-xl tracking-tighter group-hover/item:text-white transition-colors">+91 98765 43210</a>
                    </div>
                </div>

                {/* EXPLORE NAVIGATION */}
                <div className="space-y-4 md:space-y-6 group/item hidden lg:block">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-accent/40 group-hover/item:w-12 transition-all duration-500" />
                        <h4 className="text-[10px] font-black tracking-[0.5em] text-accent/60 uppercase">Explore</h4>
                    </div>
                    <nav className="grid grid-cols-1 gap-y-3">
                        {navLinks.map((link, i) => (
                            <button 
                                key={i} 
                                onClick={() => handleScroll(link.target)}
                                className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-accent transition-colors duration-300 text-left w-fit"
                            >
                                {link.title}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* SOCIAL SIGNATURE */}
                <div className="space-y-4 md:space-y-6 group/item flex flex-col justify-between items-start md:items-end lg:items-start">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-8 bg-accent/40 group-hover/item:w-12 transition-all duration-500" />
                            <h4 className="text-[10px] font-black tracking-[0.5em] text-accent/60 uppercase">Journal</h4>
                        </div>
                        <div className="flex gap-4 md:gap-6">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/5 flex items-center justify-center hover:bg-white text-white/40 hover:text-black transition-all duration-500 relative group/icon"
                                >
                                    <div className="relative z-10">{social.icon}</div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. FINAL SIGNATURE BAR */}
            <div className="relative z-10 w-full pt-8 mt-auto border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-12">
                    <p className="text-[9px] text-white/20 font-sans tracking-[0.3em] uppercase">
                        © 2024 NICHE & FORM DESIGN STUDIO.
                    </p>
                    <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] text-white/10 uppercase">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                        <ArrowUp className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase group-hover:text-white transition-colors">Top</span>
                </motion.button>
            </div>

            {/* DECORATIVE ELEMENTS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000" />
            
            {/* LARGE WATERMARK BACKGROUND */}
            <div className="absolute bottom-[-5%] right-[-2%] opacity-[0.03] pointer-events-none select-none z-0">
                <h2 className="text-[35vw] font-serif italic font-black text-white leading-none tracking-tighter mix-blend-overlay">NF</h2>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </footer>
    );
};

export default Footer;



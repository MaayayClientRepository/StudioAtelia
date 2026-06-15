import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, MapPin, Phone, ArrowUpRight, ArrowUp } from "lucide-react";
import { scrollToProgress } from "../lib/scrollTo";

const Footer = () => {
    const socialLinks = [
        { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#" },
        { 
            name: "WhatsApp", 
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                >
                    {/* Outer rounded bubble */}
                    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.8 1.85 6.793L2 30l7.438-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" strokeWidth="2" />
                    {/* Outline handset */}
                    <path d="M11.5 9.5c.3 0 .6.1.8.3l1.6 2c.2.3.2.7 0 1l-.8.8c-.1.1-.1.2 0 .3 1 1.5 2 2.5 3.5 3.5.1.1.2.1.3 0l.8-.8c.3-.2.7-.2 1 0l2 1.6c.2.2.3.5.3.8 0 1.5-1.2 2.5-2.5 2.5-4.5 0-9-4.5-9-9C9 10.7 10 9.5 11.5 9.5z" strokeWidth="1.8" />
                </svg>
            ), 
            href: "https://wa.me/919876543210" 
        },
        { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "#" },
    ];

    const navLinks = [
        { title: "Home", target: 0.07 },
        { title: "What We Do", target: 0.19 },
        { title: "The Process", target: 0.32 },
        { title: "Why Us", target: 0.565 },
    ];

    const handleScroll = (target) => {
        scrollToProgress(target);
    };

    return (
        <footer className="relative w-full h-full bg-base text-secondary overflow-hidden flex flex-col px-5 sm:px-12 md:px-24 pt-10 pb-6 md:pt-28 md:pb-12 border-t border-white/5 shadow-[0_-40px_80px_rgba(0,0,0,0.6)] group/footer">
            
            {/* 1. BRAND MONOLITH: MASSIVE IMPACT FOR BRAND RECALL */}
            <div className="relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <h2 className="text-5xl sm:text-7xl md:text-[8vw] font-serif font-black leading-[0.75] tracking-[-0.04em] text-white flex flex-col sm:flex-row sm:items-baseline">
                        <span className="italic">Niche</span>
                        <span className="text-white/30 italic font-light mx-2">&</span>
                        <span>Form</span>
                    </h2>
                    
                    <div className="max-w-sm">
                        <p className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] leading-relaxed mb-4">
                            Defining the intersection of <br /> utility and timeless elegance.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Horizontal Line Divider */}
            <div className="relative z-10 w-full h-[1px] bg-white/5 my-5 md:my-16" />

            {/* 2. REFINED DIRECT CONTACT & LINKS GRID */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-16 items-start">
                
                {/* COLUMN 1 — THE IMMERSIVE CONTACT HERO (5/12th Width) */}
                <div className="lg:col-span-5 space-y-6 md:space-y-12">
                    {/* Email Contact Block */}
                    <div className="space-y-2 group/mail">
                        <div className="flex items-center gap-3">
                            <Mail className="w-3.5 h-3.5 text-white/30 group-hover/mail:text-white/70 transition-colors" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Project Enquiries</span>
                        </div>
                        <a 
                            href="mailto:hello@nicheandform.com" 
                            className="block text-2xl sm:text-3xl md:text-[2.8vw] font-serif font-light italic leading-none text-white hover:text-white/70 transition-all duration-300 hover:translate-x-2 tracking-tight"
                        >
                            hello@nicheandform.com
                        </a>
                    </div>
                    
                    {/* Phone Contact Block */}
                    <div className="space-y-2 group/phone">
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-3.5 h-3.5 text-white/30 group-hover/phone:text-white/70 transition-colors"
                            >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor" stroke="currentColor" transform="translate(12.5, 11.5) scale(0.42) rotate(-90) translate(-12, -12)" />
                            </svg>
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Direct Call & WhatsApp</span>
                        </div>
                        <a 
                            href="tel:+919876543210" 
                            className="block text-xl sm:text-2xl md:text-[2vw] font-sans font-light leading-none text-white hover:text-white/70 transition-all duration-300 hover:translate-x-2 tracking-tight"
                        >
                            +91 98765 43210
                        </a>
                    </div>
                </div>

                {/* COLUMN 2 — PHYSICAL STUDIO ADDRESS (4/12th Width) */}
                <div className="lg:col-span-4 space-y-4 md:space-y-8 group/studio">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-3.5 h-3.5 text-white/30 group-hover/studio:text-white/70 transition-colors" />
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">The Studio Address</span>
                    </div>
                    <div className="space-y-1 md:space-y-2 text-white/80 text-base md:text-xl font-serif italic leading-relaxed">
                        <p className="group-hover/studio:text-white transition-colors duration-300">Suite 102, Design Quarter,</p>
                        <p className="group-hover/studio:text-white transition-colors duration-300">Karnataka, Bangalore 560001, India.</p>
                    </div>
                    <div className="pt-1 flex items-center gap-6">
                        <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-[8px] tracking-[0.2em] font-sans uppercase text-white/40">Headquarters</span>
                        <motion.a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-white/50 hover:text-white/90 text-[9px] font-black uppercase tracking-widest cursor-pointer"
                        >
                            <span>View on Map</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </motion.a>
                    </div>
                </div>

                {/* COLUMN 3 — QUICK LINKS & CONNECT (3/12th Width) */}
                <div className="lg:col-span-3 space-y-6 md:space-y-12 flex flex-col items-start text-left">
                    <div className="space-y-2 md:space-y-4 w-full flex flex-col items-start">
                        <h4 className="text-[9px] font-black tracking-[0.4em] text-white/40 uppercase text-left">Navigation</h4>
                        <nav className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:items-start md:gap-3 justify-start w-full">
                            {navLinks.map((link, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleScroll(link.target)}
                                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300 cursor-pointer text-left w-fit"
                                >
                                    {link.title}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="space-y-2 md:space-y-4 w-full flex flex-col items-start">
                        <h4 className="text-[9px] font-black tracking-[0.4em] text-white/40 uppercase text-left">Connect</h4>
                        <div className="flex gap-3 justify-start items-center">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center hover:bg-white text-white/40 hover:text-black transition-all duration-500"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* FINAL SIGNATURE BAR */}
            <div className="relative z-10 w-full pt-5 mt-8 md:mt-auto md:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-12">
                    <p className="text-[9px] text-white/50 font-sans tracking-[0.3em] uppercase">
                        © 2026 NICHE & FORM DESIGN STUDIO.
                    </p>
                    <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

                <motion.button
                    onClick={() => scrollToProgress(0)}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <ArrowUp className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase group-hover:text-white transition-colors">Top</span>
                </motion.button>
            </div>

            {/* DECORATIVE BACKGROUND GRADIENT */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000" />
            
            {/* LARGE WATERMARK BACKGROUND */}
            <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none select-none z-0 pr-8 sm:pr-16 md:pr-24 pb-4">
                <h2 className="text-[35vw] font-serif italic font-black text-white leading-none tracking-tighter mix-blend-overlay">NF</h2>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </footer>
    );
};

export default Footer;

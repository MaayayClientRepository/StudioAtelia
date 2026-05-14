import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const Footer = () => {
    const socialLinks = [
        { name: "Instagram", icon: <Instagram className="w-4 h-4" />, href: "#" },
        { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, href: "#" },
        { name: "Facebook", icon: <Facebook className="w-4 h-4" />, href: "#" },
    ];

    return (
        <footer className="relative h-screen w-full bg-base text-secondary overflow-hidden flex flex-col justify-between p-6 sm:p-12 md:p-24 border-t border-white/5 shadow-[0_-40px_80px_rgba(0,0,0,0.4)]">
            
            {/* 1. TOP SECTION: THE BRAND IMPACT */}
            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="space-y-4 md:space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-[10px] font-black tracking-[0.8em] text-accent uppercase block mb-2 sm:mb-4">Since 2024</span>
                        <h2 className="text-5xl sm:text-7xl md:text-[10rem] font-serif font-black leading-[0.8] tracking-tighter italic text-white">
                            Niche <br />
                            <span className="text-accent not-italic">& Form.</span>
                        </h2>
                    </motion.div>
                    
                    <p className="text-white/30 text-xs sm:text-sm md:text-xl font-light font-sans max-w-xs md:max-w-md leading-relaxed">
                        Architecture is the thoughtful making of space. We define the intersection of utility and timeless elegance.
                    </p>
                </div>

                {/* ARCHITECTURAL LINE DETAIL */}
                <div className="hidden md:block h-full w-[1px] bg-white/5 self-stretch" />

                {/* 2. CONTACT GRID: REFINED ARCHITECTURAL HIERARCHY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-24 max-w-2xl">
                    <div className="space-y-6 group cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-6 bg-accent" />
                            <h4 className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">The Studio</h4>
                        </div>
                        <div className="space-y-2 text-white/80 text-base md:text-2xl font-serif italic leading-snug pl-9 group-hover:text-white transition-colors">
                            <p>Studio 102, Design Quarter,</p>
                            <p className="not-italic font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40 mt-2">Bangalore HQ — Karnataka, India.</p>
                        </div>
                    </div>

                    <div className="space-y-6 group cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-6 bg-accent" />
                            <h4 className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">Connect</h4>
                        </div>
                        <div className="space-y-4 text-white/80 text-base md:text-2xl font-serif italic leading-snug pl-9 group-hover:text-white transition-colors">
                            <a href="mailto:hello@nicheandform.com" className="block hover:text-accent transition-all decoration-accent/20 hover:decoration-accent underline underline-offset-8">hello@nicheandform.com</a>
                            <a href="tel:+919876543210" className="block font-sans not-italic text-sm md:text-lg tracking-tighter">+91 98765 43210</a>
                        </div>
                    </div>

                    <div className="sm:col-span-2 pt-12 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-6 bg-accent" />
                            <h4 className="text-[11px] font-black tracking-[0.5em] text-accent uppercase">Digital Journal</h4>
                        </div>
                        <div className="flex gap-4 md:gap-8 pl-9">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all group/icon relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-accent translate-y-full group-hover/icon:translate-y-0 transition-transform duration-500 ease-out" />
                                    <div className="relative z-10 transition-colors duration-500">{social.icon}</div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. BOTTOM SECTION: THE RECALL MARK */}
            <div className="relative z-10 w-full pt-12 md:pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-[8px] md:text-[10px] font-black tracking-[1em] text-white/10 uppercase italic">
                        The Art of Living
                    </span>
                    <p className="text-[10px] text-white/20 font-sans tracking-widest">
                        © 2024 NICHE & FORM DESIGN STUDIO. ALL RIGHTS RESERVED.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-4 group cursor-pointer"
                >
                    <span className="text-[9px] font-black tracking-[0.4em] text-accent uppercase group-hover:translate-x-[-10px] transition-transform">Back to top</span>
                    <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                        <ArrowUpRight className="w-5 h-5 -rotate-45" />
                    </div>
                </motion.button>
            </div>

            {/* BACKGROUND WATERMARK: MASSIVE BRAND PRESENCE */}
            <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.02] pointer-events-none select-none z-0">
                <h2 className="text-[40vw] font-black text-white leading-none tracking-tighter">NF.</h2>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </footer>
    );
};

export default Footer;



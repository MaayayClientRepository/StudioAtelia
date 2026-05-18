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
        <footer className="relative w-full bg-base text-secondary overflow-hidden flex flex-col px-6 sm:px-12 md:px-24 py-16 md:py-24 border-t border-white/5 shadow-[0_-40px_80px_rgba(0,0,0,0.6)] group/footer">
            
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
                        <span className="text-accent mx-2">&</span>
                        <span>Form.</span>
                    </h2>
                    
                    <div className="max-w-sm">
                        <p className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] leading-relaxed mb-4">
                            Defining the intersection of <br /> utility and timeless elegance.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Horizontal Line Divider */}
            <div className="relative z-10 w-full h-[1px] bg-white/5 my-8 md:my-12" />

            {/* 2. REFINED DIRECT CONTACT & LINKS GRID */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                
                {/* COLUMN 1 — THE IMMERSIVE CONTACT HERO (5/12th Width) */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Email Contact Block */}
                    <div className="space-y-2 group/mail">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-accent/60 uppercase">Project Enquiries</span>
                        </div>
                        <a 
                            href="mailto:hello@nicheandform.com" 
                            className="block text-2xl sm:text-3xl md:text-[2.8vw] font-serif font-light italic leading-none text-white hover:text-accent transition-all duration-300 hover:translate-x-2 tracking-tight"
                        >
                            hello@nicheandform.com
                        </a>
                    </div>
                    
                    {/* Phone Contact Block */}
                    <div className="space-y-2 group/phone">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-accent/60 uppercase">Direct Call & WhatsApp</span>
                        </div>
                        <a 
                            href="tel:+919876543210" 
                            className="block text-xl sm:text-2xl md:text-[2vw] font-sans font-light leading-none text-white hover:text-accent transition-all duration-300 hover:translate-x-2 tracking-tight"
                        >
                            +91 98765 43210
                        </a>
                    </div>
                </div>

                {/* COLUMN 2 — PHYSICAL STUDIO ADDRESS (4/12th Width) */}
                <div className="lg:col-span-4 space-y-4 group/studio">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-3.5 h-3.5 text-accent/60 group-hover/studio:text-accent transition-colors" />
                        <span className="text-[10px] font-black tracking-[0.4em] text-accent/60 uppercase">The Studio Address</span>
                    </div>
                    <div className="space-y-1 text-white/80 text-base md:text-xl font-serif italic leading-relaxed">
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
                            className="flex items-center gap-2 text-accent text-[9px] font-black uppercase tracking-widest cursor-pointer"
                        >
                            <span>View on Map</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </motion.a>
                    </div>
                </div>

                {/* COLUMN 3 — QUICK LINKS & CONNECT (3/12th Width) */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="space-y-2">
                        <h4 className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">Navigation</h4>
                        <nav className="flex flex-wrap gap-x-4 gap-y-2">
                            {navLinks.map((link, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleScroll(link.target)}
                                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-accent transition-colors duration-300"
                                >
                                    {link.title}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">Connect</h4>
                        <div className="flex gap-3">
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
            <div className="relative z-10 w-full pt-8 mt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-12">
                    <p className="text-[9px] text-white/20 font-sans tracking-[0.3em] uppercase">
                        © 2026 NICHE & FORM DESIGN STUDIO.
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

            {/* DECORATIVE BACKGROUND GRADIENT */}
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

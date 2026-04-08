import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone } from "lucide-react";

/**
 * Footer Component: Niche & Form Design Studio
 * Aesthetic: Minimalist Onyx Black with Champagne accents.
 * Focus: Contact, Socials, and Brand Philosophy.
 */
const Footer = () => {
    const socialLinks = [
        { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#" },
        { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
        { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "#" },
    ];

    const contactInfo = [
        { icon: <MapPin className="w-5 h-5" />, text: "Studio 102, Design Quarter, Bangalore, India" },
        { icon: <Phone className="w-5 h-5" />, text: "+91 98765 43210" },
        { icon: <Mail className="w-5 h-5" />, text: "hello@nicheandform.com" },
    ];

    return (
        <footer className="relative bg-base text-secondary pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-24 md:pb-32 px-4 sm:px-6 md:px-24 rounded-t-[2rem] sm:rounded-t-[3rem] md:rounded-t-[6rem] overflow-hidden flex flex-col justify-start border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
            {/* Background Branding Typography - ANIMATED & CINEMATIC */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none w-full flex flex-col items-center">
                <h2 className="text-[25vw] font-black uppercase tracking-[-0.05em] leading-none mb-[-2vw]">NICHE</h2>
                <h2 className="text-[25vw] font-black uppercase tracking-[-0.05em] leading-none text-accent">FORM</h2>
            </div>

            <div className="relative z-10 container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 items-start">

                    {/* Column 1: Brand Philosophy & Impact */}
                    <div className="space-y-6 md:space-y-12">
                        <div className="group cursor-default">
                            <span className="text-[10px] font-black tracking-[0.5em] text-accent uppercase mb-3 block">Est. 2024</span>
                            <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif italic tracking-tight font-medium leading-none text-white transition-all group-hover:text-accent">Niche & <br />Form.</h3>
                        </div>
                        <p className="text-white/30 text-xs sm:text-sm md:text-xl leading-relaxed font-light font-sans max-w-xs md:max-w-sm">
                            Thoughtfully curated spatial experiences. We define the intersection of utility and elegance.
                        </p>
                    </div>

                    {/* Column 2: The Studio Network */}
                    <div className="space-y-8 md:space-y-14">
                        <h4 className="text-[10px] uppercase font-black tracking-[0.6em] text-accent">Inquiries</h4>
                        <ul className="space-y-4 sm:space-y-6 md:space-y-10 text-xs sm:text-sm md:text-xl font-light font-sans">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 md:gap-8 text-white/40 group cursor-pointer hover:text-white transition-all duration-700">
                                    <span className="text-accent mt-0.5 group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
                                    <div className="flex flex-col">
                                        <span className="leading-tight border-b border-transparent group-hover:border-accent transition-all">{item.text}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: The Narrative */}
                    <div className="space-y-8 md:space-y-14">
                        <h4 className="text-[10px] uppercase font-black tracking-[0.6em] text-accent">Journal</h4>
                        <div className="flex flex-col gap-4">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-6 text-white/20 hover:text-accent transition-all duration-500 group/link"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.01] group-hover/link:bg-accent group-hover/link:text-black transition-all">
                                        {social.icon}
                                    </div>
                                    <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">{social.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Subtle Grain Polish */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="mt-10 sm:mt-16 md:mt-32 pt-6 sm:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                <p className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.6em] md:tracking-[1em] text-white/10 italic">
                    The Art of Living • Niche & Form Design Studio
                </p>
                <div className="flex gap-10 text-[8px] font-black uppercase tracking-[0.4em] text-white/5 underline underline-offset-8 decoration-white/0 hover:decoration-white/10 transition-all cursor-pointer">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Interior Ethics</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


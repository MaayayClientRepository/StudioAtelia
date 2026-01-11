import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone } from "lucide-react";

/**
 * Footer Component: Studio Atélia
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
        { icon: <Mail className="w-5 h-5" />, text: "hello@studioatelia.com" },
    ];

    return (
        <footer className="relative bg-[#050505] text-[#EEE5D9] pt-4 pb-10 md:pt-12 md:pb-16 px-6 md:px-24 rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden h-auto md:h-[50vh] flex flex-col justify-start">
            {/* Background Branding Typography */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none whitespace-nowrap overflow-hidden w-full select-none">
                <h2 className="text-[30vw] md:text-[20vw] font-black uppercase tracking-tighter text-center">STUDIO ATÉLIA</h2>
            </div>

            <div className="relative z-10 container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 items-start">

                    {/* Column 1: Brand Philosophy */}
                    <div className="space-y-4 md:space-y-8">
                        <h3 className="text-2xl md:text-4xl font-serif italic tracking-tight">Studio Atélia</h3>
                        <p className="text-white/40 text-sm md:text-lg leading-relaxed font-light">
                            Thoughtful planning, smart layouts, and a refined aesthetic.
                        </p>
                    </div>

                    {/* Column 2: Contact Details */}
                    <div className="space-y-6 md:space-y-10">
                        <h4 className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] md:tracking-[0.5em] text-[#D2B68A] opacity-70">Connect</h4>
                        <ul className="space-y-4 md:space-y-8 text-xs md:text-base font-light font-sans">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 md:gap-6 text-white/50 group cursor-pointer hover:text-white transition-colors duration-500">
                                    <span className="text-[#D2B68A] mt-1 group-hover:scale-110 transition-transform duration-500 scale-75 md:scale-100">{item.icon}</span>
                                    <span className="leading-relaxed">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social Media handles */}
                    <div className="space-y-6 md:space-y-10">
                        <h4 className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] md:tracking-[0.5em] text-[#D2B68A] opacity-70">Socials</h4>
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/5 flex items-center gap-2 md:gap-3 text-white/40 bg-white/[0.02] backdrop-blur-xl hover:border-[#D2B68A]/30 hover:text-[#D2B68A] transition-all duration-500"
                                >
                                    <span className="scale-75 md:scale-100">{social.icon}</span>
                                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{social.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Subtle Grain Polish */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/5 text-center">
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.6em] md:tracking-[0.8em] text-white/10 italic">
                    The Art of Living • Studio Atélia
                </p>
            </div>
        </footer>
    );
};

export default Footer;


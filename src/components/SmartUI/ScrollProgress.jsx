import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Phone, X } from 'lucide-react';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [showCallPrompt, setShowCallPrompt] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);
    const [isGlowing, setIsGlowing] = useState(false);

    const checkContactSection = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const rect = contactSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            return isVisible;
        }
        return false;
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Glow effect
        if (latest > 0.7 && latest < 0.75) {
            setIsGlowing(true);
            setTimeout(() => setIsGlowing(false), 1000);
        }

        // Show prompt ONLY when Contact section is visible
        const isContactVisible = checkContactSection() || latest > 0.95; // Fallback to 95%

        if (isContactVisible && !showCallPrompt && !hasDismissed) {
            setShowCallPrompt(true);
        }
    });

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#FF7F50] origin-left z-[9999]"
                style={{ scaleX }}
            >
                <motion.div
                    className={`absolute inset-0 bg-[#FCD34D] blur-sm transition-opacity duration-500 ${isGlowing ? 'opacity-100' : 'opacity-0'}`}
                />
            </motion.div>

            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: showCallPrompt ? 20 : -100,
                    opacity: showCallPrompt ? 1 : 0
                }}
                className="fixed top-4 left-0 right-0 z-[9990] flex justify-center pointer-events-none"
            >
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] rounded-full py-2 pl-6 pr-2 flex items-center gap-4 pointer-events-auto">
                    <div className="flex flex-col text-right">
                        <span className="font-display text-sm text-black leading-none">Almost done?</span>
                        <span className="font-sans text-xs text-black/60 font-bold">Talk to us about your space.</span>
                    </div>
                    <button className="bg-[#10B981] text-white p-2 rounded-full border border-black hover:scale-110 transition-transform">
                        <Phone size={16} fill="currentColor" />
                    </button>
                    <button
                        onClick={() => {
                            setShowCallPrompt(false);
                            setHasDismissed(true);
                        }}
                        className="bg-gray-100 text-black p-1.5 rounded-full border border-black hover:bg-gray-200 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default ScrollProgress;

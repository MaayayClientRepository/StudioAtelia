import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';

const MobileInteraction = () => {
    // Scroll Logic for Bottom Bar
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollY;
        if (latest > previous && latest > 150) {
            setHidden(true); // Hide on scroll down
        } else {
            setHidden(false); // Show on scroll up
        }
        setLastScrollY(latest);
    });

    // Idle Logic
    const [isIdle, setIsIdle] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false); // Only show once per session maybe? Or reset. User said "Soft message slides up"

    useEffect(() => {
        let timeout;
        const resetTimer = () => {
            if (isIdle) setIsIdle(false);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsIdle(true);
            }, 12000); // 12 seconds idle
        };

        window.addEventListener('scroll', resetTimer);
        window.addEventListener('touchstart', resetTimer);
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);

        resetTimer();

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('scroll', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
        };
    }, [isIdle]);

    // Only render on mobile (handled via CSS media query usually, but simple check here or just display everywhere on small screens)
    // The prompt says "Mobile only (this is crucial)". I'll use `md:hidden` class.

    return (
        <div className="md:hidden block z-[9999]">

            {/* IDLE MESSAGE */}
            <AnimatePresence>
                {isIdle && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="fixed bottom-24 left-4 right-4 z-[9998]"
                    >
                        <div className="bg-[#FFFBEB] border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_#000] flex items-center justify-between relative">
                            {/* Close button for manual dismiss */}
                            <button onClick={() => setIsIdle(false)} className="absolute -top-2 -right-2 bg-white border border-black rounded-full p-1">
                                <X size={12} />
                            </button>

                            <div className="flex gap-3 items-center">
                                <span className="text-2xl">🤔</span>
                                <div>
                                    <p className="font-bold text-black text-sm">Need help deciding?</p>
                                    <p className="text-black/70 text-xs">Talk to a designer — it’s quick.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STICKY BOTTOM BAR */}
            <motion.div
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "100%" }
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 pb-6 flex gap-4 shadow-[0px_-4px_10px_rgba(0,0,0,0.1)]"
            >
                <button className="flex-1 bg-[#FCD34D] border-2 border-black rounded-full py-3 flex items-center justify-center gap-2 font-bold text-black shadow-sm active:scale-95 transition-transform">
                    <Phone size={18} /> Call
                </button>
                <div className="flex flex-col flex-1">
                    <button className="flex-1 bg-[#25D366] border-2 border-black rounded-full py-3 flex items-center justify-center gap-2 font-bold text-white shadow-sm active:scale-95 transition-transform">
                        <MessageCircle size={18} /> WhatsApp
                    </button>
                    <span className="text-[10px] text-center mt-1 text-black/50 font-bold">Free initial consultation</span>
                </div>
            </motion.div>

        </div>
    );
};

export default MobileInteraction;

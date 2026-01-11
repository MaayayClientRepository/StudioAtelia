import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

const SectionHook = ({ text, type = 'call', btnText }) => {
    const ref = useRef(null);
    // Remove "once: true" so it animates every time it enters/leaves
    // "amount: 0.6" means it triggers when 60% of the element is visible
    const isInView = useInView(ref, { amount: 0.6 });

    // Different icon/CTA based on type
    const isCall = type === 'call';
    const Icon = isCall ? Phone : MessageCircle;
    const actionText = btnText || (isCall ? "Talk to a Designer" : "Let's Discuss");

    return (
        <div ref={ref} className="w-full flex justify-center -mt-8 relative z-40 mb-8 pointer-events-none">
            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 20, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="pointer-events-auto bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border-[3px] border-black shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-4"
            >
                <p className="font-display text-xl md:text-2xl text-black text-center md:text-left leading-none pt-1">
                    {text}
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex shrink-0 items-center gap-2 bg-[#10B981] text-white px-5 py-2.5 rounded-full border-2 border-black shadow-sm hover:shadow-md transition-all"
                >
                    <Icon size={18} />
                    <span className="font-bold font-sans text-sm">{actionText}</span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default SectionHook;

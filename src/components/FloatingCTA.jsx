import React from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { Calendar } from "lucide-react";

const FloatingCTA = ({ progress }) => {
    // Default fallback if no progress provided (acts as constant 0)
    // We use a safe opacity transform that defaults to 1 if progress is missing/null

    // Animation Logic:
    // Animation Logic:
    // Animation Logic:
    // Animation Logic:
    // Animation Logic:
    // 0.88 -> 0.91: Move from Right to Center & Move Up (Immediately after reveal)
    // 0.98 -> 1.0: Fade Out as Footer rises

    // Transforms
    const right = progress
        ? useTransform(progress, [0.88, 0.91], ["2.5rem", "50%"])
        : "2.5rem";

    const bottom = "1.5rem";

    const x = progress
        ? useTransform(progress, [0.88, 0.91], ["0%", "50%"])
        : "0%";

    const ctaY = progress
        ? useTransform(progress, [0.18, 0.24], [40, 0])
        : 0;

    const ctaScale = progress
        ? useTransform(progress, [0.18, 0.24], [0.8, 1])
        : 1;

    const opacity = progress
        ? useTransform(progress, [0, 0.18, 0.24, 0.98, 1.0], [0, 0, 1, 1, 0])
        : 1;

    // Use motion template if needed, but direct style works fine.

    return (
        <motion.div
            style={{
                right,
                bottom,
                x,
                y: ctaY,
                scale: ctaScale,
                opacity,
                zIndex: 100,
                willChange: "transform, opacity, right, bottom"
            }}
            className="fixed z-[100]"
        >
            <motion.button
                whileHover={{
                    x: -2,
                    y: -2,
                    boxShadow: "6px 6px 0px #000"
                }}
                whileTap={{
                    x: 4,
                    y: 4,
                    boxShadow: "0px 0px 0px #000"
                }}
                className="flex items-center gap-3 bg-[#F8D149] text-black px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] transition-shadow duration-200 group"
            >
                <Calendar className="w-5 h-5 stroke-[2.5px]" />
                <span className="text-sm font-black uppercase tracking-wider">Book an Appointment</span>

                {/* Subtle reflection effect for premium feel */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 pointer-events-none" />
            </motion.button>
        </motion.div>
    );
};

export default FloatingCTA;

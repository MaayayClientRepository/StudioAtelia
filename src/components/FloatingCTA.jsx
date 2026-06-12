import React from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { Calendar } from "lucide-react";
import { scrollToProgress } from "../lib/scrollTo";

const FloatingCTA = ({ progress }) => {
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Unconditional Hook Calls to adhere strictly to the Rules of Hooks
    const desktopRight = progress
        ? useTransform(progress, [0.75, 0.80], ["1.5rem", "50%"])
        : "1.5rem";

    const desktopX = progress
        ? useTransform(progress, [0.75, 0.80], ["0%", "50%"])
        : "0%";

    const ctaY = progress
        ? useTransform(progress, [0.13, 0.18], [40, 0])
        : 0;

    const ctaScale = progress
        ? useTransform(progress, [0.13, 0.18, 0.75, 0.80], [0.8, 1, 1, 1.2])
        : 1;

    const opacity = progress
        ? useTransform(progress, [0, 0.13, 0.18, 0.80, 0.83], [0, 0, 1, 1, 0])
        : 1;

    const handleCTAClick = () => {
        scrollToProgress(0.81); // Contact form start
    };

    return (
        <motion.div
            style={{
                right: isMobile ? "50%" : desktopRight,
                bottom: "1.5rem",
                x: isMobile ? "50%" : desktopX,
                y: ctaY,
                scale: ctaScale,
                opacity,
                zIndex: 100,
                willChange: "transform, opacity, right"
            }}
            className="fixed z-[100]"
        >
            <motion.button
                onClick={handleCTAClick}
                whileHover={{
                    x: -2,
                    y: -2,
                    boxShadow: "4px 4px 0px rgba(0,0,0,0.3)"
                }}
                whileTap={{
                    x: 4,
                    y: 4,
                    boxShadow: "0px 0px 0px #000"
                }}
                className="flex items-center gap-2 sm:gap-3 bg-[#F8D149] text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border-2 border-black/60 shadow-[3px_3px_0px_rgba(0,0,0,0.4)] transition-shadow duration-200 group cursor-pointer"
            >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5px]" />
                <span className="text-[10px] sm:text-sm font-black uppercase tracking-wider whitespace-nowrap">Book an Appointment</span>

                {/* Subtle reflection effect for premium feel */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 pointer-events-none" />
            </motion.button>
        </motion.div>
    );
};

export default FloatingCTA;

import React from "react";
import { motion, useTransform } from "framer-motion";

// SVG Components defined as simple line-art:
// 1. Armchair (Front Elevation)
const ArmchairSVG = ({ className }) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Backrest */}
        <path d="M30 30 h40 v25 A 5 5 0 0 1 65 60 h-30 A 5 5 0 0 1 30 55 Z" />
        <path d="M30 42 h40" />
        {/* Seat cushion */}
        <rect x="25" y="60" width="50" height="8" rx="2" />
        {/* Armrests */}
        <path d="M25 60 V 45 A 3 3 0 0 1 28 42 h2 M75 60 V 45 A 3 3 0 0 0 72 42 h-2" />
        {/* Legs */}
        <path d="M28 68 L24 90 M72 68 L76 90 M35 68 L35 82 M65 68 L65 82" />
        <path d="M28 72 h44" />
    </svg>
);

// 2. Sofa (Front Elevation)
const SofaSVG = ({ className }) => (
    <svg
        viewBox="0 0 160 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Back frame */}
        <rect x="15" y="35" width="130" height="35" rx="3" />
        {/* Back cushions */}
        <rect x="20" y="40" width="60" height="25" rx="2" />
        <rect x="80" y="40" width="60" height="25" rx="2" />
        {/* Armrests */}
        <rect x="10" y="52" width="10" height="23" rx="2" />
        <rect x="140" y="52" width="10" height="23" rx="2" />
        {/* Seat cushions */}
        <rect x="20" y="65" width="60" height="10" rx="1" />
        <rect x="80" y="65" width="60" height="10" rx="1" />
        {/* Legs */}
        <path d="M15 75 L15 88 M145 75 L145 88 M80 75 L80 88" />
        {/* Floor line */}
        <line x1="8" y1="88" x2="152" y2="88" strokeDasharray="2 2" />
    </svg>
);

// 3. Dining Table & Pendant (Elevation Profile)
const DiningSVG = ({ className }) => (
    <svg
        viewBox="0 0 140 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Pendant Light */}
        <line x1="70" y1="5" x2="70" y2="30" />
        <path d="M55 30 h30 L75 20 H65 Z" />
        <path d="M60 30 a10 10 0 0 0 20 0" />
        <line x1="70" y1="35" x2="70" y2="45" strokeDasharray="2 2" />
        {/* Dining Table */}
        <rect x="30" y="60" width="80" height="4" rx="1" />
        <path d="M35 64 L35 90 M105 64 L105 90" />
        {/* Left Chair */}
        <path d="M22 50 h12 v12 H22 Z" />
        <path d="M22 50 V82" />
        <path d="M25 62 L25 90 M31 62 L31 90" />
        {/* Right Chair */}
        <path d="M106 50 h12 v12 H106 Z" />
        <path d="M118 50 V82" />
        <path d="M109 62 L109 90 M115 62 L115 90" />
        {/* Floor Line */}
        <line x1="15" y1="90" x2="125" y2="90" strokeDasharray="2 2" />
    </svg>
);

// 4. Credenza / Sideboard (Front Elevation)
const CredenzaSVG = ({ className }) => (
    <svg
        viewBox="0 0 120 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Cabinet body */}
        <rect x="15" y="45" width="90" height="35" rx="2" />
        {/* Panels / Doors */}
        <line x1="45" y1="45" x2="45" y2="80" />
        <line x1="75" y1="45" x2="75" y2="80" />
        {/* Details - Drawers */}
        <line x1="15" y1="56" x2="45" y2="56" />
        <line x1="15" y1="68" x2="45" y2="68" />
        {/* Handles */}
        <rect x="28" y="50" width="4" height="1.5" rx="0.5" />
        <rect x="28" y="61" width="4" height="1.5" rx="0.5" />
        <rect x="28" y="73" width="4" height="1.5" rx="0.5" />
        <line x1="55" y1="58" x2="55" y2="66" />
        <line x1="65" y1="58" x2="65" y2="66" />
        {/* Legs */}
        <path d="M22 80 L18 92 M98 80 L102 92 M60 80 L60 92" />
        {/* Decor: Vase & Leaf */}
        <path d="M83 45 L83 35 A 3 3 0 0 1 86 32 h2 a 3 3 0 0 1 3 3 v10 Z" />
        <path d="M87 32 Q93 20 89 15 Q86 25 87 32" />
        {/* Decor: Stack of books */}
        <rect x="52" y="41" width="18" height="4" rx="0.5" />
        <rect x="54" y="37" width="14" height="4" rx="0.5" />
    </svg>
);

const FurnitureSketches = ({ progress, theme = "dark", mobileOnly = false }) => {
    // Parallel, uniform scroll parallax: shift upward by same amount
    const yOffset = useTransform(progress, [0, 1], [30, -50]);

    // Fades out uniformly as the section is scrolled past
    const sketchesOpacity = useTransform(progress, [0.85, 0.98], [1, 0]);

    // Use theme-tailored class names with extremely low color/contrast
    // Dark theme uses accent color (brass/beige) at low opacity
    // Light theme uses muted brown/gray color at low opacity
    const colorClass = theme === "dark" 
        ? "text-accent/30 hover:text-accent/50 transition-colors duration-500" 
        : "text-muted/30 hover:text-muted/50 transition-colors duration-500";

    return (
        <motion.div 
            style={{ opacity: sketchesOpacity }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
        >
            {/* Desktop Layout (Symmetric margins, perfectly aligned) */}
            {!mobileOnly && (
                <div className="hidden md:block absolute inset-0">
                    {/* Left Margin Column */}
                    <motion.div style={{ y: yOffset }} className="absolute top-[18%] left-[6%] w-40 h-40">
                        <ArmchairSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute bottom-[18%] left-[6%] w-48 h-48">
                        <DiningSVG className={colorClass} />
                    </motion.div>

                    {/* Right Margin Column */}
                    <motion.div style={{ y: yOffset }} className="absolute top-[18%] right-[6%] w-52 h-52">
                        <SofaSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute bottom-[18%] right-[6%] w-44 h-44">
                        <CredenzaSVG className={colorClass} />
                    </motion.div>
                </div>
            )}

            {/* Mobile Layout (Fewer elements, scaled down, no clutter) */}
            <div className="md:hidden absolute inset-0">
                {/* Top Left element */}
                <motion.div style={{ y: yOffset }} className="absolute top-[14%] left-[4%] w-24 h-24">
                    <ArmchairSVG className={colorClass} />
                </motion.div>
                
                {/* Bottom Right element */}
                <motion.div style={{ y: yOffset }} className="absolute bottom-[14%] right-[4%] w-28 h-28">
                    <CredenzaSVG className={colorClass} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FurnitureSketches;

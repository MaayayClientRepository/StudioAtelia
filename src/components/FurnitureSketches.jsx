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

// 5. Floor Lamp (Elevation Profile)
const FloorLampSVG = ({ className }) => (
    <svg
        viewBox="0 0 80 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Base */}
        <path d="M 25 110 h 30" />
        <path d="M 40 110 V 30" />
        {/* Curved arm / top stem */}
        <path d="M 40 30 Q 40 15 50 15 h 10" />
        {/* Lamp shade */}
        <path d="M 54 22 L 50 35 h 20 L 66 22 Z" />
        {/* Bulb/Light glow lines */}
        <line x1="53" y1="42" x2="48" y2="52" strokeDasharray="2 2" />
        <line x1="60" y1="42" x2="60" y2="54" strokeDasharray="2 2" />
        <line x1="67" y1="42" x2="72" y2="52" strokeDasharray="2 2" />
    </svg>
);

// 6. Coffee Table (Elevation Profile)
const CoffeeTableSVG = ({ className }) => (
    <svg
        viewBox="0 0 100 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Table top */}
        <rect x="15" y="45" width="70" height="3" rx="1" />
        {/* Crossed legs */}
        <path d="M 22 48 L 35 70 M 78 48 L 65 70" />
        <path d="M 30 48 L 70 70 M 70 48 L 30 70" />
        <path d="M 35 70 h 30" />
        {/* Decor on top: books and vase */}
        <rect x="25" y="41" width="15" height="4" rx="0.5" />
        <path d="M 60 45 L 60 38 a 2 2 0 0 1 2 -2 h 2 a 2 2 0 0 1 2 2 v 7 Z" />
        <path d="M 63 36 Q 66 28 65 24" />
    </svg>
);

// 7. Lounge Chair & Ottoman (Elevation Profile)
const LoungeChairSVG = ({ className }) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Backrest angled */}
        <path d="M 25 30 L 40 65" />
        {/* Cushions */}
        <path d="M 38 64 L 70 55" />
        <path d="M 38 67 L 70 58" />
        <path d="M 70 55 V 58" />
        {/* Legs & base frame */}
        <path d="M 32 66 L 32 85 M 55 61 L 55 85" />
        <path d="M 25 85 h 40" />
        {/* Ottoman */}
        <path d="M 74 68 h 18 v 5 H 74 Z" />
        <path d="M 77 73 L 77 85 M 89 73 L 89 85" />
        <path d="M 75 85 h 16" />
    </svg>
);

// 8. Pendant Light (Triple Cluster)
const PendantLightSVG = ({ className }) => (
    <svg
        viewBox="0 0 80 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Ceiling plate */}
        <path d="M 20 10 h 40" />
        {/* Hanging cords */}
        <line x1="30" y1="10" x2="30" y2="45" />
        <line x1="40" y1="10" x2="40" y2="70" />
        <line x1="50" y1="10" x2="50" y2="35" />
        {/* Left Pendant */}
        <path d="M 25 45 h 10 L 33 37 h -6 Z" />
        <circle cx="30" cy="48" r="1.5" fill="currentColor" />
        {/* Middle Pendant */}
        <path d="M 35 70 h 10 L 43 62 h -6 Z" />
        <circle cx="40" cy="73" r="1.5" fill="currentColor" />
        {/* Right Pendant */}
        <path d="M 45 35 h 10 L 53 27 h -6 Z" />
        <circle cx="50" cy="38" r="1.5" fill="currentColor" />
    </svg>
);

const FurnitureSketches = ({ progress, theme = "dark", mobileOnly = false, fadeOutRange = [0.85, 0.98] }) => {
    // Parallel, uniform scroll parallax: shift upward by same amount
    const yOffset = useTransform(progress, [0, 1], [30, -50]);

    // Fades out uniformly as the section is scrolled past
    const sketchesOpacity = useTransform(progress, fadeOutRange, [1, 0]);

    // The sweet spot: visible fine-line sketches that remain clearly in the background
    const colorClass = theme === "dark" 
        ? "text-accent/16 hover:text-accent/30 transition-colors duration-500" 
        : "text-muted/22 hover:text-muted/40 transition-colors duration-500";

    return (
        <motion.div 
            style={{ opacity: sketchesOpacity }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
        >
            {/* Desktop Layout (Staggered, organic moodboard composition) */}
            {!mobileOnly && (
                <div className="hidden md:block absolute inset-0">
                    {/* Left Margin / Scattered Elements */}
                    <motion.div style={{ y: yOffset }} className="absolute top-[5%] left-[18%] w-32 h-40">
                        <PendantLightSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute top-[28%] left-[4%] w-36 h-36 -rotate-3">
                        <ArmchairSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute top-[55%] left-[22%] w-32 h-44 rotate-2">
                        <FloorLampSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute top-[76%] left-[6%] w-44 h-44 -rotate-1">
                        <DiningSVG className={colorClass} />
                    </motion.div>

                    {/* Right Margin / Scattered Elements */}
                    <motion.div style={{ y: yOffset }} className="absolute top-[6%] right-[14%] w-48 h-48 rotate-2">
                        <SofaSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute top-[32%] right-[5%] w-36 h-36 -rotate-3">
                        <CoffeeTableSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute top-[58%] right-[20%] w-36 h-36 rotate-3">
                        <LoungeChairSVG className={colorClass} />
                    </motion.div>
                    <motion.div style={{ y: yOffset }} className="absolute top-[74%] right-[8%] w-40 h-40 -rotate-2">
                        <CredenzaSVG className={colorClass} />
                    </motion.div>
                </div>
            )}

            {/* Mobile Layout (Scattered behind the text area in the center) */}
            <div className="md:hidden absolute inset-0">
                {/* Armchair (Center-Left behind text) */}
                <motion.div style={{ y: yOffset }} className="absolute top-[32%] left-[8%] w-24 h-24 rotate-[4deg]">
                    <ArmchairSVG className={colorClass} />
                </motion.div>
                
                {/* Floor Lamp (Top-Right behind text) */}
                <motion.div style={{ y: yOffset }} className="absolute top-[22%] right-[12%] w-20 h-28 -rotate-[5deg]">
                    <FloorLampSVG className={colorClass} />
                </motion.div>

                {/* Lounge Chair (Center-Left lower behind text) */}
                <motion.div style={{ y: yOffset }} className="absolute top-[52%] left-[12%] w-22 h-22 -rotate-[3deg]">
                    <LoungeChairSVG className={colorClass} />
                </motion.div>

                {/* Credenza (Bottom-Right lower behind text) */}
                <motion.div style={{ y: yOffset }} className="absolute top-[58%] right-[6%] w-26 h-26 rotate-[2deg]">
                    <CredenzaSVG className={colorClass} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FurnitureSketches;

import React from "react";
import { motion, useTransform } from "framer-motion";

const FurnitureSketches = ({ progress, theme = "dark", mobileOnly = false, fadeOutRange = [0.85, 0.98] }) => {
    const [isMobile, setIsMobile] = React.useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Parallel, uniform scroll parallax: shift upward by same amount
    // Disabled on mobile to prevent expensive SVG pattern re-rasterization during scroll
    const yTransform = useTransform(progress, [0, 1], [0, -50]);
    const yOffset = isMobile ? 0 : yTransform;

    // Fades out uniformly as the section is scrolled past
    const sketchesOpacity = useTransform(progress, fadeOutRange, [1, 0]);

    // Stroke color opacity configuration (reduced significantly on mobile to prevent text readability issues)
    const strokeColor = theme === "dark" 
        ? (isMobile ? "rgba(191, 168, 143, 0.08)" : "rgba(191, 168, 143, 0.28)")
        : (isMobile ? "rgba(18, 18, 18, 0.06)" : "rgba(18, 18, 18, 0.26)");

    return (
        <motion.div 
            style={{ opacity: sketchesOpacity, y: yOffset }}
            className={`absolute -top-0 -left-0 -right-0 bottom-[-100px] pointer-events-none overflow-hidden select-none ${mobileOnly ? "md:hidden" : ""}`}
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    {/* SVG Doodles as reusable symbols */}
                    {/* 1. Armchair */}
                    <symbol id="armchair" viewBox="0 0 100 100">
                        <path d="M30 30 h40 v25 A 5 5 0 0 1 65 60 h-30 A 5 5 0 0 1 30 55 Z" />
                        <path d="M30 42 h40" />
                        <rect x="25" y="60" width="50" height="8" rx="2" />
                        <path d="M25 60 V 45 A 3 3 0 0 1 28 42 h2 M75 60 V 45 A 3 3 0 0 0 72 42 h-2" />
                        <path d="M28 68 L24 90 M72 68 L76 90 M35 68 L35 82 M65 68 L65 82" />
                        <path d="M28 72 h44" />
                    </symbol>

                    {/* 2. Sofa */}
                    <symbol id="sofa" viewBox="0 0 160 100">
                        <rect x="15" y="35" width="130" height="35" rx="3" />
                        <rect x="20" y="40" width="60" height="25" rx="2" />
                        <rect x="80" y="40" width="60" height="25" rx="2" />
                        <rect x="10" y="52" width="10" height="23" rx="2" />
                        <rect x="140" y="52" width="10" height="23" rx="2" />
                        <rect x="20" y="65" width="60" height="10" rx="1" />
                        <rect x="80" y="65" width="60" height="10" rx="1" />
                        <path d="M15 75 L15 88 M145 75 L145 88 M80 75 L80 88" />
                        <line x1="8" y1="88" x2="152" y2="88" strokeDasharray="2 2" />
                    </symbol>

                    {/* 3. Dining Table */}
                    <symbol id="dining" viewBox="0 0 140 100">
                        <line x1="70" y1="5" x2="70" y2="30" />
                        <path d="M55 30 h30 L75 20 H65 Z" />
                        <path d="M60 30 a10 10 0 0 0 20 0" />
                        <line x1="70" y1="35" x2="70" y2="45" strokeDasharray="2 2" />
                        <rect x="30" y="60" width="80" height="4" rx="1" />
                        <path d="M35 64 L35 90 M105 64 L105 90" />
                        <path d="M22 50 h12 v12 H22 Z" />
                        <path d="M22 50 V82" />
                        <path d="M25 62 L25 90 M31 62 L31 90" />
                        <path d="M106 50 h12 v12 H106 Z" />
                        <path d="M118 50 V82" />
                        <path d="M109 62 L109 90 M115 62 L115 90" />
                        <line x1="15" y1="90" x2="125" y2="90" strokeDasharray="2 2" />
                    </symbol>

                    {/* 4. Credenza */}
                    <symbol id="credenza" viewBox="0 0 120 100">
                        <rect x="15" y="45" width="90" height="35" rx="2" />
                        <line x1="45" y1="45" x2="45" y2="80" />
                        <line x1="75" y1="45" x2="75" y2="80" />
                        <line x1="15" y1="56" x2="45" y2="56" />
                        <line x1="15" y1="68" x2="45" y2="68" />
                        <rect x="28" y="50" width="4" height="1.5" rx="0.5" />
                        <rect x="28" y="61" width="4" height="1.5" rx="0.5" />
                        <rect x="28" y="73" width="4" height="1.5" rx="0.5" />
                        <line x1="55" y1="58" x2="55" y2="66" />
                        <line x1="65" y1="58" x2="65" y2="66" />
                        <path d="M22 80 L18 92 M98 80 L102 92 M60 80 L60 92" />
                        <path d="M83 45 L83 35 A 3 3 0 0 1 86 32 h2 a 3 3 0 0 1 3 3 v10 Z" />
                        <path d="M87 32 Q93 20 89 15 Q86 25 87 32" />
                        <rect x="52" y="41" width="18" height="4" rx="0.5" />
                        <rect x="54" y="37" width="14" height="4" rx="0.5" />
                    </symbol>

                    {/* 5. Floor Lamp */}
                    <symbol id="floorlamp" viewBox="0 0 80 120">
                        <path d="M 25 110 h 30" />
                        <path d="M 40 110 V 30" />
                        <path d="M 40 30 Q 40 15 50 15 h 10" />
                        <path d="M 54 22 L 50 35 h 20 L 66 22 Z" />
                        <line x1="53" y1="42" x2="48" y2="52" strokeDasharray="2 2" />
                        <line x1="60" y1="42" x2="60" y2="54" strokeDasharray="2 2" />
                        <line x1="67" y1="42" x2="72" y2="52" strokeDasharray="2 2" />
                    </symbol>

                    {/* 6. Coffee Table */}
                    <symbol id="coffeetable" viewBox="0 0 100 80">
                        <rect x="15" y="45" width="70" height="3" rx="1" />
                        <path d="M 22 48 L 35 70 M 78 48 L 65 70" />
                        <path d="M 30 48 L 70 70 M 70 48 L 30 70" />
                        <path d="M 35 70 h 30" />
                        <rect x="25" y="41" width="15" height="4" rx="0.5" />
                        <path d="M 60 45 L 60 38 a 2 2 0 0 1 2 -2 h 2 a 2 2 0 0 1 2 2 v 7 Z" />
                        <path d="M 63 36 Q 66 28 65 24" />
                    </symbol>

                    {/* 7. Lounge Chair */}
                    <symbol id="loungechair" viewBox="0 0 100 100">
                        <path d="M 25 30 L 40 65" />
                        <path d="M 38 64 L 70 55" />
                        <path d="M 38 67 L 70 58" />
                        <path d="M 70 55 V 58" />
                        <path d="M 32 66 L 32 85 M 55 61 L 55 85" />
                        <path d="M 45 35 h 10 L 53 27 h -6 Z" />
                    </symbol>

                    {/* 9. Potted Plant */}
                    <symbol id="plant" viewBox="0 0 100 100">
                        <path d="M35 70 L40 90 h20 L65 70 Z" />
                        <rect x="32" y="65" width="36" height="5" rx="1" />
                        <path d="M50 65 Q50 30 35 25 Q45 40 50 65" />
                        <path d="M50 65 Q50 25 65 20 Q55 35 50 65" />
                        <path d="M50 65 Q35 45 20 45 Q35 55 50 65" />
                        <path d="M50 65 Q65 45 80 45 Q65 55 50 65" />
                        <line x1="50" y1="65" x2="50" y2="15" />
                    </symbol>

                    {/* 10. Floor Plan Grid */}
                    <symbol id="floorplan" viewBox="0 0 100 100">
                        <rect x="10" y="10" width="80" height="80" rx="3" />
                        <path d="M10 50 h40 V90 M50 50 h40 M35 10 v40 M70 10 v40 M70 70 h20" />
                        <path d="M50 90 A 15 15 0 0 1 35 75" strokeDasharray="2 2" />
                        <line x1="50" y1="90" x2="50" y2="75" />
                        <path d="M70 50 A 20 20 0 0 1 90 70" strokeDasharray="2 2" />
                        <line x1="70" y1="50" x2="90" y2="50" />
                    </symbol>

                    {/* 11. Ruler & Pencil */}
                    <symbol id="rulerpencil" viewBox="0 0 100 100">
                        <rect x="15" y="45" width="70" height="12" rx="1" transform="rotate(-30 50 50)" />
                        <path d="M25 45 v4 M35 45 v4 M45 45 v4 M55 45 v4 M65 45 v4 M75 45 v4" transform="rotate(-30 50 50)" />
                        <path d="M30 35 L70 75 M70 75 L73 72 M30 35 L27 38 M27 38 L22 30 L30 35" />
                    </symbol>

                    {/* 12. Desk Lamp */}
                    <symbol id="desklamp" viewBox="0 0 100 100">
                        <path d="M35 85 h30 M50 85 V60 M50 60 L65 40 M65 40 L55 25" />
                        <path d="M45 25 L75 25 L68 12 L52 12 Z" />
                        <circle cx="60" cy="28" r="3" />
                    </symbol>

                    {/* 13. Wall Clock */}
                    <symbol id="clock" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="35" />
                        <circle cx="50" cy="50" r="2" />
                        <path d="M50 50 V25 M50 50 L65 60" />
                        <path d="M50 15 v5 M50 85 v-5 M15 50 h5 M85 50 h-5" />
                    </symbol>

                    {/* 14. Coffee Mug */}
                    <symbol id="mug" viewBox="0 0 100 100">
                        <rect x="30" y="35" width="40" height="45" rx="5" />
                        <path d="M70 45 C82 45 82 70 70 70" />
                        <path d="M40 25 Q43 18 40 12 M50 25 Q53 18 50 12 M60 25 Q63 18 60 12" />
                    </symbol>

                    {/* 15. Picture Frame */}
                    <symbol id="frame" viewBox="0 0 100 100">
                        <rect x="20" y="15" width="60" height="70" rx="2" />
                        <rect x="26" y="21" width="48" height="58" />
                        <circle cx="50" cy="40" r="6" />
                        <path d="M30 70 L45 50 L55 62 L68 45 L74 70 Z" />
                    </symbol>

                    {/* 16. Architect's Compass */}
                    <symbol id="compass" viewBox="0 0 100 100">
                        <path d="M50 15 L50 25 M50 25 L35 75 M50 25 L65 75" />
                        <path d="M32 75 h6 M62 75 h6 M42 50 h16" />
                        <circle cx="50" cy="25" r="2.5" />
                    </symbol>

                    {/* Repeating Pattern of scattered interior design doodles for DESKTOP */}
                    <pattern id="furniture-doodles-desktop" width="180" height="180" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke={strokeColor} strokeWidth={1.4 / 0.55} strokeLinecap="round" strokeLinejoin="round" transform="scale(0.55)">
                            {/* Row 1 */}
                            <use href="#armchair" x="20" y="20" width="50" height="50" transform="rotate(-5 45 45)" />
                            <use href="#sofa" x="90" y="10" width="70" height="44" transform="rotate(2 125 32)" />
                            <use href="#floorlamp" x="180" y="5" width="40" height="60" transform="rotate(5 200 35)" />
                            <use href="#plant" x="240" y="15" width="50" height="50" transform="rotate(-10 265 40)" />
                            <use href="#pendant" x="310" y="10" width="40" height="60" />

                            {/* Row 2 */}
                            <use href="#coffeetable" x="15" y="100" width="50" height="40" transform="rotate(8 40 120)" />
                            <use href="#clock" x="90" y="95" width="40" height="40" />
                            <use href="#credenza" x="150" y="90" width="60" height="50" transform="rotate(-3 180 115)" />
                            <use href="#mug" x="230" y="105" width="35" height="35" transform="rotate(15 247 122)" />
                            <use href="#dining" x="280" y="95" width="65" height="46" transform="rotate(2 312 118)" />

                            {/* Row 3 */}
                            <use href="#floorplan" x="10" y="180" width="55" height="55" transform="rotate(-6 37 207)" />
                            <use href="#loungechair" x="90" y="170" width="50" height="50" transform="rotate(4 115 195)" />
                            <use href="#desklamp" x="165" y="180" width="40" height="40" transform="rotate(-12 185 200)" />
                            <use href="#rulerpencil" x="225" y="175" width="45" height="45" transform="rotate(25 247 197)" />
                            <use href="#frame" x="290" y="170" width="50" height="58" transform="rotate(3 315 199)" />

                            {/* Row 4 */}
                            <use href="#compass" x="35" y="270" width="40" height="40" transform="rotate(-15 55 290)" />
                            <use href="#armchair" x="110" y="265" width="45" height="45" transform="rotate(12 132 287)" />
                            <use href="#plant" x="175" y="260" width="45" height="45" transform="rotate(8 197 282)" />
                            <use href="#sofa" x="240" y="270" width="65" height="41" transform="rotate(-4 272 290)" />
                            <use href="#clock" x="320" y="270" width="35" height="35" transform="rotate(20 337 287)" />
                        </g>
                    </pattern>

                    {/* Repeating Pattern of scattered interior design doodles for MOBILE */}
                    <pattern id="furniture-doodles-mobile" width="95" height="95" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke={strokeColor} strokeWidth={1.4 / 0.32} strokeLinecap="round" strokeLinejoin="round" transform="scale(0.32)">
                            {/* Row 1 */}
                            <use href="#armchair" x="20" y="20" width="50" height="50" transform="rotate(-5 45 45)" />
                            <use href="#sofa" x="90" y="10" width="70" height="44" transform="rotate(2 125 32)" />
                            <use href="#floorlamp" x="180" y="5" width="40" height="60" transform="rotate(5 200 35)" />
                            <use href="#plant" x="240" y="15" width="50" height="50" transform="rotate(-10 265 40)" />
                            <use href="#pendant" x="310" y="10" width="40" height="60" />

                            {/* Row 2 */}
                            <use href="#coffeetable" x="15" y="100" width="50" height="40" transform="rotate(8 40 120)" />
                            <use href="#clock" x="90" y="95" width="40" height="40" />
                            <use href="#credenza" x="150" y="90" width="60" height="50" transform="rotate(-3 180 115)" />
                            <use href="#mug" x="230" y="105" width="35" height="35" transform="rotate(15 247 122)" />
                            <use href="#dining" x="280" y="95" width="65" height="46" transform="rotate(2 312 118)" />

                            {/* Row 3 */}
                            <use href="#floorplan" x="10" y="180" width="55" height="55" transform="rotate(-6 37 207)" />
                            <use href="#loungechair" x="90" y="170" width="50" height="50" transform="rotate(4 115 195)" />
                            <use href="#desklamp" x="165" y="180" width="40" height="40" transform="rotate(-12 185 200)" />
                            <use href="#rulerpencil" x="225" y="175" width="45" height="45" transform="rotate(25 247 197)" />
                            <use href="#frame" x="290" y="170" width="50" height="58" transform="rotate(3 315 199)" />

                            {/* Row 4 */}
                            <use href="#compass" x="35" y="270" width="40" height="40" transform="rotate(-15 55 290)" />
                            <use href="#armchair" x="110" y="265" width="45" height="45" transform="rotate(12 132 287)" />
                            <use href="#plant" x="175" y="260" width="45" height="45" transform="rotate(8 197 282)" />
                            <use href="#sofa" x="240" y="270" width="65" height="41" transform="rotate(-4 272 290)" />
                            <use href="#clock" x="320" y="270" width="35" height="35" transform="rotate(20 337 287)" />
                        </g>
                    </pattern>
                </defs>

                {/* Render Desktop Rect */}
                <rect width="100%" height="100%" fill="url(#furniture-doodles-desktop)" className="hidden md:block" />

                {/* Render Mobile Rect */}
                <rect width="100%" height="100%" fill="url(#furniture-doodles-mobile)" className="block md:hidden" />
            </svg>
        </motion.div>
    );
};

export default FurnitureSketches;

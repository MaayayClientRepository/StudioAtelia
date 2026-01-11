import React, { useRef, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const DragContext = createContext(null);

export const DraggableCardContainer = ({ children, className }) => {
    const containerRef = useRef(null);

    returnb (
        <DragContext.Provider value={containerRef}>
            <div
                ref={containerRef}
                className={cn("relative w-full h-full", className)}
            >
                {children}
            </div>
        </DragContext.Provider>
    );
};

export const DraggableCardBody = ({ children, className }) => {
    const containerRef = useContext(DragContext);

    return (
        <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.05, zIndex: 50 }}
            whileHover={{ scale: 1.02 }}
            className={cn("cursor-grab active:cursor-grabbing", className)}
        >
            {children}
        </motion.div>
    );
};

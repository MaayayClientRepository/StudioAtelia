import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle, Phone } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`border-2 border-black rounded-2xl overflow-hidden cursor-pointer transition-colors ${isOpen ? 'bg-[#FFFBEB]' : 'bg-white hover:bg-gray-50'}`}
        >
            <motion.div layout className="p-4 flex items-center justify-between gap-4">
                <span className="font-display text-lg text-black leading-tight flex-1">
                    ❓ {question}
                </span>
                <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#FF7F50] text-white' : 'bg-gray-100 text-black'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 text-black/80 font-sans font-medium border-t-2 border-dashed border-black/10">
                            ✅ {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const AccordionFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [openedCount, setOpenedCount] = useState(0);

    const questions = [
        { q: "Is pricing transparent?", a: "Yes. Every cost is explained before execution. No surprises." },
        { q: "Do you handle execution?", a: "Yes. From design to contractors to final handover." },
        { q: "Can we customize designs?", a: "Always. Nothing is forced. It's your home." },
    ];

    const handleClick = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
            // Increment opened count if unique (simple logic: just increment every open)
            setOpenedCount(prev => prev + 1);
        }
    };

    return (
        <section className="py-16 px-4 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="text-black" />
                <h3 className="font-display text-2xl text-black">Common Questions Before You Call</h3>
            </div>

            <div className="flex flex-col gap-4">
                {questions.map((item, i) => (
                    <FAQItem
                        key={i}
                        question={item.q}
                        answer={item.a}
                        isOpen={openIndex === i}
                        onClick={() => handleClick(i)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {openedCount >= 2 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-6 overflow-hidden"
                    >
                        <div className="bg-[#E0F2FE] border-2 border-black rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#000]">
                            <div>
                                <p className="font-bold text-black text-sm">Looks like you have questions.</p>
                                <p className="text-black/70 text-xs">Let’s clear them on a quick call.</p>
                            </div>
                            <button className="bg-[#FCD34D] text-black px-4 py-2 rounded-lg border-2 border-black font-bold flex items-center gap-2 text-sm hover:scale-105 transition-transform whitespace-nowrap">
                                <Phone size={14} /> Call Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AccordionFAQ;

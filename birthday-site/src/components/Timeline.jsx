import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const MILESTONES = [
    {
        year: "2005",
        title: "The World Got Louder",
        desc: "A girl with the biggest laugh and the biggest heart was born — and life has been more interesting ever since."
    },
    {
        year: "2010",
        title: "Tiny Human, Big Personality",
        desc: "Already stubborn, already dramatic, already destined to argue with confidence."
    },
    {
        year: "2022",
        title: "College Era Activated",
        desc: "New friendships, late nights, last-minute studying, and memories that will last forever."
    },
    {
        year: "2023",
        title: "The Rebirth of Gorlock the Destroyer",
        desc: "A legendary era of chaos, unstoppable hunger, passionate debates, and treating the world like one giant sandwich."
    },
    {
        year: "2024",
        title: "Professional Procrastinator",
        desc: "Mastering the art of starting to study exactly two days before the exam — and somehow surviving."
    },
    {
        year: "2025",
        title: "The Storm Phase",
        desc: "A year of change, confusion, and growth — sometimes hurting others without meaning to, while trying to figure everything out."
    },
    {
        year: "2026",
        title: "Chapter 21 — Becoming Better",
        desc: "Learning, healing, and choosing kindness again. Stronger, wiser, and still deeply loved. The best version is still unfolding."
    }
];

export const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="py-32 relative max-w-4xl mx-auto px-6">
            <h2 className="text-[#008080] font-serif italic text-3xl tracking-widest uppercase text-center mb-20">
                The Journey
            </h2>

            {/* Central Line (Static Background) */}
            <div className="absolute left-1/2 top-48 bottom-0 w-[2px] bg-[#b2d8d8]/20 -translate-x-1/2" />

            {/* Animated Progress Line */}
            <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute left-1/2 top-48 bottom-0 w-[2px] bg-[#008080] -translate-x-1/2 z-10"
            />

            <div className="space-y-24 relative z-20">
                {MILESTONES.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`relative flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                            }`}
                    >
                        {/* Dot on line */}
                        <div className="absolute left-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#008080] -translate-x-1/2 z-30 shadow-[0_0_10px_rgba(0,128,128,0.3)]" />

                        <div className={`w-[42%] ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            <span className="text-[#008080] font-bold text-2xl font-serif">
                                {item.year}
                            </span>
                            <h3 className="text-[#004d4d] font-bold text-lg mt-1">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm mt-2 italic leading-relaxed">
                                {item.desc}
                            </p>
                        </div>

                        {/* Empty spacer for the other side of the timeline */}
                        <div className="w-[42%]" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
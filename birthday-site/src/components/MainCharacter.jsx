import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HEADLINES = [
    {
        title: "UNMATCHED MAIN CHARACTER ENERGY",
        subtitle: "Thinking shes got it all, she does, but lets watch her scream for life, shall we?",
        align: "left"
    },
    {
        title: "HUMOR LEVELS HIT NEW PEAK",
        subtitle: "mikey.com sources confirm her jokes are gonna drop 200% down than last year. how much more should we handle :)",
        align: "right"
    },
    {
        title: "KINDNESS AWARD RECIPIENT",
        subtitle: "Confirmed, shes a real raging bull, but im betting her heart is staying as pure as snow.",
        align: "left"
    },
    {
        title: "ESTABLISHED 2005: JUDI BEKHTESAR",
        subtitle: "Watch out supermarkets, judi is coming.",
        align: "right"
    }
];

export const MainCharacter = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the background text
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className="relative py-32 bg-[#004d4d] overflow-hidden">

            {/* --- KINETIC BACKGROUND --- */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 flex flex-col justify-around opacity-[0.04] select-none pointer-events-none"
            >
                {[...Array(3)].map((_, i) => (
                    <h2 key={i} className="text-[12rem] sm:text-[20rem] font-serif italic text-white whitespace-nowrap leading-none">
                        JUDI GAIL JUDI GAIL JUDI GAIL
                    </h2>
                ))}
            </motion.div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="space-y-40 sm:space-y-64">
                    {HEADLINES.map((item, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${item.align === 'left' ? 'items-start text-left' : 'items-end text-right'}`}
                        >
                            {/* Animated Line Number */}
                            <motion.div
                                variants={{
                                    hidden: { width: 0, opacity: 0 },
                                    visible: { width: "100px", opacity: 0.6 }
                                }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="h-[1px] bg-[#b2d8d8] mb-4"
                            />

                            <motion.span
                                variants={{
                                    hidden: { opacity: 0, x: item.align === 'left' ? -20 : 20 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className="text-[#b2d8d8] font-mono text-xs tracking-[0.6em] uppercase mb-6"
                            >
                                Feature // 0{i + 1}
                            </motion.span>

                            {/* Headline with Mask Reveal */}
                            <div className="overflow-hidden">
                                <motion.h3
                                    variants={{
                                        hidden: { y: "100%" },
                                        visible: { y: 0 }
                                    }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-white font-serif text-4xl sm:text-8xl mb-8 leading-[1] tracking-tighter uppercase max-w-3xl"
                                >
                                    {item.title}
                                </motion.h3>
                            </div>

                            {/* Subtitle with Fade-In Scale */}
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95 },
                                    visible: { opacity: 0.7, scale: 1 }
                                }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-[#b2d8d8] text-lg sm:text-2xl font-light italic max-w-xl leading-relaxed"
                            >
                                "{item.subtitle}"
                            </motion.p>
                        </motion.div>
                    ))}

                    {/* --- FINAL "ICON" REVEAL --- */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative pt-20 flex flex-col items-center"
                    >
                        {/* Glowing Ring behind the Crown */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute w-64 h-64 bg-[#b2d8d8] rounded-full blur-[80px] -z-10"
                        />

                        <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            className="text-9xl cursor-default mb-10 drop-shadow-[0_0_25px_rgba(178,216,216,0.5)]"
                        >
                            👑
                        </motion.div>

                        <div className="text-center space-y-4">
                            <h3 className="text-white font-serif text-5xl sm:text-8xl italic">
                                Twenty One
                            </h3>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-[1px] bg-gradient-to-r from-transparent via-[#b2d8d8] to-transparent mx-auto"
                            />
                            <h3 className="text-[#b2d8d8] font-serif text-4xl sm:text-7xl opacity-80">
                                & Fearless
                            </h3>
                        </div>

                        <p className="text-[#b2d8d8] font-mono text-[10px] tracking-[0.8em] mt-16 uppercase opacity-30">
                            The Legend Continues // 2026
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
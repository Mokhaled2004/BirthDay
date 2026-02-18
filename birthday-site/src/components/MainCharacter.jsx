import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HEADLINES = [
    {
        title: "UNMATCHED MAIN CHARACTER ENERGY",
        subtitle: "Judi officially enters her 21st year, world leaders are reportedly taking notes on her vibe."
    },
    {
        title: "HUMOR LEVELS HIT NEW PEAK",
        subtitle: "Local sources confirm her jokes are now 200% more contagious than last year."
    },
    {
        title: "KINDNESS AWARD RECIPIENT",
        subtitle: "Confirmed: The heart of gold is real, and it’s officially turning twenty-one today."
    },
    {
        title: "ESTABLISHED 2005: THE ICON",
        subtitle: "From a legendary beginning to a flawless future. The best is yet to come."
    }
];

export const MainCharacter = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Moves the content horizontally
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-[#004d4d]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* --- VOGUE BORDER FRAME --- */}
                <div className="absolute inset-0 z-50 pointer-events-none border-[20px] sm:border-[40px] border-[#004d4d]" />
                <div className="absolute inset-4 sm:inset-10 z-50 pointer-events-none border border-[#b2d8d8]/30" />

                {/* Paparazzi Flash Pulse */}
                <motion.div
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.1, 1] }}
                    className="absolute inset-0 bg-white pointer-events-none z-10"
                />

                {/* Horizontal Content */}
                <motion.div style={{ x }} className="flex gap-40 px-40 items-center">

                    {/* The Intro Big Text */}
                    <div className="flex-shrink-0">
                        <h2 className="text-[#f0f9f9] text-[8rem] sm:text-[12rem] font-serif italic leading-none opacity-10 select-none">
                            JUDI <br /> GAIL
                        </h2>
                        <p className="text-[#b2d8d8] font-mono text-xs tracking-[1em] mt-4 ml-4">
                            EDITION 2026
                        </p>
                    </div>

                    {HEADLINES.map((item, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[80vw] sm:w-[600px] border-l border-[#b2d8d8]/20 pl-10 sm:pl-16 py-10"
                        >
                            <span className="text-[#b2d8d8] font-mono text-[10px] tracking-[0.8em] mb-6 block uppercase">
                                Special Feature // {i + 1}
                            </span>
                            <h3 className="text-white font-serif text-5xl sm:text-7xl mb-8 leading-[1.1] tracking-tighter uppercase">
                                {item.title}
                            </h3>
                            <p className="text-[#b2d8d8]/60 text-lg sm:text-xl font-light italic max-w-md">
                                "{item.subtitle}"
                            </p>
                        </div>
                    ))}

                    {/* Final Celebration Element */}
                    <div className="flex-shrink-0 pr-60">
                        <div className="text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="w-48 h-48 border border-dashed border-[#b2d8d8]/40 rounded-full flex items-center justify-center mb-10"
                            >
                                <span className="text-8xl">👑</span>
                            </motion.div>
                            <h3 className="text-white font-serif text-5xl italic">Twenty One <br /> & Fearless</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Magazine Style Footer Info */}
                <div className="absolute bottom-12 left-16 z-50 hidden sm:block">
                    <p className="text-[#b2d8d8] font-mono text-[10px] tracking-[0.4em]">
                        INTERACTIVE ISSUE 21.0
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#b2d8d8]/30 uppercase text-[10px] tracking-widest z-50">
                Keep scrolling down to walk the carpet
            </div>
        </section>
    );
};
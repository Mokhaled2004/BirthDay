import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        const handleMove = (e) => {
            if (window.innerWidth >= 768) {
                setMousePos({
                    x: (e.clientX / window.innerWidth - 0.5) * 30,
                    y: (e.clientY / window.innerHeight - 0.5) * 30,
                });
            }
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center bg-transparent overflow-hidden">

            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[700px] md:h-[700px] bg-[#008080]/10 blur-[80px] md:blur-[150px] rounded-full pointer-events-none"
                style={{ willChange: 'transform' }}
            />

            <motion.div
                style={{ y: y1, opacity: opacityTransform }}
                className="relative z-10 w-full text-center px-4"
            >

                <div className="relative mb-6 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 2, rotate: -10, filter: "blur(20px)" }}
                        animate={isMobile
                            ? { opacity: 0.05, scale: 1, rotate: 0, filter: "blur(0px)" }
                            : { opacity: 0.07, scale: 1, rotate: 0, filter: "blur(0px)", x: mousePos.x, y: mousePos.y }
                        }
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute font-serif font-bold text-[12rem] md:text-[25rem] leading-none text-[#004d4d] pointer-events-none select-none"
                    >
                        21
                    </motion.span>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="z-10 text-[#006666] font-light text-[10px] md:text-xl uppercase tracking-[1em]"
                    >
                        Celebrating
                    </motion.div>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        transition={{ delay: 1.8, duration: 1.2, ease: "easeInOut" }}
                        className="z-10 mt-2 px-4 md:px-8 py-2 border-y border-[#008080]/20 bg-white/5 backdrop-blur-sm overflow-hidden whitespace-nowrap"
                    >
                        <span className="block font-serif italic text-xl md:text-4xl text-[#008080] tracking-tight">
                            Chapter Twenty-One
                        </span>
                    </motion.div>
                </div>

                {/* MAIN NAME: JUDI */}
                <motion.h1
                    className="text-[20vw] md:text-[18rem] font-serif font-bold flex items-center justify-center leading-none tracking-tighter select-none relative"
                >
                    {/* JU Section - Deep Color */}
                    <div className="flex overflow-hidden px-6 pb-12 -mb-12 relative z-20 text-[#004d4d]">
                        {["J", "U"].map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: "120%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: 2.5 + (i * 0.2),
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    {/* DI Section - Bright Teal & Italic */}
                    <div className="flex text-[#008080] italic relative z-10">
                        {["D", "I"].map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: -150, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 80,
                                    damping: 15,
                                    delay: 3 + (i * 0.1)
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3.5, type: "spring" }}
                            className="absolute -right-6 -top-4 md:-right-24 md:-top-12"
                        >
                            <Sparkles className="w-8 h-8 md:w-32 md:h-32 text-[#b2d8d8]/40 fill-[#b2d8d8]/20" />
                        </motion.div>
                    </div>
                </motion.h1>

                {/* INDICATOR */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-10vh] md:bottom-[-15vh] flex flex-col items-center gap-3"
                >
                    <div className="relative w-[1px] h-16 md:h-24 bg-[#b2d8d8]/30 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#008080] to-transparent"
                        />
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#008080]/30 flex items-center justify-center bg-white/80">
                        <span className="text-[8px] md:text-[10px] font-serif font-bold text-[#008080] tracking-tighter uppercase">Ju</span>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const NightReflection = () => {
    const [isNight, setIsNight] = useState(false);

    return (
        <section
            /* Changed bg-white to transparent and bg-[#002b2b] to a semi-transparent version */
            className={`py-32 transition-colors duration-1000 ease-in-out relative overflow-hidden ${isNight ? 'bg-[#002b2b]/90 backdrop-blur-md' : 'bg-transparent'
                }`}
        >
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

                {/* Toggle Switch */}
                <div className="mb-16 flex flex-col items-center gap-4">
                    <span className={`text-[10px] tracking-[0.4em] uppercase transition-colors duration-500 ${isNight ? 'text-[#b2d8d8]' : 'text-[#008080]'
                        }`}>
                        {isNight ? "The moon is out" : "Time for a change?"}
                    </span>
                    <button
                        onClick={() => setIsNight(!isNight)}
                        className="w-16 h-8 rounded-full bg-[#b2d8d8]/30 relative flex items-center px-1 transition-all"
                    >
                        <motion.div
                            animate={{ x: isNight ? 32 : 0 }}
                            className={`w-6 h-6 rounded-full shadow-md ${isNight ? 'bg-[#f0f9f9]' : 'bg-[#008080]'}`}
                        />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {!isNight ? (
                        <motion.div
                            key="day"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-[#004d4d] font-serif italic text-3xl">Still awake, Judi?</h2>
                            <p className="text-gray-500 italic">Click the switch to dim the lights for a final message.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="night"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            <h2 className="text-[#f0f9f9] font-serif italic text-5xl sm:text-6xl">Chapter 21</h2>

                            <div className="space-y-8 text-[#b2d8d8] font-light leading-relaxed text-lg max-w-2xl mx-auto">
                                <p>
                                    They say time waits for no one, but somehow, you’ve made time wait for you.
                                    Whether it's for breakfast or a lecture, you move at your own beautiful pace.
                                </p>
                                <p>
                                    At 21, the world starts asking you to hurry up. Don't.
                                    Keep your golden heart, keep your "too late" entrances,
                                    and never stop choosing breakfast over the rush.
                                </p>
                                <p className="font-serif text-2xl italic text-white pt-8">
                                    The best years aren't ahead of you—they are happening right now.
                                </p>
                            </div>

                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="text-4xl inline-block"
                            >
                                ✨
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
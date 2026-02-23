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

                            <h2 className="text-[#f0f9f9] font-serif italic text-5xl sm:text-6xl">
                                What We Want You To Know
                            </h2>

                            <div className="space-y-8 text-[#b2d8d8] font-light leading-relaxed text-lg max-w-2xl mx-auto">
                                <p>
                                    judi, if theres one thing everyone agrees on, its that you bring something special into every room you walk into. whether its ur sandwiches, silly laugh, or just your presence, you never fail to put a smile on everyone's faces.

                                </p>

                                <p>

                                    you have this rare ability to make everyone feel important even if you sometimes do the absolute opposite (we call dabsh), at the end of the day we know how much we truly matter to you just because of your special print you have on our hearts judi.
                                </p>

                                <p>
                                    trust me if you think you're too kind for this world, maybe you are, but i promise you it never went unnoticed, especially to the ones who truly love you.
                                </p>

                                <p>

                                    we hope you never doubt your value, never question your worth, and never forget how many people are grateful to have you in their lives.
                                </p>

                                <p className="font-serif text-2xl italic text-white pt-8">
                                    your presence in cs has ruined too many companies— stay alive twin                                </p>
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
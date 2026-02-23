import { motion } from 'framer-motion';

const STATS = [
    { label: "Breakfasts Missed", value: "0", detail: "Even if the house is burning" },
    { label: "Lecture Entry", value: "50%", detail: "Arrival after the midpoint is the goal" },
    { label: "sha3by songs", value: "999+", detail: "If u think shes actually from Maadi, you're mistaken bud" },
    { label: "Gym consistency", value: "3yrs", detail: "Uhh do we see p-progress...?" }
];

export const DailyJudi = () => {
    return (
        <section className="py-20 sm:py-32 bg-transparent relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10 pointer-events-none">

                {/* Header */}
                <div className="flex flex-col items-center mb-16 sm:mb-20 text-center">
                    <span className="text-[#008080] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-4 opacity-70">
                        The Science of
                    </span>
                    <h2 className="text-[#004d4d] font-serif italic text-4xl sm:text-6xl tracking-tight">
                        جودي باختصار
                    </h2>
                    <p className="mt-4 text-gray-500 font-light italic text-xs sm:text-sm max-w-xs sm:max-w-none">
                        Legend says if you find her in class before 10 AM, you're dreaming.
                    </p>
                    <div className="w-10 h-[1px] bg-[#b2d8d8] mt-8" />
                </div>

                {/* Stats Grid - Optimized for all screen sizes */}
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 sm:gap-8 pointer-events-auto">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <motion.span
                                className="text-5xl sm:text-6xl font-serif font-bold text-[#008080] mb-2"
                            >
                                {stat.value}
                            </motion.span>

                            <h4 className="text-[#004d4d] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 min-h-[2.5rem] flex items-center justify-center">
                                {stat.label}
                            </h4>

                            {/* Detail Text: Added min-width and better line-height for readability */}
                            <p className="text-gray-500 text-[10px] sm:text-[11px] italic leading-relaxed max-w-[160px] sm:max-w-none px-2">
                                {stat.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 sm:mt-24 text-center px-4"
                >
                    <p className="text-[#008080] font-serif italic text-base sm:text-lg max-w-lg mx-auto opacity-70 leading-relaxed">
                        "A good heart, a funny soul, and always a full stomach—even if the professor is already on slide 40."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
import { motion } from 'framer-motion';

const STATS = [
    { label: "Breakfasts Missed", value: "0", detail: "Even if the house is burning" },
    { label: "Lecture Entry", value: "50%", detail: "Arrival after the midpoint is the goal" },
    { label: "University Target", value: "4yrs", detail: "Perfecting the 'late entrance' walk" },
    { label: "Heart & Humor", value: "Gold", detail: "Pure vibes & better jokes" }
];

export const DailyJudi = () => {
    return (
        <section
            /* Removed: cursor-none, onMouseMove, and state triggers
               Changed: bg-white/10 -> bg-transparent 
            */
            className="py-32 bg-transparent relative overflow-hidden"
        >
            <div className="max-w-5xl mx-auto px-6 relative z-10 pointer-events-none">
                {/* Header */}
                <div className="flex flex-col items-center mb-20 text-center">
                    <span className="text-[#008080] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-70">
                        The Science of
                    </span>
                    <h2 className="text-[#004d4d] font-serif italic text-4xl sm:text-5xl tracking-tight">
                        جودي باختصار
                    </h2>
                    <p className="mt-4 text-gray-500 font-light italic text-sm">
                        Legend says if you find her in class before 10 AM, you're dreaming.
                    </p>
                    <div className="w-10 h-[1px] bg-[#b2d8d8] mt-8" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 pointer-events-auto">
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
                            <h4 className="text-[#004d4d] text-[11px] font-bold uppercase tracking-[0.2em] mb-1">
                                {stat.label}
                            </h4>
                            <p className="text-gray-500 text-[10px] italic leading-tight px-4">
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
                    className="mt-24 text-center px-6"
                >
                    <p className="text-[#008080] font-serif italic text-lg max-w-lg mx-auto opacity-70">
                        "A good heart, a funny soul, and always a full stomach—even if the professor is already on slide 40."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
import { motion } from 'framer-motion';

// Data included directly to prevent ReferenceErrors
const REASONS = [
    "Your contagious laugh",
    "Your golden heart",
    "How you handle challenges",
    "Your killer style",
    "The way you listen",
    "Your obsession with coffee",
    "How you light up a room",
    "Your resilience",
    "Your taste in music",
    "How you support friends",
    "Your late-night talks",
    "Your unique perspective",
    "How you chase dreams",
    "Your kindness to strangers",
    "Your sense of humor",
    "How you make tea",
    "Your love for animals",
    "Your creative soul",
    "How you remember small details",
    "Your bravery",
    "Just being YOU"
];

export const ReasonsGrid = () => {
    return (
        <section className="py-32 bg-[#f0f9f9]/50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[#004d4d] font-serif italic text-3xl tracking-widest uppercase">
                        21 Things We Love
                    </h2>
                    <p className="text-[#008080]/60 text-xs mt-2 uppercase tracking-[0.4em]">
                        Every little thing about you
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {REASONS.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                scale: 1.05,
                                rotate: [0, -1, 1, 0],
                                backgroundColor: "#ffffff",
                                transition: { duration: 0.2 }
                            }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="px-6 py-4 bg-white/70 backdrop-blur-sm border border-[#b2d8d8]/30 rounded-2xl shadow-sm cursor-default"
                        >
                            <span className="text-[#004d4d] font-medium text-sm sm:text-base flex items-center">
                                <span className="text-[#008080] mr-2 text-[10px] font-bold opacity-60">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                {reason}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
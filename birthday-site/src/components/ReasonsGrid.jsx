import { motion } from 'framer-motion';

// Data included directly to prevent ReferenceErrors
const REASONS = [
    "Your laugh that comes with full hand clapping sound effects",
    "How you can argue with confidence even when you're billion% wrong",
    "Your ability to eat like you’re feeding a small village",
    "Your chaotic but somehow lovable sense of humor",
    "How you always start studying exactly 48 hours before the exam",
    "Your dramatic reactions to literally everything , give us one year and we'll say sayonara",
    "The way you turn small moments into unforgettable memories",
    "Your loyalty to the people you love",
    "how you somehow make ur nagging more tolerable",
    "Your unfiltered honesty, which maybe maybe not made us kill each other",
    "your support when anyone feels genuinely down",
    "Your confidence when debating (facts optional)",
    "The way you laugh at your own jokes before anyone else does",
    "Your comfort presence when someone needs support",
    "Your ability to be both stubborn and soft at the same time",
    "Your unpredictable energy, oh my u thought i was serious, energy left the chat bro.",
    "how you're always a picky eater and end up devouring the whole area",
    "Your big heart hidden behind the chaos",
    "The way you show up for your friends when it matters",
    "Your completely unique personality",
    "Just being Judi — there’s literally no one else like you"
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
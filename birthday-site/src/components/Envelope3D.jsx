import { motion } from "framer-motion";

export const Envelope3D = ({ title, content, sender, isSelected, onClick, index, isStack }) => {
    const isOpen = isSelected;
    const jauntyAngle = index % 2 === 0 ? -4 : 4;
    const floatDelay = index * 0.15;

    return (
        <motion.div
            onClick={onClick}
            initial={false}
            animate={{
                x: 0,
                y: isSelected
                    ? 80
                    : isStack
                        ? index * -5
                        : [0, -15, 0],
                rotateZ: isSelected ? 0 : isStack ? (index - 1) * 5 : jauntyAngle,
                scale: isSelected ? 1.1 : (isStack ? 0.95 + (index * 0.01) : 1),
            }}
            transition={{
                rotateZ: { type: "spring", stiffness: 100, damping: 15 },
                scale: { type: "spring", stiffness: 100, damping: 15 },
                y: (!isStack && !isSelected) ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay
                } : { type: "spring", stiffness: 70, damping: 20 }
            }}
            className="absolute w-[300px] h-[200px] sm:w-[350px] sm:h-[240px] cursor-pointer overflow-visible"
            style={{ perspective: 1500 }}
        >
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>

                {/* BACK PLATE - Soft Seafoam Tint */}
                <div
                    className="absolute inset-0 bg-[#f0f9f9] border border-[#b2d8d8]/30 rounded-xl overflow-hidden shadow-inner"
                    style={{ transform: "translateZ(-2px)" }}
                />

                {/* THE LETTER */}
                <motion.div
                    initial={false}
                    animate={{
                        y: isOpen ? -220 : 15,
                        z: isOpen ? 80 : -1,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, delay: isOpen ? 0.4 : 0 }}
                    className="absolute inset-x-4 top-2 min-h-[250px] h-auto bg-[#fdfdfd] shadow-2xl p-6 sm:p-8 rounded-sm border border-gray-100 z-10 flex flex-col pointer-events-auto"
                    style={{
                        backgroundImage: "linear-gradient(#f1f1f1 1.1px, transparent 1.1px)",
                        backgroundSize: "100% 1.5em",
                        lineHeight: "1.5em",
                        fontFamily: "'Dancing Script', cursive",
                        transformStyle: "preserve-3d",
                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
                    }}
                >
                    <div className="mb-2">
                        <span className="text-[#004d4d] text-lg font-bold">Dear Judi,</span>
                    </div>

                    <div className="flex-grow">
                        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-relaxed">
                            {content}
                        </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#b2d8d8]/30 text-right">
                        <p className="text-gray-400 text-[10px] italic mb-0">With all my love,</p>
                        <p className="text-[#008080] font-bold text-base">{sender}</p>
                    </div>
                </motion.div>

                {/* FRONT BODY (Flaps) - Teal Tones */}
                <div className="absolute inset-0 z-20 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                    {/* Side Flaps - Medium Teal */}
                    <div className="absolute inset-0 bg-[#2b9b9b]" style={{ clipPath: "polygon(0% 0%, 50% 50%, 0% 100%)", transform: "translateZ(1px)" }} />
                    <div className="absolute inset-0 bg-[#2b9b9b]" style={{ clipPath: "polygon(100% 0%, 50% 50%, 100% 100%)", transform: "translateZ(1px)" }} />

                    {/* Bottom Flap - Deeper Teal */}
                    <div className="absolute inset-0 bg-[#006666] shadow-lg"
                        style={{ clipPath: "polygon(0% 100%, 50% 48%, 100% 100%)", transform: "translateZ(2px)" }}
                    />

                    {/* Top Flap - Primary Teal */}
                    <motion.div
                        animate={{ rotateX: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
                        className="absolute inset-0 z-30"
                    >
                        <div
                            className="absolute inset-0 bg-[#008080] shadow-xl flex items-start justify-center pt-6"
                            style={{
                                clipPath: "polygon(0% 0%, 50% 60%, 100% 0%)",
                                backfaceVisibility: "hidden",
                                transform: "translateZ(1px)"
                            }}
                        >
                            {!isOpen && (
                                <div className="text-center px-8">
                                    <p className="font-serif italic text-white/70 text-[8px] tracking-[0.3em] uppercase mb-1">From</p>
                                    <p className="font-serif text-white text-[11px] font-bold tracking-[0.1em] uppercase">
                                        {sender}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* WAX SEAL - Dark Forest Green */}
                        {!isOpen && (
                            <div
                                className="absolute left-1/2 -translate-x-1/2 top-[48%] w-10 h-10 rounded-full bg-[#004d4d] shadow-lg flex items-center justify-center pointer-events-auto border border-[#b2d8d8]/20"
                                style={{ transform: "translateZ(20px)" }}
                            >
                                <span className="text-[#b2d8d8] text-lg select-none">♥</span>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
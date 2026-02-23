import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film, Sparkles, X } from 'lucide-react';
import juVideo from '../assets/ju.mp4'; // Make sure the path matches your folder structure

export const SlideshowSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-transparent">

            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#008080]/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-2xl w-full text-center"
            >
                <div className="flex justify-center gap-3 mb-6 text-[#008080]/60">
                    <Film size={20} />
                    <Sparkles size={20} />
                </div>

                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#004d4d] mb-6 tracking-tight">
                    Our Story in Motion
                </h2>

                <p className="text-sm sm:text-base text-[#004d4d]/70 font-light leading-relaxed mb-10 tracking-wide uppercase font-mono">
                    Every laugh, every trip, and every small moment <br />
                    captured in one special presentation just for you.
                </p>

                <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative inline-flex items-center justify-center px-10 py-4 font-mono text-xs tracking-[0.3em] text-white uppercase transition-all duration-500 rounded-full bg-[#008080] hover:bg-[#004d4d] hover:shadow-[0_10px_30px_rgba(0,128,128,0.4)] hover:-translate-y-1"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Watch the Premiere
                        <Play size={14} fill="currentColor" className="group-hover:scale-125 transition-transform" />
                    </span>
                    <div className="absolute inset-0 rounded-full border border-[#008080] animate-ping opacity-20 group-hover:opacity-0" />
                </button>

                <p className="mt-8 text-[10px] text-[#008080]/60 tracking-widest uppercase">
                    Best viewed with sound on
                </p>
            </motion.div>

            {/* --- VIDEO MODAL OVERLAY --- */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white z-[210] transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-lg overflow-hidden"
                        >
                            <video
                                src={juVideo}
                                className="w-full h-full"
                                controls
                                autoPlay
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute left-0 bottom-10 w-full h-px bg-gradient-to-r from-transparent via-[#008080]/20 to-transparent" />
        </section>
    );
};
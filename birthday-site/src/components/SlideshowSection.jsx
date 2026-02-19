import { motion } from 'framer-motion';
import { Play, Film, Sparkles } from 'lucide-react';

export const SlideshowSection = () => {
    const handleNavigation = () => {
        // Replace with your Canva or PowerPoint web link
        window.open('YOUR_CANVA_OR_POWERPOINT_LINK_HERE', '_blank');
    };

    return (
        /* Changed: bg-white -> bg-transparent */
        <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-transparent">

            {/* Soft decorative background glow - This helps text readability against the floating hearts */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-bday-pink/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-2xl w-full text-center"
            >
                {/* Icon Header */}
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

                {/* The Interactive Button */}
                <button
                    onClick={handleNavigation}
                    className="group relative inline-flex items-center justify-center px-10 py-4 font-mono text-xs tracking-[0.3em] text-white uppercase transition-all duration-500 rounded-full bg-[#008080] hover:bg-[#004d4d] hover:shadow-[0_10px_30px_rgba(0,128,128,0.4)] hover:-translate-y-1"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Watch the Premiere
                        <Play size={14} fill="currentColor" className="group-hover:scale-125 transition-transform" />
                    </span>

                    {/* Pulsing ring around button */}
                    <div className="absolute inset-0 rounded-full border border-[#008080] animate-ping opacity-20 group-hover:opacity-0" />
                </button>

                {/* Subtext */}
                <p className="mt-8 text-[10px] text-[#008080]/60 tracking-widest uppercase">
                    Best viewed with sound on
                </p>
            </motion.div>

            {/* Decorative line */}
            <div className="absolute left-0 bottom-10 w-full h-px bg-gradient-to-r from-transparent via-[#008080]/20 to-transparent" />
        </section>
    );
};
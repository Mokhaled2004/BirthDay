export const Footer = () => {
    return (
        <footer className="relative h-80 flex flex-col items-center justify-center bg-[#f0f9f9] overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#008080]/20 to-transparent" />

            {/* The Divider Line */}
            <div className="w-24 h-[1px] bg-[#008080]/30 mb-10 transition-all duration-1000 hover:w-48" />

            <div className="flex flex-col items-center gap-6 text-center px-4">
                {/* Main Footer Content */}
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] sm:text-xs tracking-[0.5em] text-[#004d4d]/40 uppercase">
                        Special Edition // 2026
                    </span>
                    <h2 className="font-serif italic text-3xl sm:text-4xl text-[#004d4d] font-light tracking-tight">
                        Chapter Twenty-One
                    </h2>
                </div>

                {/* Sentiment Line */}
                <div className="flex items-center gap-4 group">
                    <div className="h-px w-8 bg-[#008080]/20" />
                    <span className="text-[11px] sm:text-sm tracking-[0.2em] text-[#008080]/70 font-light">
                        MADE WITH ❤️ FOR <span className="font-bold hover:text-[#004d4d] transition-colors duration-300">JU</span>
                    </span>
                    <div className="h-px w-8 bg-[#008080]/20" />
                </div>

                {/* Closing Quote / Copyright Vibe */}
                <p className="max-w-xs text-[10px] leading-relaxed text-[#004d4d]/30 font-light uppercase tracking-widest">
                    Designed to celebrate a soul that shines brighter than the stars.
                </p>
            </div>

            {/* Floating Hearts or Sparkles can be added here if needed */}
        </footer>
    );
};
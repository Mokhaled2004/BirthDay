import { useRef } from 'react';
import { motion } from 'framer-motion';
import { PHOTOS } from '../data/photos';

export const AlbumSection = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = 352;

            const currentScroll = container.scrollLeft;
            const target = direction === 'left'
                ? currentScroll - cardWidth
                : currentScroll + cardWidth;

            container.scrollTo({
                left: target,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="w-full py-32 flex flex-col items-center bg-transparent relative z-30 overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-[#008080] font-serif italic text-3xl tracking-[0.2em] uppercase leading-relaxed">
                    The Album
                </h2>
                {/* Accent line changed to Seafoam */}
                <div className="w-12 h-[1px] bg-[#b2d8d8] mx-auto mt-2" />
            </div>

            <div className="relative w-full max-w-7xl px-4 sm:px-12 group">
                {/* --- NAVIGATION ARROWS --- */}
                <button
                    onClick={() => scroll('left')}
                    className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 items-center justify-center text-[#b2d8d8] hover:text-[#008080] hover:scale-125 transition-all text-5xl"
                >
                    ‹
                </button>

                {/* --- THE SMOOTH VIEWPORT --- */}
                <div
                    ref={scrollRef}
                    className="w-full flex gap-8 py-10 overflow-x-auto select-none snap-x snap-mandatory no-scrollbar"
                    style={{
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}} />

                    {PHOTOS.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="shrink-0 snap-center first:ml-[5vw] last:mr-[5vw]"
                        >
                            {/* POLAROID FRAME */}
                            <motion.div
                                whileHover={{ y: -10, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                /* Shadow and Border updated to Teal/Seafoam palette */
                                className="bg-white p-4 pb-12 shadow-[0_10px_30px_rgba(0,128,128,0.15)] rotate-[1.5deg] w-[280px] sm:w-[320px] border border-[#b2d8d8]/20"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-50 relative rounded-sm">
                                    <img
                                        src={photo.url}
                                        alt={photo.caption}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                    {/* Subtle Teal light overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#008080]/5 to-transparent pointer-events-none" />
                                </div>
                                <p className="mt-6 font-handwriting text-[#004d4d]/70 text-2xl text-center italic">
                                    {photo.caption}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 items-center justify-center text-[#b2d8d8] hover:text-[#008080] hover:scale-125 transition-all text-5xl"
                >
                    ›
                </button>
            </div>

            {/* Mobile Swipe Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="sm:hidden flex items-center gap-2 mt-4 text-[#008080]/60 text-[10px] uppercase tracking-[0.3em]"
            >
                <span className="animate-pulse">←</span>
                swipe cards
                <span className="animate-pulse">→</span>
            </motion.div>
        </section>
    );
};
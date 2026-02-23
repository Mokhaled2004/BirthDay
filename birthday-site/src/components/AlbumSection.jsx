import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOS } from '../data/photos';
import { X, Download, Maximize2, Sparkles } from 'lucide-react';

export const AlbumSection = () => {
    const scrollRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = 352;
            const currentScroll = container.scrollLeft;
            const target = direction === 'left'
                ? currentScroll - cardWidth
                : currentScroll + cardWidth;

            container.scrollTo({ left: target, behavior: 'smooth' });
        }
    };

    const handleDownload = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'judi-memory.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="w-full py-32 flex flex-col items-center bg-transparent relative z-30 overflow-hidden">
            {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
            <div className="absolute top-20 left-[10%] opacity-20 animate-pulse text-[#008080]">
                <Sparkles size={40} />
            </div>
            <div className="absolute bottom-20 right-[10%] opacity-20 animate-bounce text-[#b2d8d8]">
                <Sparkles size={30} />
            </div>

            {/* --- SECTION HEADER --- */}
            <div className="text-center mb-16 relative">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.5em] text-[#008080]/40 uppercase"
                >
                    Capture the Moment
                </motion.span>
                <h2 className="text-[#008080] font-serif italic text-4xl tracking-[0.1em] leading-relaxed">
                    The Memory Gallery
                </h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b2d8d8] to-transparent mx-auto mt-4" />
            </div>

            {/* --- ALBUM VIEWPOT --- */}
            <div className="relative w-full max-w-7xl px-4 sm:px-12 group">
                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll('left')}
                    className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-[#b2d8d8]/30 text-[#008080] shadow-lg hover:bg-white transition-all text-3xl"
                >‹</button>

                <div
                    ref={scrollRef}
                    className="w-full flex gap-12 py-16 overflow-x-auto select-none snap-x snap-mandatory no-scrollbar items-center"
                    style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}} />

                    {PHOTOS.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="shrink-0 snap-center first:ml-[10vw] last:mr-[10vw]"
                        >
                            {/* --- THE VINTAGE POLAROID CARD --- */}
                            <motion.div
                                whileHover={{ y: -15, scale: 1.02, rotate: 0 }}
                                onClick={() => setSelectedPhoto(photo)}
                                style={{ rotate: index % 2 === 0 ? '2deg' : '-2deg' }}
                                className="bg-[#fcf9f2] p-4 pb-14 shadow-[20px_20px_60px_rgba(0,0,0,0.07),-5px_-5px_30px_rgba(255,255,255,0.5)] w-[300px] sm:w-[340px] border border-[#e8e4d8] relative group/card cursor-pointer rounded-sm"
                            >
                                {/* Washi Tape Decor */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#b2d8d8]/30 backdrop-blur-sm border border-white/20 rotate-[-2deg] z-20 shadow-sm" />

                                <div className="aspect-[4/5] overflow-hidden bg-[#e8e4d8] relative shadow-inner">
                                    <img
                                        src={photo.url}
                                        alt={photo.caption}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 sepia-[0.1]"
                                    />
                                    {/* Subtle vignette overlay */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#004d4d]/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white">
                                            <Maximize2 size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 relative">
                                    <p className="font-handwriting text-[#2c3e3e] text-3xl text-center leading-none opacity-90">
                                        {photo.caption}
                                    </p>
                                    <div className="absolute -bottom-4 right-0 opacity-10">
                                        <Sparkles size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-[#b2d8d8]/30 text-[#008080] shadow-lg hover:bg-white transition-all text-3xl"
                >›</button>
            </div>

            {/* --- LIGHTBOX MODAL --- */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-[#004d4d]/10 backdrop-blur-md"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full bg-[#fcf9f2] p-3 rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-[#e8e4d8]"
                        >
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-6 right-6 z-10 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-[#004d4d]"
                            >
                                <X size={24} />
                            </button>

                            <img
                                src={selectedPhoto.url}
                                alt={selectedPhoto.caption}
                                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-sm"
                            />

                            <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="text-center sm:text-left">
                                    <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#008080]/60 mb-1">Memory Details</h4>
                                    <p className="font-handwriting text-[#2c3e3e] text-4xl italic">
                                        {selectedPhoto.caption}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleDownload(selectedPhoto.url, `judi-memory-${selectedPhoto.id}.jpg`)}
                                    className="group flex items-center gap-3 bg-[#008080] text-white px-8 py-4 rounded-2xl font-mono text-[10px] tracking-widest uppercase hover:bg-[#004d4d] transition-all shadow-xl active:scale-95"
                                >
                                    <Download size={18} className="group-hover:animate-bounce" />
                                    Download Image
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Swipe Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="sm:hidden flex items-center gap-2 mt-4 text-[#008080]/60 text-[10px] uppercase tracking-[0.3em]"
            >
                <span className="animate-pulse">←</span>
                swipe & tap to save
                <span className="animate-pulse">→</span>
            </motion.div>
        </section>
    );
};
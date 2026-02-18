import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope3D } from './Envelope3D';
import { LETTERS } from '../data/envelopes';

export const EnvelopeSection = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('stack');
    const scrollRef = useRef(null);

    const handleEnvelopeClick = (id) => {
        if (viewMode === 'stack') {
            setViewMode('slider');
        } else {
            setSelectedId(selectedId === id ? null : id);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const scrollAmount = 400;
            const targetScroll = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    const displayedLetters = viewMode === 'stack' ? LETTERS.slice(0, 3) : LETTERS;

    return (
        <section className="w-full pt-40 pb-20 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-transparent">

            <div className="text-center mb-16 h-24 relative z-50">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#008080] font-serif italic text-2xl sm:text-3xl tracking-[0.3em] uppercase px-4"
                >
                    {viewMode === 'stack' ? 'Tap the Stack' : 'Birthday Wishes'}
                </motion.h2>
                {viewMode === 'slider' && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#004d4d]/60 text-[10px] mt-4 uppercase tracking-[0.5em] font-light"
                    >
                        Use the arrows to browse
                    </motion.p>
                )}
            </div>

            <div className="relative w-full max-w-7xl flex items-center justify-center px-4">

                {/* --- LEFT ARROW --- */}
                {viewMode === 'slider' && (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => scroll('left')}
                        className="hidden lg:flex absolute left-4 xl:left-8 z-[110] flex-col items-center group"
                    >
                        <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-[#b2d8d8] transition-all group-hover:bg-white group-hover:shadow-[#008080]/20">
                            <span className="text-[#008080] text-3xl rotate-180">➔</span>
                        </div>
                        <span className="text-[10px] text-[#008080] mt-2 font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Prev</span>
                    </motion.button>
                )}

                {/* --- ENVELOPE CONTAINER --- */}
                <div
                    ref={scrollRef}
                    className={`relative flex items-center transition-all duration-1000 ease-in-out ${viewMode === 'stack'
                        ? 'w-[350px] h-[350px] justify-center cursor-pointer'
                        : 'w-full h-[650px] overflow-x-auto px-12 lg:max-w-6xl justify-start gap-12 select-none snap-x snap-mandatory'
                        }`}
                    style={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}
                >
                    <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />

                    {displayedLetters.map((letter, i) => (
                        <div
                            key={letter.id}
                            className={`transition-all duration-700 snap-center ${viewMode === 'slider'
                                ? 'relative shrink-0 w-[280px] sm:w-[380px] flex justify-center'
                                : 'absolute inset-0 flex items-center justify-center'
                                }`}
                            style={{
                                zIndex: selectedId === letter.id ? 100 : i + 10,
                            }}
                        >
                            <Envelope3D
                                index={i}
                                isStack={viewMode === 'stack'}
                                sender={letter.sender}
                                title={letter.title}
                                content={letter.content}
                                isSelected={selectedId === letter.id}
                                onClick={() => handleEnvelopeClick(letter.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* --- RIGHT ARROW --- */}
                {viewMode === 'slider' && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => scroll('right')}
                        className="hidden lg:flex absolute right-4 xl:right-8 z-[110] flex-col items-center group"
                    >
                        <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-[#b2d8d8] transition-all group-hover:bg-white group-hover:shadow-[#008080]/20">
                            <span className="text-[#008080] text-3xl">➔</span>
                        </div>
                        <span className="text-[10px] text-[#008080] mt-2 font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Next</span>
                    </motion.button>
                )}
            </div>

            {/* CLOSE BUTTON */}
            <AnimatePresence>
                {viewMode === 'slider' && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => {
                            setViewMode('stack');
                            setSelectedId(null);
                        }}
                        className="mt-8 px-8 py-3 bg-white/80 backdrop-blur-sm border border-[#b2d8d8] text-[#008080] rounded-full hover:bg-white hover:shadow-xl transition-all uppercase tracking-[0.3em] text-[11px] font-bold z-50 shadow-sm"
                    >
                        Back to Stack
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    );
};
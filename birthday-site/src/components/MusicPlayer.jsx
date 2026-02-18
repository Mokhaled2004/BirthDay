import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            // If it IS playing, we want to pause it
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // If it IS NOT playing, we want to play it
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center gap-3">
            <audio
                ref={audioRef}
                src="/Ed Sheeran - Sapphire (Lyric Video).mp3"
                loop
            />

            <button
                onClick={togglePlay}
                className="group relative flex flex-col items-center"
            >
                {/* Vinyl Record */}
                <div className={`relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-2xl transition-all duration-700 ${isPlaying ? 'animate-[spin_10s_linear_infinite] scale-100' : 'scale-90 opacity-80'
                    }`}>
                    <img
                        src="sapphirecover.jpg"
                        alt="Sapphire Cover"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 m-auto h-4 w-4 rounded-full border-2 border-white/30 bg-[#f0f9f9] shadow-inner"></div>
                </div>

                {/* Status Icon */}
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#008080] shadow-lg border border-[#b2d8d8]">
                    {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </div>

                {/* Pulse ring only when playing */}
                {isPlaying && (
                    <div className="absolute inset-0 -z-10 h-20 w-20 animate-ping rounded-full bg-[#008080]/10"></div>
                )}
            </button>

            {/* Corrected Text Label */}
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#008080] font-semibold transition-opacity duration-300">
                {isPlaying ? "NOW PLAYING" : "PAUSED"}
            </span>
        </div>
    );
};
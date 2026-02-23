import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ScratchReveal = () => {
    const canvasRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isScratched, setIsScratched] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;

        const topImg = new Image();
        topImg.src = '/scratch1.jpg';
        topImg.onload = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            ctx.drawImage(topImg, 0, 0, canvas.width, canvas.height);
            setIsReady(true);
        };

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fill();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            scratch(e.clientX - rect.left, e.clientY - rect.top);
            setIsScratched(true);
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            scratch(touch.clientX - rect.left, touch.clientY - rect.top);
            setIsScratched(true);
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <section className="py-24 flex flex-col items-center justify-center bg-transparent relative z-30">
            <div className="text-center mb-12">
                {/* Updated to Footer deep teal: #004d4d */}
                <h2 className="text-[#004d4d] font-serif italic text-3xl tracking-[0.2em] uppercase">
                    A Little Surprise
                </h2>
                {/* Updated to Footer teal accent with opacity: #008080/60 */}
                <p className="text-[#008080]/60 text-[10px] mt-2 tracking-widest uppercase font-mono">
                    Scratch the photo to reveal the memory
                </p>
            </div>

            {/* Container updated with subtle teal shadow to match the theme */}
            <div className="relative w-[320px] h-[450px] sm:w-[400px] sm:h-[550px] cursor-crosshair shadow-[0_20px_50px_rgba(0,128,128,0.15)] rounded-lg overflow-hidden border-8 border-white">

                <img
                    src="/scratch2.jpg"
                    alt="Hidden Surprise"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-10"
                />

                {!isScratched && (
                    <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                    >
                        {/* Prompt button updated to match Footer colors */}
                        <span className="bg-[#004d4d]/20 backdrop-blur-sm text-[#004d4d] px-6 py-2 rounded-full text-[10px] font-mono tracking-[0.2em] border border-[#008080]/20">
                            SCRATCH HERE
                        </span>
                    </motion.div>
                )}
            </div>
        </section>
    );
};
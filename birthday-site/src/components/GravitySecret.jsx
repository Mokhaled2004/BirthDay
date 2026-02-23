import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GravitySecret = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        const handleOrientation = (event) => {
            // beta is the front-to-back tilt (-180 to 180)
            // gamma is the left-to-right tilt (-90 to 90)
            const tilt = Math.abs(event.gamma);
            const flip = Math.abs(event.beta);

            // If phone is tilted sideways (landscape) or turned over
            if (tilt > 60 || flip > 140) {
                setIsFlipped(true);
            } else {
                setIsFlipped(false);
            }
        };

        // Request permission for iOS 13+ 
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            setHasPermission('request');
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
        }

        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    const requestAccess = async () => {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
            setHasPermission('granted');
            window.addEventListener('deviceorientation', (event) => {
                const tilt = Math.abs(event.gamma);
                if (tilt > 60) setIsFlipped(true);
                else setIsFlipped(false);
            });
        }
    };

    return (
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-transparent">
            {/* Background Glow that changes color when flipped */}
            <motion.div
                animate={{
                    scale: isFlipped ? 1.5 : 1,
                    backgroundColor: isFlipped ? "rgba(255, 182, 193, 0.2)" : "rgba(0, 128, 128, 0.05)"
                }}
                className="absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none"
            />

            <div className="relative z-10 text-center px-10">
                <AnimatePresence mode="wait">
                    {!isFlipped ? (
                        <motion.div
                            key="decoy"
                            initial={{ opacity: 1 }}
                            exit={{ y: 100, opacity: 0, rotate: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#008080]/40 mb-4">
                                Top Secret
                            </p>
                            <h3 className="font-serif italic text-xl text-[#004d4d]/30">
                                There is a hidden message here... <br />
                                <span className="text-[12px] not-italic">Try turning your phone sideways</span>
                            </h3>

                            {hasPermission === 'request' && (
                                <button
                                    onClick={requestAccess}
                                    className="mt-4 text-[10px] underline text-[#008080]"
                                >
                                    Enable Sensor
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="secret"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-4"
                        >
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="block text-pink-400 text-2xl"
                            >
                                ✨
                            </motion.span>
                            <h2 className="text-3xl font-serif italic text-[#004d4d]">
                                You found it.
                            </h2>
                            <p className="text-[#008080] font-light leading-relaxed max-w-xs mx-auto">
                                "Even when the world turns upside down..,
                                kefaya mo7n ya khalty fy eh"
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
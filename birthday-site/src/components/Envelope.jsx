import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MailOpen, Heart } from 'lucide-react';

export const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4">
            <AnimatePresence>
                {!isOpen ? (
                    /* CLOSED ENVELOPE */
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer bg-white p-8 rounded-lg shadow-2xl border-2 border-bday-pink relative group"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <MailOpen className="w-12 h-12 text-bday-pink group-hover:animate-bounce" />
                            <p className="font-serif italic text-xl text-gray-700">A special message for JU...</p>
                            <div className="absolute -top-3 -right-3">
                                <Heart fill="#ffafcc" className="text-bday-pink animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* OPENED MESSAGE */
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        className="max-w-md w-full bg-white p-10 rounded-2xl shadow-[0_20px_50px_rgba(255,175,204,0.3)] border-t-8 border-bday-purple relative"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-bday-pink transition-colors"
                        >
                            ✕
                        </button>

                        <h3 className="font-serif text-3xl text-gray-800 mb-6">Dear Judi,</h3>

                        <p className="text-gray-600 leading-relaxed mb-6 font-sans">
                            Happy Birthday! You bring so much light into everyone's life.
                            May your year be as bright and colorful as this page.
                            Keep shining, JU! ✨
                        </p>

                        <div className="flex justify-end italic font-serif text-bday-pink text-xl">
                            — Your Favorite Human
                        </div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 flex justify-center"
                        >
                            <Heart fill="#cdb4db" className="text-bday-purple w-10 h-10" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock, Fingerprint } from 'lucide-react';

export const MikesLetter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const CORRECT_PASSWORD = "17062004";

    // Reusable Page Wrapper for a consistent design
    const PageTemplate = ({ children }) => (
        <div className="relative h-full flex flex-col">
            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-35deg] text-[100px] font-black select-none">
                SECRET
            </div>

            {/* Header Area */}
            <div className="flex justify-between items-start mb-8 border-b-2 border-black/80 pb-2">
                <div className="font-mono text-[9px] font-bold tracking-tighter uppercase">
                    Archive_Ref: 21-ALPHA<br />
                    Copy No. 01 of 01
                </div>
                <div className="bg-red-600 text-white px-3 py-1 font-mono text-[10px] font-black tracking-widest uppercase">
                    Top Secret
                </div>
            </div>

            {/* Main Content Scrollable Area */}
            <div className="flex-1 font-handwriting text-[#1a1a1a] text-3xl leading-[48px]">
                {children}
            </div>

            {/* Footer Area */}
            <div className="mt-6 pt-4 border-t border-dashed border-black/10 flex justify-between items-end opacity-50">
                <div className="font-mono text-[8px] uppercase tracking-widest">
                    Auth_Level: Mike_V3<br />
                    Status: Decrypted
                </div>
                <div className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center font-mono text-[6px] text-center rotate-12">
                    OFFICIAL<br />SEAL
                </div>
            </div>
        </div>
    );

    const pages = [
        {
            content: (
                <PageTemplate>
                    <p>Dear Judi,</p>
                    <p className="mt-4">
                        I don’t even know where to start, because there are so many things I want to say to you.
                        From the very first days of college, you became one of the most important people in my life
                        without me even realizing it at the time.
                    </p>
                    <p className="mt-4">
                        What started as friendship slowly turned into something deeper — a bond built on trust,
                        understanding, laughter, and countless memories that I will carry with me forever.
                    </p>
                </PageTemplate>
            )
        },
        {
            content: (
                <PageTemplate>
                    <p>
                        We’ve been through so many ups and downs together. Moments of stress, confusion,
                        happiness, chaos, and everything in between — and somehow, having you there always
                        made things feel easier.
                    </p>
                    <p className="mt-6">
                        You were never just someone I talked to. You were comfort. You were support.
                        You were the person I could be completely myself with, without fear of judgment.
                    </p>
                    <p className="mt-6">
                        That kind of connection is rare, and I hope you always know how much I value it.
                    </p>
                </PageTemplate>
            )
        },
        {
            content: (
                <PageTemplate>
                    <p>
                        I appreciate you more than words can explain — your patience, your kindness,
                        your loyalty, and the way you always show up when it matters most.
                    </p>
                    <p className="mt-6">
                        Thank you for standing beside me from the beginning of this journey until now.
                        Thank you for the memories we created, the laughs we shared, and even the hard
                        moments that made our friendship stronger.
                    </p>
                    <p className="mt-6">
                        No matter where life takes us after college, one thing will never change —
                        you will always have a special place in my life.
                    </p>
                </PageTemplate>
            )
        },
        {
            content: (
                <PageTemplate>
                    <p>
                        I’m genuinely grateful for you, Judi. For your presence, your heart, and
                        the friendship we built together.
                    </p>
                    <p className="mt-6">
                        If I had to choose again, I would still choose you as my best friend every single time.
                    </p>

                    <div className="flex flex-col items-end mt-12">
                        <p className="text-sm font-mono uppercase tracking-widest text-gray-400">
                            Always with appreciation,
                        </p>
                        <p className="text-6xl text-[#008080] mt-2 pr-4">
                            Mike
                        </p>
                    </div>
                </PageTemplate>
            )
        }
    ];

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setError(false);
            setShowPassword(false);
            setIsOpen(true);
        } else {
            setError(true);
            setPassword('');
        }
    };

    return (
        <section className="min-h-screen w-full bg-[#e8e4d8] py-20 flex flex-col items-center justify-center relative overflow-hidden px-6">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-[#2c2c2c] font-serif uppercase tracking-[0.4em] text-2xl font-bold">
                    A Letter Left on Mike’s Desk
                </h2>                <div className="flex items-center justify-center gap-2 text-[#b22222] font-mono text-[10px] tracking-widest uppercase mt-2">
                    <Lock size={12} />
                    {!isOpen ? "Encryption Active" : "Authorized Access Only"}
                </div>
            </div>

            <div className="relative w-full max-w-lg h-[620px] flex items-center justify-center">
                <AnimatePresence>
                    {showPassword && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center rounded-xl p-8 border border-white/10"
                        >
                            <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center gap-8 w-full max-w-xs">
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="text-red-600">
                                    <Fingerprint size={80} strokeWidth={1} />
                                </motion.div>
                                <input
                                    autoFocus type="text" placeholder="••••••••"
                                    className={`w-full bg-transparent border-b border-white/20 text-center text-white font-mono text-4xl outline-none pb-4 tracking-[0.3em] ${error ? 'border-red-500 animate-shake' : ''}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value.replace(/\D/g, '').slice(0, 8))}
                                />
                                <button type="submit" className="w-full bg-red-700 text-white py-4 font-mono text-[11px] tracking-widest uppercase">Submit Clearance</button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative w-full h-full cursor-pointer perspective-1500" onClick={() => !isOpen && setShowPassword(true)}>
                    <div className="absolute inset-0 bg-[#c5b08d] rounded-r-xl shadow-md border border-black/10 z-0" />

                    <div className="absolute inset-0 z-10 overflow-hidden rounded-xl flex items-end justify-center">
                        <AnimatePresence mode="wait">
                            {isOpen && (
                                <motion.div
                                    key={currentPage}
                                    initial={{ y: 600 }} animate={{ y: -20 }} exit={{ x: 600, rotate: 10, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative w-[92%] h-[94%] bg-[#fdfaf5] shadow-2xl border border-gray-200 rounded-sm flex flex-col p-10"
                                >
                                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

                                    <div className="relative z-10 flex flex-col h-full overflow-hidden">
                                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                                            {pages[currentPage].content}
                                        </div>

                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="font-mono text-[9px] text-black/30">PAGE_{currentPage + 1}_OF_{pages.length}</div>
                                            <button onClick={(e) => { e.stopPropagation(); setCurrentPage(p => (p < pages.length - 1 ? p + 1 : 0)); }} className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded font-mono text-[10px] uppercase hover:bg-red-800 transition-colors">
                                                {currentPage < pages.length - 1 ? "Next Document" : "Seal File"} <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        animate={{ rotateX: isOpen ? -115 : 0, y: isOpen ? 50 : 0, zIndex: isOpen ? 5 : 30 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="absolute inset-0 bg-[#dcc9a9] rounded-r-xl shadow-2xl border border-black/10 flex flex-col origin-bottom overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]"
                    >
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />

                        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-12">
                            <div className="border-[8px] border-red-900/10 p-2 rotate-[-3deg]">
                                <div className="border-2 border-red-900/20 px-12 py-4 text-5xl font-black text-red-900/30 uppercase font-mono tracking-tighter">Top Secret</div>
                            </div>
                            <div className="w-full max-w-[280px] space-y-2 text-center border-y border-black/5 py-6">
                                <p className="font-mono text-[10px] text-black/30 uppercase tracking-[0.3em]">Subject Identifier</p>
                                <p className="font-mono text-2xl text-black/60 font-bold italic uppercase tracking-widest">Judi // Alpha-21</p>
                            </div>
                        </div>

                        <div className="absolute bottom-16 right-16 flex flex-col items-center">
                            <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2 }} className="relative text-red-800/60 p-2 rounded-lg border border-red-900/10 bg-red-900/5 shadow-[0_0_15px_rgba(153,27,27,0.1)]">
                                <Fingerprint size={50} strokeWidth={1.5} />
                                <div className="absolute -bottom-8 right-0 font-mono text-[8px] text-red-800/40 uppercase tracking-widest font-bold">Biometric Lock</div>
                            </motion.div>
                        </div>

                        <div className="p-10 opacity-30">
                            <div className="font-mono text-[9px] text-black uppercase tracking-[0.2em] leading-loose">
                                Unauthorized Access Prohibited<br />Federal Offense Under Title 18
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
                .font-handwriting { font-family: 'Caveat', cursive; }
                .perspective-1500 { perspective: 1500px; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
                .animate-shake { animation: shake 0.2s ease-in-out infinite; }
            `}} />
        </section>
    );
};
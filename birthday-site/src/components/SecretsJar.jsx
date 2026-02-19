import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Matter from 'matter-js';
import { Heart, Star, Gift, Sparkles, Moon } from 'lucide-react';

const SECRETS = [
    { id: 1, text: "A date night at your favorite restaurant 🍝", icon: <Heart size={20} />, color: "#ff85a2" },
    { id: 2, text: "One giant hug that lasts 1 whole minute 🫂", icon: <Star size={20} />, color: "#70d6ff" },
    { id: 3, text: "A weekend getaway to somewhere quiet ✈️", icon: <Gift size={20} />, color: "#ff9770" },
    { id: 4, text: "I'll do the dishes for a whole week! 🧼", icon: <Sparkles size={20} />, color: "#ffd670" },
    { id: 5, text: "Unlimited kisses for 24 hours 💋", icon: <Heart size={20} />, color: "#e9ff70" },
    { id: 6, text: "A night under the stars just us 🌌", icon: <Moon size={20} />, color: "#deb1ff" },
];

export const SecretsJar = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const [selectedSecret, setSelectedSecret] = useState(null);
    const [positions, setPositions] = useState(SECRETS.map(() => ({ x: 160, y: 100, angle: 0 })));

    useEffect(() => {
        const engine = engineRef.current;
        const width = 320;
        const height = 450;

        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: { width, height, background: 'transparent', wireframes: false }
        });

        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
        const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
        const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);
        const ceiling = Matter.Bodies.rectangle(width / 2, -25, width, 50, wallOptions);

        const bodies = SECRETS.map((secret, i) => {
            return Matter.Bodies.circle(100 + (i * 35), 100, 32, {
                restitution: 0.8,
                friction: 0.05,
                label: `secret-${secret.id}`,
                render: { visible: false }
            });
        });

        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling, ...bodies]);

        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });

        Matter.World.add(engine.world, mouseConstraint);

        let frameId;
        const sync = () => {
            setPositions(bodies.map(b => ({ x: b.position.x, y: b.position.y, angle: b.angle })));
            frameId = requestAnimationFrame(sync);
        };
        sync();

        let dragStartTime = 0;
        let lastTouchedBody = null;

        Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
            dragStartTime = Date.now();
            lastTouchedBody = event.source.body;
        });

        Matter.Events.on(mouseConstraint, 'mouseup', () => {
            const dragDuration = Date.now() - dragStartTime;
            if (dragDuration < 200 && lastTouchedBody) {
                const label = lastTouchedBody.label;
                if (label && label.startsWith('secret-')) {
                    const id = parseInt(label.split('-')[1]);
                    const secret = SECRETS.find(s => s.id === id);
                    if (secret) setSelectedSecret(secret);
                }
            }
            lastTouchedBody = null;
        });

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        return () => {
            cancelAnimationFrame(frameId);
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.World.clear(engine.world);
            Matter.Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return (
        /* Changed: bg-white -> bg-transparent */
        <section className="relative py-24 bg-transparent flex flex-col items-center overflow-hidden">
            <div className="text-center mb-12 px-4">
                <h2 className="font-serif italic text-4xl text-[#004d4d] mb-3">The Secrets Jar</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#008080]/60">
                    Interact to reveal a hidden note
                </p>
            </div>

            <div className="relative w-80 h-[450px]">
                {/* Glass Body Design - Improved transparency and blur */}
                <div className="absolute inset-0 z-0 rounded-t-[140px] rounded-b-[60px] border-[3px] border-white/60 bg-gradient-to-tr from-white/10 via-[#f0f9f9]/30 to-white/5 backdrop-blur-[12px] shadow-[0_20px_50px_rgba(0,128,128,0.1)] overflow-hidden pointer-events-none">
                    <div className="absolute inset-[6px] rounded-t-[135px] rounded-b-[55px] border-[1px] border-white/20" />
                    <div className="absolute top-10 left-8 w-6 h-[80%] bg-gradient-to-r from-white/30 to-transparent rounded-full blur-[4px]" />
                </div>

                {/* Neck & Stopper */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-10 pointer-events-none">
                    <div className="w-20 h-12 bg-gradient-to-b from-[#e0f2f2] to-[#b2d8d8] rounded-t-2xl shadow-md border-x-[3px] border-white/50" />
                    <div className="w-28 h-5 bg-[#f0f9f9] border-2 border-white/80 rounded-full shadow-sm -mt-1" />
                    <div className="w-24 h-8 bg-gradient-to-b from-[#f0f9f9] to-transparent border-x-2 border-white/40" />
                </div>

                {/* Visual Capsules */}
                {SECRETS.map((secret, i) => (
                    <div
                        key={secret.id}
                        className="absolute w-16 h-16 pointer-events-none z-10 flex items-center justify-center"
                        style={{
                            left: 0, top: 0,
                            transform: `translate(${positions[i].x - 32}px, ${positions[i].y - 32}px) rotate(${positions[i].angle}rad)`,
                        }}
                    >
                        <div
                            className="w-full h-full rounded-full shadow-md border-[1.5px] border-[#b2d8d8] flex items-center justify-center text-[#008080] relative overflow-hidden active:scale-95 transition-transform"
                            style={{
                                background: `linear-gradient(135deg, white 50%, ${secret.color}44 50%)`,
                                backgroundColor: 'white'
                            }}
                        >
                            <div className="z-10 bg-white/40 rounded-full p-1 backdrop-blur-[1px]">
                                {secret.icon}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Physics Layer */}
                <div ref={sceneRef} className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing" />
            </div>

            {/* ... inside the return, replacing the AnimatePresence block ... */}

            <AnimatePresence>
                {selectedSecret && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        /* Removed the teal color, kept it transparent, and reduced blur to 'sm' */
                        className="fixed inset-0 z-[100] bg-transparent backdrop-blur-sm flex items-center justify-center p-6"
                        onClick={() => setSelectedSecret(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            /* Card remains solid white so the text is readable */
                            className="bg-white p-10 rounded-[40px] text-center max-w-sm w-full shadow-[0_20px_70px_rgba(0,0,0,0.15)] border-t-[12px] border-[#008080] relative z-10"
                            onClick={e => e.stopPropagation()}
                        >
                            <div
                                className="mb-6 inline-block p-4 rounded-full text-[#008080] border-2 border-[#b2d8d8]"
                                style={{ background: `linear-gradient(135deg, white 50%, ${selectedSecret.color}44 50%)` }}
                            >
                                {selectedSecret.icon}
                            </div>

                            <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#008080]/60 mb-2">
                                Uncovered Secret
                            </h3>

                            <p className="text-2xl font-serif italic text-[#004d4d] leading-relaxed">
                                "{selectedSecret.text}"
                            </p>

                            <button
                                onClick={() => setSelectedSecret(null)}
                                className="mt-8 w-full py-4 bg-[#008080] text-white rounded-2xl font-mono uppercase text-[10px] tracking-widest hover:bg-[#006666] transition-all shadow-lg"
                            >
                                Put it back
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
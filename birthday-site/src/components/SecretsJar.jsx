import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Matter from 'matter-js';
import { Heart, Star, Gift, Sparkles, Moon } from 'lucide-react';

const SECRETS = [
    { id: 1, text: "molten cake", icon: <Heart size={20} />, color: "#ff85a2" },
    { id: 2, text: "mojito passion fruit", icon: <Star size={20} />, color: "#70d6ff" },
    { id: 3, text: "snap map", icon: <Gift size={20} />, color: "#ff9770" },
    { id: 4, text: "jude james bond", icon: <Sparkles size={20} />, color: "#ffd670" },
    { id: 5, text: "clapping laugh warning ⚠️", icon: <Heart size={20} />, color: "#e9ff70" },
    { id: 6, text: "degla kolaha shagar w sefarat", icon: <Moon size={20} />, color: "#deb1ff" },
    { id: 7, text: "CODE RED", icon: <Sparkles size={20} />, color: "#ff6b6b" },
    { id: 8, text: "shawerma lahma", icon: <Heart size={20} />, color: "#ffa36c" },
    { id: 9, text: "hwa ana kda 3agbak msh 3agbak", icon: <Star size={20} />, color: "#ffd166" },
    { id: 10, text: "im fine sank you", icon: <Moon size={20} />, color: "#9bf6ff" },
    { id: 11, text: "bas yah", icon: <Gift size={20} />, color: "#caffbf" },
    { id: 12, text: "3ayza anam", icon: <Heart size={20} />, color: "#bdb2ff" },
    { id: 13, text: "lec 8 am?? mostaheell ahdarha", icon: <Sparkles size={20} />, color: "#ffc6ff" },
    { id: 14, text: "laBoire", icon: <Sparkles size={20} />, color: "#ffc6ff" },

    { id: 15, text: "bowar bank", icon: <Sparkles size={20} />, color: "#ffc6ff" },

    { id: 16, text: "barra 3any", icon: <Sparkles size={20} />, color: "#ffc6ff" },
    { id: 17, text: "wittipo", icon: <Sparkles size={20} />, color: "#ffc6ff" },

    { id: 18, text: "do u game", icon: <Sparkles size={20} />, color: "#ffc6ff" },

    { id: 19, text: "howa el helwa yaam b2olk khatebtshy", icon: <Sparkles size={20} />, color: "#ffc6ff" },



];

export const SecretsJar = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const [selectedSecret, setSelectedSecret] = useState(null);
    const [positions, setPositions] = useState(SECRETS.map((_, i) => ({
        x: 100 + (i * 10),
        y: 100,
        angle: 0
    })));

    useEffect(() => {
        // 1. Setup
        const engine = engineRef.current;
        const width = 320;
        const height = 450;

        // Clear previous canvas if any (Strict Mode fix)
        if (sceneRef.current) {
            sceneRef.current.innerHTML = '';
        }

        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false
            }
        });

        // 2. Physics Bodies
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
        const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
        const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);
        const ceiling = Matter.Bodies.rectangle(width / 2, -25, width, 50, wallOptions);

        const bodies = SECRETS.map((secret, i) => {
            return Matter.Bodies.circle(60 + (i * 15), 50 + (i * 20), 32, {
                restitution: 0.6,
                friction: 0.1,
                label: `secret-${secret.id}`,
                render: { visible: false } // We use React to draw, not Matter
            });
        });

        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling, ...bodies]);

        // 3. Mouse Interaction
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });

        Matter.World.add(engine.world, mouseConstraint);

        // 4. Sync State with Physics
        let frameId;
        const sync = () => {
            if (bodies.length > 0) {
                setPositions(bodies.map(b => ({
                    x: b.position.x,
                    y: b.position.y,
                    angle: b.angle
                })));
            }
            frameId = requestAnimationFrame(sync);
        };
        sync();

        // 5. Click Handling
        let dragStartTime = 0;
        Matter.Events.on(mouseConstraint, 'mousedown', () => {
            dragStartTime = Date.now();
        });

        Matter.Events.on(mouseConstraint, 'mouseup', (event) => {
            const dragDuration = Date.now() - dragStartTime;
            if (dragDuration < 200) {
                const clickedBody = Matter.Query.point(bodies, event.mouse.position)[0];
                if (clickedBody) {
                    const id = parseInt(clickedBody.label.split('-')[1]);
                    const secret = SECRETS.find(s => s.id === id);
                    if (secret) setSelectedSecret(secret);
                }
            }
        });

        // 6. Start Runner
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        return () => {
            cancelAnimationFrame(frameId);
            Matter.Runner.stop(runner);
            Matter.Render.stop(render);
            Matter.World.clear(engine.world);
            Matter.Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return (
        <section className="relative py-24 bg-transparent flex flex-col items-center overflow-hidden">
            <div className="text-center mb-12 px-4">
                <h2 className="font-serif italic text-4xl text-[#004d4d] mb-3">The Secrets Jar</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#008080]/60">
                    Interact to reveal a hidden note
                </p>
            </div>

            <div className="relative w-80 h-[450px]">
                {/* JAR DESIGN LAYER */}
                <div className="absolute inset-0 z-0 rounded-t-[140px] rounded-b-[60px] border-[3px] border-white/60 bg-gradient-to-tr from-white/10 via-[#f0f9f9]/30 to-white/5 backdrop-blur-[12px] shadow-[0_20px_50px_rgba(0,128,128,0.1)] overflow-hidden pointer-events-none">
                    <div className="absolute inset-[6px] rounded-t-[135px] rounded-b-[55px] border-[1px] border-white/20" />
                </div>

                {/* REACT RENDERED CAPSULES */}
                {SECRETS.map((secret, i) => (
                    <div
                        key={secret.id}
                        className="absolute w-16 h-16 pointer-events-none z-10 flex items-center justify-center"
                        style={{
                            left: 0,
                            top: 0,
                            width: 64,
                            height: 64,
                            // Added safety check for positions[i]
                            transform: positions[i]
                                ? `translate(${positions[i].x - 32}px, ${positions[i].y - 32}px) rotate(${positions[i].angle}rad)`
                                : 'none',
                        }}
                    >
                        <div
                            className="w-full h-full rounded-full shadow-md border-[1.5px] border-[#b2d8d8] flex items-center justify-center text-[#008080] relative overflow-hidden bg-white"
                            style={{
                                background: `linear-gradient(135deg, #ffffff 50%, ${secret.color}66 50%)`,
                            }}
                        >
                            {secret.icon}
                        </div>
                    </div>
                ))}

                {/* MATTER.JS CANVAS LAYER */}
                <div ref={sceneRef} className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing" />
            </div>

            {/* MODAL (Same as your code) */}
            <AnimatePresence>
                {selectedSecret && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center p-6 bg-black/20"
                        onClick={() => setSelectedSecret(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white p-10 rounded-[40px] text-center max-w-sm w-full shadow-2xl border-t-[12px] border-[#008080]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="mb-6 inline-block p-4 rounded-full border-2 border-[#b2d8d8]">
                                {selectedSecret.icon}
                            </div>
                            <p className="text-2xl font-serif italic text-[#004d4d] mb-8 leading-relaxed">
                                "{selectedSecret.text}"
                            </p>
                            <button
                                onClick={() => setSelectedSecret(null)}
                                className="w-full py-4 bg-[#008080] text-white rounded-2xl font-mono text-[10px] tracking-widest hover:bg-[#006666] transition-colors"
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
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeartIcon = ({ delay, x, isOutline }) => (
    <motion.div
        initial={{ y: "110vh", opacity: 0, scale: 0 }}
        animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0.8, 0], // Slightly softer opacity
            scale: [0.5, 1.2, 1, 0.8]
        }}
        transition={{
            duration: 12, // Slowed down slightly for a more romantic feel
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        /* Conditional classes: Pink solid or Slate outline */
        className={`absolute ${isOutline
                ? "text-slate-300 opacity-40"
                : "text-bday-pink/30"
            }`}
        style={{ left: `${x}%` }}
    >
        <Heart
            /* If it's outline, don't fill it. If it's pink, fill it. */
            fill={isOutline ? "none" : "currentColor"}
            strokeWidth={isOutline ? 1 : 0}
            size={Math.random() * 25 + 10}
        />
    </motion.div>
);

export const BackgroundHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        // Increased length to 30 to make the screen feel fuller with the mix
        const newHearts = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 15, // Longer delay spread
            x: Math.random() * 100,
            isOutline: Math.random() > 0.4 // 60% will be outlines, 40% will be pink
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map(heart => (
                <HeartIcon
                    key={heart.id}
                    delay={heart.delay}
                    x={heart.x}
                    isOutline={heart.isOutline}
                />
            ))}
        </div>
    );
};
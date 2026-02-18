import React, { useState } from 'react';
import { fireConfetti } from '../utils/confetti';
import './BirthdayCake.css';

export const BirthdayCake = () => {
    const [isBlown, setIsBlown] = useState(false);

    const handleToggle = () => {
        if (!isBlown) {
            setIsBlown(true);
            fireConfetti();
        } else {
            setIsBlown(false);
        }
    };

    return (
        <section className="cake-section py-40">
            <div id="birthday-cake">
                {/* The Cake Structure */}
                <div className="cake">
                    <div className="middle"></div>
                    <div className="chocs"></div>
                    <div className="top"></div>
                </div>

                {/* The Classic Candles */}
                <div className="candles" onClick={handleToggle}>
                    {!isBlown && (
                        <>
                            <div className="flame"></div>
                            <div className="flame2"></div>
                            <div className="flame3"></div>
                        </>
                    )}

                    {/* Updated Font & Position */}
                    <div className={`birthday-message ${isBlown ? 'show-text' : ''}`}>
                        Happy Birthday Judi!
                    </div>

                    <div className="shadows"></div>
                </div>
            </div>

            {/* Instruction moved below the cake */}
            <div className="instruction-container">
                <p className="instruction-text">
                    {isBlown ? "*Click the cake to relight*" : "*Click the flames to blow*"}
                </p>
            </div>
        </section>
    );
};
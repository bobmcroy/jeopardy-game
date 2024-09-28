import React, { useState, useEffect } from 'react';
import '../BuzzerPanel.css';

const BuzzerPanel = () => {
    const [timer, setTimer] = useState(5); // Default 5 seconds timer
    const [timerActive, setTimerActive] = useState(false);
    const [firstBuzzer, setFirstBuzzer] = useState(null);
    const players = ['Player 1', 'Player 2', 'Player 3']; // Example players

    // Handle the timer countdown
    useEffect(() => {
        if (timerActive && timer > 0) {
            const timerInterval = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerInterval);
        }
    }, [timerActive, timer]);

    const handleBuzzerClick = (player) => {
        if (!firstBuzzer) {
            setFirstBuzzer(player);
            setTimerActive(false); // Stop the timer when the first buzzer is pressed
        }
    };

    const resetBuzzerPanel = () => {
        setFirstBuzzer(null);
        setTimer(5); // Reset to 5 seconds
        setTimerActive(false);
    };

    return (
        <div className="buzzer-panel">
            <h3>Buzzers</h3>

            {/* Timer display */}
            <div className="timer">
                <svg className="radial-timer" viewBox="0 0 36 36">
                    <path
                        className="progress-circle"
                        strokeDasharray={`${(timer / 5) * 100}, 100`}
                        d="M18 2a16 16 0 110 32 16 16 0 010-32z"
                    />
                </svg>
                <div>{timer} seconds</div>
                <button onClick={() => setTimerActive(true)}>Start Timer</button>
                <button onClick={resetBuzzerPanel}>Reset</button>
            </div>

            {/* Buzzer buttons */}
            <div className="buzzer-buttons">
                {players.map((player, index) => (
                    <button
                        key={index}
                        className="buzzer-btn"
                        onClick={() => handleBuzzerClick(player)}
                        disabled={firstBuzzer || timer === 0}
                    >
                        {player}
                    </button>
                ))}
            </div>

            {/* Display first buzzer */}
            {firstBuzzer && <div className="first-buzzer">{firstBuzzer} buzzed first!</div>}
        </div>
    );
};

export default BuzzerPanel;

import React, { useState, useEffect } from 'react';
import '../BuzzerPanel.css';

const BuzzerPanel = ({ players, questions, selectedQuestion, setSelectedQuestion, setPlayers }) => {
    const [timer, setTimer] = useState(5); // Timer set to 5 seconds by default
    const [activeTimer, setActiveTimer] = useState(false);
    const [firstBuzzer, setFirstBuzzer] = useState(null); // Tracks which player buzzed first
    const [buzzerDisabled, setBuzzerDisabled] = useState(false); // Disable all buzzers when the timer runs out

    // Handle selecting a question
    const handleQuestionClick = (q) => {
        setSelectedQuestion(q);
        setTimer(5); // Reset timer to 5 seconds
        setActiveTimer(true); // Start the timer
        setFirstBuzzer(null); // Reset the first buzzer when a new question is selected
        setBuzzerDisabled(false); // Enable all buzzers for the new question
    };

    // Timer effect: Decrement the timer every second if active
    useEffect(() => {
        let interval = null;
        if (activeTimer && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setActiveTimer(false); // Stop the timer when it reaches zero
            setBuzzerDisabled(true); // Disable all buzzers when time runs out
        }
        return () => clearInterval(interval);
    }, [timer, activeTimer]);

    // Start the timer
    const startTimer = () => {
        if (!activeTimer && timer > 0) {
            setActiveTimer(true); // Start the countdown
        }
    };

    // Handle player buzz in
    const handleBuzzerClick = (player) => {
        if (!firstBuzzer && !buzzerDisabled) { // Check if the buzzer is still enabled
            setFirstBuzzer(player); // Set the first player to buzz in
            setActiveTimer(false); // Stop the timer when someone buzzes in
            setBuzzerDisabled(true); // Disable buzzers once a player buzzes in
        }
    };

    // Reset the buzzer panel and timer
    const resetTimer = () => {
        setFirstBuzzer(null); // Clear the first buzzer
        setTimer(5); // Reset the timer to 5 seconds
        setActiveTimer(false); // Stop the timer
        setBuzzerDisabled(false); // Enable buzzers
    };

    // Stroke value for the radial timer visualization
    const getStrokeDashoffset = () => {
        const radius = 45; // radius of the SVG circle
        const circumference = 2 * Math.PI * radius;
        return circumference - (circumference * timer) / 5; // Adjust for 5 seconds
    };

    return (
        <div className="buzzer-panel">
            <h3>Buzzers</h3>

            {/* Buzzer buttons for each player moved to the top */}
            <div className="buzzer-buttons">
                {players.map((player, index) => (
                    <button
                        key={index}
                        className="buzzer-btn"
                        onClick={() => handleBuzzerClick(player)}
                        disabled={buzzerDisabled || !!firstBuzzer} // Disable buzzers when the timer runs out or someone buzzes in
                    >
                        {player.name}: (Buzz In)
                    </button>
                ))}
            </div>

            {/* Timer display */}
            {selectedQuestion && (
                <div className="timer">
                    <h2>Time Remaining: {timer}s</h2>
                    <div className="radial-timer">
                        <svg className="progress-circle" width="120" height="120">
                            <circle
                                className="progress-ring"
                                stroke="#00aaff"
                                strokeWidth="10"
                                fill="transparent"
                                r="45"
                                cx="60"
                                cy="60"
                                style={{ strokeDasharray: 2 * Math.PI * 45, strokeDashoffset: getStrokeDashoffset() }}
                            />
                        </svg>
                    </div>
                </div>
            )}

            {/* Start Timer and Reset Timer buttons */}
            <div className="timer-controls">
                <button onClick={startTimer} disabled={activeTimer || timer === 0}>
                    Start Timer
                </button>
                <button onClick={resetTimer}>
                    Reset Timer
                </button>
            </div>

            {/* Display the first player to buzz in */}
            {firstBuzzer && (
                <div className="first-buzzer">
                    <h3>{firstBuzzer.name} buzzed in first!</h3>
                </div>
            )}
        </div>
    );
};

export default BuzzerPanel;

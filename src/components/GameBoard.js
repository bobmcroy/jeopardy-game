import React, { useState, useEffect } from 'react';
import '../GameBoard.css';

function GameBoard({ categories, questions, selectedQuestion, setSelectedQuestion, players, setPlayers }) {
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);
    const [timer, setTimer] = useState(5); // 5-second timer
    const [activeTimer, setActiveTimer] = useState(false);
    const [firstBuzzer, setFirstBuzzer] = useState(null); // Track the first player to buzz in
    const [buzzerDisabled, setBuzzerDisabled] = useState(false); // Disable all buzzers when the timer runs out

    // Handle selecting a question
    const handleQuestionClick = (q) => {
        setSelectedQuestion(q);
        setAnsweredQuestions([...answeredQuestions, q]);
        setIsFlipped(false); // Reset flip state when a new question is selected
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

    // Handle buzzer: Player presses the buzzer to answer
    const handleBuzzer = (player) => {
        if (!firstBuzzer && !buzzerDisabled) { // Check if the buzzer is still enabled
            setFirstBuzzer(player); // Set the first player to buzz in
            setActiveTimer(false); // Stop the timer when someone buzzes in
            setBuzzerDisabled(true); // Disable buzzers once a player buzzes in
        }
    };

    const renderQuestions = (category) => {
        return questions
            .filter(q => q.category === category.name)
            .map((q, idx) => {
                const isAnswered = answeredQuestions.includes(q);
                return (
                    <div key={idx} className="question-box">
                        <button
                            className={`question-btn ${isAnswered ? 'answered' : ''}`}
                            onClick={() => handleQuestionClick(q)}
                            style={{ backgroundColor: isAnswered ? '#ff8c00' : category.color }}
                            disabled={isAnswered} // Disable the button once answered
                        >
                            {q.points}
                        </button>
                    </div>
                );
            });
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    // Calculate stroke-dashoffset for radial timer
    const getStrokeDashoffset = () => {
        const radius = 45; // radius of the SVG circle
        const circumference = 2 * Math.PI * radius;
        return circumference - (circumference * timer) / 5; // Adjust for 5 seconds
    };

    return (
        <div className="game-board">
            <div className="category-cards">
                {categories.map((category, index) => (
                    <div key={index} className="category-card" style={{ borderColor: category.color }}>
                        <h3 className="category-title" style={{ color: category.color }}>{category.name}</h3>
                        <div className="question-list">
                            {renderQuestions(category)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected question card placed below all the category cards */}
            {selectedQuestion && (
                <div className="selected-question-card">
                    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="question-header">
                                    <h4>{selectedQuestion.category}</h4>
                                    <p>${selectedQuestion.points}</p>
                                </div>
                                <h3>{selectedQuestion.question}</h3>
                            </div>
                            <div className="flip-card-back">
                                <h3>{selectedQuestion.answer}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameBoard;

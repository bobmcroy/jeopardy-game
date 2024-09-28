import React, { useState } from 'react';

function Question({ question, onClose, players, setPlayers }) {
    const [playerAnswer, setPlayerAnswer] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = () => {
        if (playerAnswer.toLowerCase() === question.answer.toLowerCase()) {
            setPlayers(players.map(player => {
                if (player.name === selectedPlayer) {
                    return { ...player, score: player.score + question.points };
                }
                return player;
            }));
        } else {
            setPlayers(players.map(player => {
                if (player.name === selectedPlayer) {
                    return { ...player, score: player.score - question.points };
                }
                return player;
            }));
        }
        setShowResult(true);
    };

    return (
        <div className="question-modal">
            <h2>{question.question}</h2>

            <div>
                <select value={selectedPlayer} onChange={e => setSelectedPlayer(e.target.value)}>
                    <option value="">Select Player</option>
                    {players.map((player, index) => (
                        <option key={index} value={player.name}>{player.name}</option>
                    ))}
                </select>
            </div>

            <input
                type="text"
                value={playerAnswer}
                onChange={e => setPlayerAnswer(e.target.value)}
                placeholder="Your answer"
            />
            <button onClick={handleAnswer}>Submit Answer</button>

            {showResult && (
                <div>
                    {playerAnswer.toLowerCase() === question.answer.toLowerCase()
                        ? <p>Correct!</p>
                        : <p>Wrong! The correct answer was: {question.answer}</p>}
                    <button onClick={onClose}>Close Question</button>
                </div>
            )}
        </div>
    );
}

export default Question;

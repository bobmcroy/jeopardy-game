import React from 'react';

function ScoreBoard({ players }) {
    return (
        <div>
            <h2>ScoreBoard</h2>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}: {player.score} points</li>
                ))}
            </ul>
        </div>
    );
}

export default ScoreBoard;

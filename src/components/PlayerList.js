import React, { useState } from 'react';

function PlayerList({ players, setPlayers }) {
    const [newPlayer, setNewPlayer] = useState('');

    const handleAddPlayer = () => {
        if (newPlayer.trim() !== '') {
            setPlayers([...players, { name: newPlayer, score: 0 }]);
            setNewPlayer('');
        }
    };

    return (
        <div className="player-section">
            <h3>Add Players or Teams</h3>
            <input
                type="text"
                value={newPlayer}
                onChange={e => setNewPlayer(e.target.value)}
                placeholder="Player or team name"
            />
            <button onClick={handleAddPlayer}>Add Player or Team</button>

            <h4>Player List</h4>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name} - {player.score} points</li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;

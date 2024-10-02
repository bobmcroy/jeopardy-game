import React, { useState } from 'react';
import TeamManagementModal from './TeamManagementModal';
import '../PlayerList.css';

function PlayerList({ players, setPlayers, selectedQuestionPoints }) {
    const [newPlayer, setNewPlayer] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPlayer = () => {
        if (newPlayer.trim() !== '') {
            setPlayers([...players, { name: newPlayer, score: 0 }]);
            setNewPlayer('');
        }
    };

    const handleManageTeams = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleScoreChange = (player, change) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(p =>
                p.name === player.name ? { ...p, score: Math.max(0, p.score + change) } : p
            )
        );
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

            {/* Manage Teams button */}
            <button className="manage-teams-button" onClick={handleManageTeams} disabled={players.length === 0}>
                Manage Teams
            </button>

            <h4>Player List</h4>
            <ul>
                {players && players.length > 0 ? (
                    players.map((player, index) => (
                        <li key={index}>
                            {player.name} - {player.score} points
                            <div>
                                <button onClick={() => handleScoreChange(player, selectedQuestionPoints)}>+</button>
                                <button onClick={() => handleScoreChange(player, -selectedQuestionPoints)}>-</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No players available</li> // Message to display if there are no players
                )}
            </ul>

            {/* Render modal */}
            {isModalOpen && (
                <TeamManagementModal
                    players={players}
                    setPlayers={setPlayers}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default PlayerList;

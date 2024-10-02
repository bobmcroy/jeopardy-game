import React, { useState } from 'react';
import '../TeamManagementModal.css'; // Add your styles for the modal

const TeamManagementModal = ({ players, setPlayers, closeModal }) => {
    const [removeAll, setRemoveAll] = useState(false);
    const [selectedTeams, setSelectedTeams] = useState({});

    const handleRemoveAllChange = () => {
        setRemoveAll(!removeAll);
    };

    const handleCheckboxChange = (playerName) => {
        setSelectedTeams(prev => ({
            ...prev,
            [playerName]: !prev[playerName]
        }));
    };

    const handleDelete = () => {
        if (removeAll) {
            setPlayers([]); // Remove all teams
        } else {
            setPlayers(players.filter(player => !selectedTeams[player.name]));
        }
        closeModal(); // Close the modal after deletion
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">Manage Teams</h3>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            checked={removeAll}
                            onChange={handleRemoveAllChange}
                        />
                        Remove All
                    </label>
                </div>
                <h4>Select Teams to Remove:</h4>
                {players.map((player) => (
                    <div key={player.name} className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedTeams[player.name] || false}
                                onChange={() => handleCheckboxChange(player.name)}
                            />
                            {player.name}
                        </label>
                    </div>
                ))}
                <div className="button-container">
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TeamManagementModal;

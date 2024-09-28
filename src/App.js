import React, { useState } from 'react';
import Admin from './components/Admin';
import BuzzerPanel from './components/BuzzerPanel';
import GameBoard from './components/GameBoard';
import PlayerList from './components/PlayerList';
import './App.css';

function App() {
    const [categories, setCategories] = useState([]);
    const [players, setPlayers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Jeopardy Game</h1>
            </header>

            <div className="content-container">
                {/* Buzzer Panel on the left */}
                <div className="buzzer-panel-container">
                    <BuzzerPanel
                        //handleBuzzerClick={handleBuzzerClick} // Pass down the buzzer click handler
                        //resetBuzzerPanel={resetBuzzerPanel} // Pass down the reset method
                    />
                </div>

                <div className="game-board-container">
                    <GameBoard
                        categories={categories}
                        questions={questions}
                        selectedQuestion={selectedQuestion}
                        setSelectedQuestion={setSelectedQuestion}
                        players={players}
                        setPlayers={setPlayers}
                    />
                </div>

                <div className="admin-panel-container">
                    <h2>Admin Panel</h2>
                    <PlayerList players={players} setPlayers={setPlayers} />
                    <Admin
                        setCategories={setCategories}
                        setQuestions={setQuestions}
                        categories={categories}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

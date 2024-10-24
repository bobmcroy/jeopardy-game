import React, { useState, useRef } from 'react';
import Admin from './components/Admin';
import GameBoard from './components/GameBoard';
import PlayerList from './components/PlayerList';
import BuzzerPanel from './components/BuzzerPanel'; // Import the BuzzerPanel component
import './App.css';
import CsvLoader from './CsvLoader';

function App() {
    const [categories, setCategories] = useState([]);
    const [players, setPlayers] = useState([]); // Players state to manage added players
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isAdminCollapsed, setIsAdminCollapsed] = useState(false); // State for collapsing admin
    const [selectedQuestionPoints, setSelectedQuestionPoints] = useState(0); // State to hold question points

    // **New state for admin panel width**
    const [adminPanelWidth, setAdminPanelWidth] = useState(300); // Initial width in pixels
    const adminPanelRef = useRef(null);

    // Toggle admin panel collapse
    const toggleAdminPanel = () => {
        setIsAdminCollapsed(!isAdminCollapsed);
    };

    // **Function to handle resizing**
    const handleMouseDown = (e) => {
        e.preventDefault();

        const startX = e.clientX;
        const startWidth = adminPanelRef.current.offsetWidth;

        const onMouseMove = (moveEvent) => {
            const newWidth = startWidth + (startX - moveEvent.clientX);
            setAdminPanelWidth(newWidth > 100 ? newWidth : 100); // Set a minimum width
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h2>Jeopardy Game</h2>
            </header>

            <div className="content-container">
                {/* Buzzer Panel on the left */}
                <div className="buzzer-panel-container">
                    <BuzzerPanel
                        players={players} // Pass the players to the BuzzerPanel
                        selectedQuestion={selectedQuestion}
                        setSelectedQuestion={setSelectedQuestion}
                    />
                </div>

                <div className="game-board-container">
                    <GameBoard
                        categories={categories}
                        questions={questions}
                        selectedQuestion={selectedQuestion}
                        setSelectedQuestion={setSelectedQuestion}
                        setSelectedQuestionPoints={setSelectedQuestionPoints} // Pass the function to update points
                        players={players} // Pass the players to GameBoard
                        setPlayers={setPlayers}
                    />
                </div>

                {/* Resizable Admin Panel */}
                <div
                    className="admin-panel-container"
                    ref={adminPanelRef}
                    style={{ width: `${adminPanelWidth}px` }}
                >
                    <h3>Admin Panel</h3>
                    <div className="admin-panel-container">
                        <PlayerList
                            players={players}
                            setPlayers={setPlayers}
                            selectedQuestionPoints={selectedQuestion ? selectedQuestion.points : 0}
                        />
                        <Admin
                            setCategories={setCategories}
                            setQuestions={setQuestions}
                            categories={categories}
                            players={players} // Players passed to Admin
                            setPlayers={setPlayers} // Allow Admin to modify players
                        />
                    </div>
                    {/* Resizer div */}
                    <div className="resizer" onMouseDown={handleMouseDown}></div>
                </div>
            </div>
        </div>
    );
}

export default App;

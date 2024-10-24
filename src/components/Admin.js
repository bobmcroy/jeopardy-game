import React, { useState } from 'react';
import PlayerList from './PlayerList';
import CsvLoader from '../CsvLoader';
import '../Admin.css';

function Admin({ setCategories, setQuestions, categories = [], selectedQuestion, players, setPlayers }) {
    const [newCategory, setNewCategory] = useState('');
    const [categoryColor, setCategoryColor] = useState('#007bff');
    const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', points: 0, category: '' });

    const handleCategoryAdd = () => {
        if (newCategory.trim() !== '') {
            setCategories(prevCategories => [...prevCategories, { name: newCategory, color: categoryColor }]);
            setNewCategory('');
            setCategoryColor('#007bff'); // Reset to default color
        }
    };

    const handleQuestionAdd = () => {
        if (newQuestion.question && newQuestion.answer && newQuestion.points && newQuestion.category) {
            setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
            setNewQuestion({ question: '', answer: '', points: 0, category: '' });
        }
    };

    return (
        <div className="admin-section">
            <div className="category-section">
                <h3>Add Category</h3>
                {/* CSV Loader */}
                <CsvLoader setCategories={setCategories} setQuestions={setQuestions} />
                <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="Category name"
                />
                <input
                    type="color"
                    value={categoryColor}
                    onChange={e => setCategoryColor(e.target.value)}
                />
                <button onClick={handleCategoryAdd}>Add Category</button>
            </div>

            <div className="question-section">
                <h3>Add Question</h3>
                <input
                    type="text"
                    value={newQuestion.question}
                    onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    placeholder="Question"
                />
                <input
                    type="text"
                    value={newQuestion.answer}
                    onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    placeholder="Answer"
                />
                <input
                    type="number"
                    value={newQuestion.points}
                    onChange={e => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) })}
                    placeholder="Points"
                />
                <select
                    value={newQuestion.category}
                    onChange={e => setNewQuestion({ ...newQuestion, category: e.target.value })}>
                    <option value="">Select Category</option>
                    {categories && categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <button onClick={handleQuestionAdd}>Add Question</button>
            </div>
        </div>
    );
}

export default Admin;

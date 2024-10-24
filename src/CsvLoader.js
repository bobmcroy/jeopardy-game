import React, { useState } from 'react';
import Papa from 'papaparse';

function CsvLoader({ setQuestions, setCategories }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                chunk: (results) => {
                    alert("here");

                    processParsedData(results.data);
                },
                complete: () => {
                    alert("complete");
                    console.log('CSV file parsing complete!');
                },
                error: (error) => {
                    // Error logging
                    console.error('Error while parsing CSV:', error); // Log the error to the console
                    alert('There was an error processing the CSV file. Please check the file format.'); // Optional: notify the user
                },
            });
        }
    };

    const processParsedData = (data) => {
        const questions = [];
        const categories = [];
alert("here too");
        data.forEach((row) => {
            const { category, question, answer, points } = row;

            // Add unique categories
            if (!categories.some((cat) => cat.name === category)) {
                categories.push({ name: category, color: '#007bff' }); // Assign a default color or modify as needed
            }

            // Add questions
            questions.push({
                question: question.trim(),
                answer: answer.trim(),
                points: parseInt(points, 10),
                category: category.trim(),
            });
        });

        // Update categories and questions state
        setCategories(categories);
        setQuestions(questions);
    };

    return (
        <div>
            <h4>Upload CSV</h4>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload and Load Questions</button>
        </div>
    );
}

export default CsvLoader;

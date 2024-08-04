import React, { useEffect, useState } from 'react';
import MagicSquareCard from './MagicSquareCard';
import './App.css';

const ITEMS_PER_PAGE = 20;

function App() {
    const [magicSquares, setMagicSquares] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('/complete_magic_squares.json')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMagicSquares(data);
                } else {
                    console.error('Invalid JSON structure:', data);
                }
            })
            .catch(error => console.error('Error fetching magic squares:', error));
    }, []);

    const totalPages = Math.ceil(magicSquares.length / ITEMS_PER_PAGE);
    const currentMagicSquares = magicSquares.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="App">
            <h1>Magic Squares</h1>
            {currentMagicSquares.map((square, index) => (
                <MagicSquareCard key={index} square={square.magic_square} />
            ))}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default App;

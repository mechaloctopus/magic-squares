import React, { useEffect, useState } from 'react';
import './App.css';

const ITEMS_PER_PAGE = 20;

const MagicSquare = ({ square, showGrid, showNumbers, drawings, onDraw }) => {
    const cellSize = 30;

    const handleDraw = (type) => {
        const maxNumber = square.length * square.length;
        const sequence = Array.from({ length: maxNumber }, (_, i) => i + 1).filter(num => {
            if (type === 'all') return true;
            if (type === 'even') return num % 2 === 0;
            if (type === 'odd') return num % 2 !== 0;
        });

        const positions = sequence.map(num => {
            for (let i = 0; i < square.length; i++) {
                for (let j = 0; j < square[i].length; j++) {
                    if (square[i][j] === num) {
                        return [(j * cellSize) + (cellSize / 2), (i * cellSize) + (cellSize / 2)];
                    }
                }
            }
        });

        onDraw(type, positions);
    };

    return (
        <div className="magic-square-container">
            <div className="magic-square-grid" style={{ gridTemplateColumns: `repeat(${square.length}, ${cellSize}px)`, gridTemplateRows: `repeat(${square.length}, ${cellSize}px)` }}>
                {square.map((row, rowIndex) => (
                    row.map((cell, cellIndex) => (
                        <div key={`${rowIndex}-${cellIndex}`} className={`cell ${showGrid ? '' : 'no-border'}`} style={{ visibility: showNumbers ? 'visible' : 'hidden' }}>
                            {cell}
                        </div>
                    ))
                ))}
            </div>
            <canvas className="magic-square-canvas" width={square.length * cellSize} height={square.length * cellSize} ref={(canvas) => {
                if (canvas) {
                    const context = canvas.getContext('2d');
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    Object.keys(drawings).forEach(type => {
                        const positions = drawings[type];
                        if (positions.length > 0) {
                            context.beginPath();
                            context.moveTo(positions[0][0], positions[0][1]);
                            positions.forEach(([x, y]) => context.lineTo(x, y));
                            context.strokeStyle = type === 'all' ? 'cyan' : type === 'even' ? 'magenta' : 'lime';
                            context.lineWidth = 2;
                            context.stroke();
                        }
                    });
                }
            }}></canvas>
            <div className="button-group">
                <button onClick={() => handleDraw('all')} className="black-button">Magic Button 1</button>
                <button onClick={() => handleDraw('even')} className="blue-button">Magic Button 2</button>
                <button onClick={() => handleDraw('odd')} className="red-button">Magic Button 3</button>
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" checked={showGrid} onChange={(e) => onDraw('toggleGrid', e.target.checked)} /> Show Grid
                    </label>
                    <label>
                        <input type="checkbox" checked={showNumbers} onChange={(e) => onDraw('toggleNumbers', e.target.checked)} /> Show Numbers
                    </label>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [magicSquares, setMagicSquares] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [drawings, setDrawings] = useState({});
    const [showGrid, setShowGrid] = useState(true);
    const [showNumbers, setShowNumbers] = useState(true);

    useEffect(() => {
        fetch('/complete_magic_squares.json')
            .then(response => response.json())
            .then(data => setMagicSquares(data))
            .catch(error => console.error('Error fetching magic squares:', error));
    }, []);

    const handleDraw = (type, data) => {
        if (type === 'toggleGrid') setShowGrid(data);
        else if (type === 'toggleNumbers') setShowNumbers(data);
        else setDrawings({ ...drawings, [type]: data });
    };

    const totalPages = Math.ceil(magicSquares.length / ITEMS_PER_PAGE);
    const currentMagicSquares = magicSquares.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="App">
            <h1>Magic Squares</h1>
            {currentMagicSquares.map((square, index) => (
                <MagicSquare key={index} square={square.magic_square} showGrid={showGrid} showNumbers={showNumbers} drawings={drawings} onDraw={handleDraw} />
            ))}
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default App;

import React, { useRef, useState, useEffect } from 'react';
import './MagicSquare.css';

const MagicSquare = ({ square }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [drawings, setDrawings] = useState({ all: false, even: false, odd: false });
    const [showNumbers, setShowNumbers] = useState(true);
    const [showGrid, setShowGrid] = useState(true);

    const getSequence = (type) => {
        const numbers = [];
        const maxNumber = square.length * square.length;

        if (type === 'all') {
            for (let i = 1; i <= maxNumber; i++) {
                numbers.push(i);
            }
        } else if (type === 'even') {
            for (let i = 2; i <= maxNumber; i += 2) {
                numbers.push(i);
            }
        } else if (type === 'odd') {
            for (let i = 1; i <= maxNumber; i += 2) {
                numbers.push(i);
            }
        }

        return numbers;
    };

    const drawLines = () => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const cellSize = container.clientWidth / square.length;
        canvas.width = container.clientWidth;
        canvas.height = container.clientWidth;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const colors = { all: 'cyan', even: 'magenta', odd: 'lime' };
        for (const type in drawings) {
            if (drawings[type]) {
                const positions = [];
                const sequence = getSequence(type);

                for (const num of sequence) {
                    outerLoop:
                    for (let i = 0; i < square.length; i++) {
                        for (let j = 0; j < square[i].length; j++) {
                            if (square[i][j] === num) {
                                const x = j * cellSize + cellSize / 2;
                                const y = i * cellSize + cellSize / 2;
                                positions.push([x, y]);
                                break outerLoop;
                            }
                        }
                    }
                }

                context.beginPath();
                for (let k = 0; k < positions.length; k++) {
                    const [x, y] = positions[k];
                    if (k === 0) {
                        context.moveTo(x, y);
                    } else {
                        context.lineTo(x, y);
                    }
                }
                context.strokeStyle = colors[type];
                context.lineWidth = 2;
                context.stroke();
            }
        }
    };

    useEffect(() => {
        drawLines();
    }, [drawings, square]);

    const handleToggle = (type) => {
        setDrawings((prevDrawings) => ({
            ...prevDrawings,
            [type]: !prevDrawings[type],
        }));
    };

    const toggleNumbers = () => {
        setShowNumbers(!showNumbers);
    };

    const toggleGrid = () => {
        setShowGrid(!showGrid);
    };

    return (
        <div className="magic-square-container">
            <div ref={containerRef} className={`magic-square ${showGrid ? 'show-grid' : ''}`} style={{ gridTemplateColumns: `repeat(${square.length}, 1fr)`, gridTemplateRows: `repeat(${square.length}, 1fr)` }}>
                {square.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div className="cell" key={cellIndex}>
                                {showNumbers && cell}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <canvas ref={canvasRef} className="magic-square-canvas"></canvas>
            <div className="button-group">
                <button onClick={() => handleToggle('all')} className="black-button">Magic Button 1</button>
                <button onClick={() => handleToggle('even')} className="blue-button">Magic Button Even</button>
                <button onClick={() => handleToggle('odd')} className="red-button">Magic Button Odd</button>
                <button onClick={toggleNumbers} className="toggle-numbers-button">Toggle Numbers</button>
                <button onClick={toggleGrid} className="toggle-grid-button">Toggle Grid</button>
            </div>
        </div>
    );
};

export default MagicSquare;

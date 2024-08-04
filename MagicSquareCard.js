import React, { useState } from 'react';
import MagicSquareGrid from './MagicSquareGrid';
import MagicSquareCanvas from './MagicSquareCanvas';
import './MagicSquareCard.css';

const MagicSquareCard = ({ square }) => {
    const [drawings, setDrawings] = useState({ all: [], even: [], odd: [] });
    const [showGrid, setShowGrid] = useState(true);
    const [showNumbers, setShowNumbers] = useState(true);

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

    const handleButtonClick = (type) => {
        const positions = [];
        const cellSize = 30; // 30px per cell
        const sequence = getSequence(type);

        for (let i = 0; i < square.length; i++) {
            for (let j = 0; j < square[i].length; j++) {
                const num = square[i][j];
                if (sequence.includes(num)) {
                    const x = j * cellSize + cellSize / 2;
                    const y = i * cellSize + cellSize / 2;
                    positions[num - 1] = [x, y];
                }
            }
        }

        setDrawings((prevDrawings) => ({
            ...prevDrawings,
            [type]: positions.filter(position => position !== undefined),
        }));
    };

    return (
        <div className="magic-square-card">
            <MagicSquareGrid square={square} showGrid={showGrid} showNumbers={showNumbers} />
            <MagicSquareCanvas square={square} drawings={drawings} />
            <div className="button-group">
                <button onClick={() => handleButtonClick('all')} className="black-button">Magic Button 1</button>
                <button onClick={() => handleButtonClick('even')} className="blue-button">Magic Button 2</button>
                <button onClick={() => handleButtonClick('odd')} className="red-button">Magic Button 3</button>
                <div>
                    <label>
                        <input type="checkbox" checked={showGrid} onChange={() => setShowGrid(!showGrid)} />
                        Show Grid
                    </label>
                    <label>
                        <input type="checkbox" checked={showNumbers} onChange={() => setShowNumbers(!showNumbers)} />
                        Show Numbers
                    </label>
                </div>
            </div>
        </div>
    );
};

export default MagicSquareCard;

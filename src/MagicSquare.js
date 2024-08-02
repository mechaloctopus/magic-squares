import React, { useRef, useState, useEffect } from 'react';
import './MagicSquare.css';

const MagicSquare = ({ square }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [drawings, setDrawings] = useState({ all: [], even: [], odd: [] });
    const [showNumbers, setShowNumbers] = useState(true);
    const [showLines, setShowLines] = useState({ all: true, even: true, odd: true });

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

    const drawLine = (context, positions, index, color, callback) => {
        if (index < positions.length) {
            const [x0, y0] = positions[index];
            const [x1, y1] = index === positions.length - 1 ? positions[0] : positions[index + 1];
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = 4;
            context.shadowBlur = 10;
            context.shadowColor = color;
            context.stroke();
            setTimeout(() => drawLine(context, positions, index + 1, color, callback), 500);
        } else {
            setDrawing(false);
            if (callback) callback();
        }
    };

    const handleToggleChange = (type) => {
        if (drawing) return;
        setDrawing(true);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const positions = [];
        const cellSize = canvas.width / square.length;
        const sequence = getSequence(type);
        const color = type === 'all' ? 'cyan' : type === 'even' ? 'magenta' : 'lime';

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

        const filteredPositions = positions.filter(position => position !== undefined);

        setDrawings((prevDrawings) => ({
            ...prevDrawings,
            [type]: filteredPositions,
        }));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        const colors = { all: 'cyan', even: 'magenta', odd: 'lime' };

        for (const [type, positions] of Object.entries(drawings)) {
            if (positions.length > 0 && showLines[type]) {
                drawLine(context, positions, 0, colors[type]);
            }
        }
    }, [drawings, showLines]);

    useEffect(() => {
        setDrawings({ all: [], even: [], odd: [] });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }, [square]);

    return (
        <div className="magic-square-container">
            <div className="magic-square" style={{ gridTemplateColumns: `repeat(${square.length}, 50px)`, gridTemplateRows: `repeat(${square.length}, 50px)` }}>
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
            <canvas
                ref={canvasRef}
                width={square.length * 50}
                height={square.length * 50}
                className="magic-square-canvas"
            ></canvas>
            <div className="button-group">
                <label>
                    <input type="checkbox" checked={showLines.all} onChange={() => setShowLines({ ...showLines, all: !showLines.all })} />
                    Magic Button 1
                </label>
                <label>
                    <input type="checkbox" checked={showLines.even} onChange={() => setShowLines({ ...showLines, even: !showLines.even })} />
                    Magic Button Even
                </label>
                <label>
                    <input type="checkbox" checked={showLines.odd} onChange={() => setShowLines({ ...showLines, odd: !showLines.odd })} />
                    Magic Button Odd
                </label>
                <label>
                    <input type="checkbox" checked={showNumbers} onChange={() => setShowNumbers(!showNumbers)} />
                    Show Numbers
                </label>
            </div>
        </div>
    );
};

export default MagicSquare;

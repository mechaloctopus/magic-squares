import React, { useRef, useState } from 'react';
import './MagicSquare.css';

const MagicSquare = ({ square }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const drawLine = (context, positions, index) => {
        if (index < positions.length) {
            const [x0, y0] = positions[index % positions.length];
            const [x1, y1] = positions[(index + 1) % positions.length];
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = 'indigo';
            context.lineWidth = 4;
            context.stroke();
            setTimeout(() => drawLine(context, positions, index + 1), 500);
        } else {
            setDrawing(false);
        }
    };

    const handleButtonClick = () => {
        if (drawing) return;
        setDrawing(true);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const positions = [];
        const cellSize = 50;

        for (let i = 0; i < square.length; i++) {
            for (let j = 0; j < square[i].length; j++) {
                const num = square[i][j];
                const x = j * cellSize + cellSize / 2;
                const y = i * cellSize + cellSize / 2;
                positions[num - 1] = [x, y];
            }
        }

        drawLine(context, positions, 0);
    };

    return (
        <div className="magic-square-container">
            <div className="magic-square">
                {square.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div className="cell" key={cellIndex}>
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <canvas
                ref={canvasRef}
                width={square[0].length * 50}
                height={square.length * 50}
                className="magic-square-canvas"
            ></canvas>
            <button onClick={handleButtonClick} disabled={drawing}>Magic Button</button>
        </div>
    );
};

export default MagicSquare;

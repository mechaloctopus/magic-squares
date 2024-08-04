import React, { useRef, useEffect } from 'react';
import './MagicSquareCanvas.css';

const MagicSquareCanvas = ({ square, drawings }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        const drawLine = (context, positions, color) => {
            context.beginPath();
            positions.forEach(([x, y], index) => {
                if (index === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            });
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.stroke();
        };

        const colors = { all: 'cyan', even: 'magenta', odd: 'lime' };

        for (const [type, positions] of Object.entries(drawings)) {
            if (positions.length > 0) {
                drawLine(context, positions, colors[type]);
            }
        }
    }, [drawings]);

    return <canvas ref={canvasRef} width={square.length * 30} height={square.length * 30} className="magic-square-canvas"></canvas>;
};

export default MagicSquareCanvas;

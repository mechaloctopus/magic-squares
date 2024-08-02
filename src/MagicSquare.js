import React, { useRef, useState, useEffect } from 'react';
import './MagicSquare.css';

const MagicSquare = ({ square }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [drawings, setDrawings] = useState({ all: [], even: [], odd: [], multipleOf3: [] });

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
        } else if (type === 'multipleOf3') {
            for (let i = 3; i <= maxNumber; i += 3) {
                numbers.push(i);
            }
        }

        return numbers;
    };

    const drawLine = (context, positions, index, color, callback) => {
        if (index < positions.length) {

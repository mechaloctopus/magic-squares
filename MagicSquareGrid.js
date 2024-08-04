import React from 'react';
import './MagicSquareGrid.css';

const MagicSquareGrid = ({ square, showGrid, showNumbers }) => {
    return (
        <div className="magic-square-grid" style={{ gridTemplateColumns: `repeat(${square.length}, 30px)`, gridTemplateRows: `repeat(${square.length}, 30px)` }}>
            {square.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div className={`cell ${showGrid ? '' : 'no-border'}`} key={cellIndex} style={{ visibility: showNumbers ? 'visible' : 'hidden' }}>
                            {cell}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default MagicSquareGrid;

import React from 'react';
import Square from './Square';

const Board = ({ board, onSquareClick }) => (
    <div className="Board">
      {board.map((square, index) => (
          <div
              key={index}
              className="square"
              onClick={() => onSquareClick(index)}
          >
            {square}
          </div>
      ))}
    </div>
);


const styles = {
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    gridTemplateRows: 'repeat(3, 100px)',
    gap: '5px',
  },
};

export default Board;

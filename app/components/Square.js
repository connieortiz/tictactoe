import React from 'react';

const Square = ({ value, onClick }) => {
  return (
      <div
          style={styles.square}
          onClick={onClick}
      >
        {value}
      </div>
  );
};

const styles = {
  square: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    border: '1px solid #ccc',
  },
};

export default Square;

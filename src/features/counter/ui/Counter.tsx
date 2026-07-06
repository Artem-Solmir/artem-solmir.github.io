import React from 'react';

interface CounterProps {
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
}

export const Counter: React.FC<CounterProps> = ({ count, onIncrement, onDecrement }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Counter Example (FSD Pattern)</h2>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
};

import React from 'react';
import { Counter, useCounter } from '../../features/counter';

export const RootLayout: React.FC = () => {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎨 FSD Architecture</h1>
        <p>Feature-Sliced Design Ready!</p>
      </header>
      <main>
        <Counter count={count} onIncrement={increment} onDecrement={decrement} />
      </main>
    </div>
  );
};


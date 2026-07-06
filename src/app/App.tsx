import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layout';
import { TicTacToePage } from '../pages';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} />
        <Route path="/tictactoe" element={<TicTacToePage />} />
      </Routes>
    </HashRouter>
  );
};

import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { RootLayout } from './layout';
import { TicTacToePage } from '../pages';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} />
        <Route path="/tictactoe" element={<TicTacToePage />} />
      </Routes>
    </BrowserRouter>
  );
};

import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import artemIcon from '../../../shared/assets/images/artem.png';
import mishaIcon from '../../../shared/assets/images/misha.png';
import { audioUtils } from '../model/audioUtils';

type Player = 'X' | 'O' | null;

interface GameState {
  board: Player[];
  isXNext: boolean;
  winner: Player;
  isDraw: boolean;
  winningLine: number[] | null;
}

export const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    isXNext: Math.random() > 0.5,
    winner: null,
    isDraw: false,
    winningLine: null,
  });

  const calculateWinner = (squares: Player[]): { winner: Player; line: number[] | null } => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: null };
  };

  useEffect(() => {
    const { winner, line } = calculateWinner(gameState.board);
    const isBoardFull = gameState.board.every((square) => square !== null);
    const isDraw = isBoardFull && !winner;

    if (winner && !gameState.winner) {
      audioUtils.playWinSound();
    } else if (isDraw && !gameState.isDraw) {
      audioUtils.playDrawSound();
    }

    setGameState((prev) => ({
      ...prev,
      winner,
      isDraw,
      winningLine: line,
    }));
  }, [gameState.board]);

  const handleClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) {
      return;
    }

    audioUtils.playMoveSound();

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.isXNext ? 'X' : 'O';

    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      isXNext: !prev.isXNext,
    }));
  };

  const resetGame = () => {
    audioUtils.playResetSound();

    setGameState({
      board: Array(9).fill(null),
      isXNext: Math.random() > 0.5,
      winner: null,
      isDraw: false,
      winningLine: null,
    });
  };

  const renderSquare = (index: number) => {
    const isWinningSquare = gameState.winningLine?.includes(index) ?? false;

    return (
      <button
        className={`square ${isWinningSquare ? 'winning' : ''}`}
        onClick={() => handleClick(index)}
        disabled={gameState.winner !== null || gameState.isDraw}
      >
        {gameState.board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (gameState.winner) {
      return `Победитель: ${gameState.winner}`;
    }
    if (gameState.isDraw) {
      return 'Ничья!';
    }
    return `Ход: ${gameState.isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="tictactoe-container">
      <div className="players-section">
        <div className={`player-card ${gameState.isXNext ? 'active' : ''}`}>
          <img src={artemIcon} alt="Артём (X)" className="player-icon" />
          <div className="player-name">Артём</div>
          <div className="player-symbol">X</div>
        </div>
        
        <div className="vs-text">VS</div>
        
        <div className={`player-card ${!gameState.isXNext && !gameState.winner && !gameState.isDraw ? 'active' : ''}`}>
          <img src={mishaIcon} alt="Миша (O)" className="player-icon" />
          <div className="player-name">Миша</div>
          <div className="player-symbol">O</div>
        </div>
      </div>

      <div className="tictactoe-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Новая игра
      </button>
    </div>
  );
};

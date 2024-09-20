"use client";
import './globals.css';
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import AuthForm from "./components/AuthForm";
import { logOut } from './auth';
import { doc, setDoc, increment } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from './firebase';
import Leaderboard from "./components/Leaderboard";

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameId, setGameId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const newGameRef = doc(db, 'games', user.uid);
        await setDoc(newGameRef, {
          board: initialBoard,
          isXTurn: true
        });
        setGameId(user.uid);
        setBoard(initialBoard);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSquareClick = async (index) => {
    if (gameOver || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const squareElement = document.getElementById(`square-${index}`);
    if (squareElement) {
      squareElement.classList.add('active');
      setTimeout(() => {
        squareElement.classList.remove('active');
      }, 500);
    }

    try {
      await setDoc(doc(db, 'games', gameId), {
        board: newBoard,
        isXTurn: !isXTurn,
      });

      await checkWinner(newBoard); // Ensure this is awaited
    } catch (error) {
      console.error("Error in handleSquareClick:", error);
    }
  };


  const checkWinner = async (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setGameOver(true);

        // Update leaderboard
        const userRef = doc(db, 'leaderboard', user.uid);
        try {
          await setDoc(userRef, {
            name: user.displayName || "Anonymous",
            wins: increment(1)
          }, { merge: true });
        } catch (error) {
          console.error("Error updating leaderboard:", error);
        }

        return;
      }
    }
  };




  const resetGame = async () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setGameOver(false);
    setWinner(null);
    await setDoc(doc(db, 'games', gameId), {
      board: initialBoard,
      isXTurn: true,
    });
  };

  const handleLogout = async () => {
    await logOut();
  };

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
      <div className="App">
        {user ? (
            <>
              <h1>Tic-Tac-Toe</h1>
              {gameOver && (
                  <div className="message">
                    <h2>{winner ? `Winner: ${winner}` : 'It\'s a Draw!'}</h2>
                    <button className="button" onClick={resetGame}>Play Again</button>
                  </div>
              )}
              <Leaderboard />
              <Board board={board} onSquareClick={handleSquareClick} />
              <button className="button" onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <AuthForm isSignUp={false} />
        )}
      </div>
  );
}

export default App;


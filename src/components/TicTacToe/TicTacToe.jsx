import { useEffect, useRef, useState } from "react";
import circle_icon from "../../assets/circle.png";
import cross_icon from "../../assets/cross.png";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const titleRef = useRef(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const toggle = (index) => {
    if (lock || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = "x";
    setBoard(newBoard);
    setCount((prevCount) => prevCount + 1);

    if (checkWin(newBoard, "x")) return;
  };

  useEffect(() => {
    if (count % 2 !== 0 && !lock) {
      const aiMoveTimeout = setTimeout(aiMove, 500);

      return () => clearTimeout(aiMoveTimeout);
    }
  }, [board, count]);

  const aiMove = () => {
    if (lock) return;

    const newBoard = [...board];
    const emptyIndices = newBoard
      .map((val, index) => (val === "" ? index : null))
      .filter((val) => val !== null);
    if (emptyIndices.length > 0) {
      const aiIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      newBoard[aiIndex] = "o";
      setBoard(newBoard);
      setCount((prevCount) => prevCount + 1);

      checkWin(newBoard, "o");
    }
  };

  const checkWin = (currentBoard, player) => {
    for (let [a, b, c] of winningCombinations) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        won(player);
        return true;
      }
    }

    if (!currentBoard.includes("")) titleRef.current.innerHTML = "It's a Draw!";
    return false;
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulation: <img src="${
      winner === "x" ? cross_icon : circle_icon
    }" /> Wins`;
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setLock(false);
    setCount(0);
    titleRef.current.innerHTML = "Tic <span>Tac</span> Toe";
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic <span>Tac</span> Toe
      </h1>

      <div className="board">
        {board.map((box, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {box && <img src={box === "x" ? cross_icon : circle_icon} />}
          </div>
        ))}
      </div>

      <button onClick={() => reset()} className="reset">
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;

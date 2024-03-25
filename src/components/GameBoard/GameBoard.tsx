/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { FlagFill, ChevronDown } from 'react-bootstrap-icons';
import Button from './Button/Button';
import Grid from './Grid/Grid';
import { Cell, Level } from '../../@types';
import styles from './GameBoard.module.scss';
import {
  initializeGrid,
  placeRandomBombs,
  formatTime,
  countAdjacentBombs,
  revealCells,
} from '../../utils/game';

// --- Levels ARRAY ---
const levels: Level[] = [
  { value: 'facile', rows: 9, cols: 9, bombs: 10 },
  { value: 'moyen', rows: 16, cols: 16, bombs: 40 },
  { value: 'difficile', rows: 30, cols: 16, bombs: 99 },
];

function GameBoard() {
  // --- STATES VARIABLES ---
  const [selectedLevel, setSelectedLevel] = useState<Level>(levels[0]);
  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<number>(0); // 0 = waiting | 1 = start game | 2 = win | -1 = game over | 3 = restart
  const [timer, setTimer] = useState<number>(0);
  const [grid, setGrid] = useState<Cell[][]>(
    initializeGrid(selectedLevel.rows, selectedLevel.cols)
  );
  const [countFlag, setCountFlag] = useState<number>(selectedLevel.bombs);

  // --- TIMER ---
  // Controls the game timer based on the game status
  useEffect(() => {
    let intervalId: number | undefined; // Variable to store the interval ID
    if (gameStatus === 1) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // Increment the timer by 1 second
      }, 1000); // Timer interval set to 1000 milliseconds (1 second)
    } else {
      clearInterval(intervalId); // Clear the interval to stop the timer
    }
    // Cleanup function to clear the interval when the component unmounts or when game status changes
    return () => clearInterval(intervalId);
  }, [gameStatus]);

  // --- GAME FUNCTIONS ---
  // Function to start the game when a cell is clicked
  const startGame = (rowClicked: number, colClicked: number) => {
    // Place random bombs when a cell is clicked, only if game status is 0 (waiting)
    if (gameStatus === 0) {
      // Update the clicked cell to not be a bomb
      const newGrid = [...grid];
      newGrid[rowClicked][colClicked].isBomb = false;

      // Update the grid with the modified cell
      setGrid(newGrid);

      // Place random bombs
      placeRandomBombs(
        newGrid, // Use the updated grid
        selectedLevel.bombs,
        selectedLevel.rows,
        selectedLevel.cols,
        rowClicked,
        colClicked,
        setGrid
      );

      // Update the grid with the count of adjacent bombs
      for (let i = 0; i < selectedLevel.rows; i++) {
        for (let j = 0; j < selectedLevel.cols; j++) {
          newGrid[i][j].adjacentBombs = countAdjacentBombs(
            i,
            j,
            newGrid,
            selectedLevel.rows,
            selectedLevel.cols
          );
        }
      }

      // Reveal the clicked Cell +/- All adjacent empty cells
      revealCells(
        rowClicked,
        colClicked,
        newGrid,
        selectedLevel.rows,
        selectedLevel.cols
      );

      // Update the grid with the revealed cells
      setGrid(newGrid);
      // Update game status to started (gameStatus === 1)
      setGameStatus(1);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    // Reset count Flag
    setCountFlag(selectedLevel.bombs);
    // Reset game status to waiting (0)
    setGameStatus(0);
    // Reset the grid to empty without bombs
    setGrid(initializeGrid(selectedLevel.rows, selectedLevel.cols));
    // Reset Timer
    setTimer(0);
  };

  // --- EVENT HANDLING ---
  // Toggle the Select Level Menu on Click
  const handleToggleLevelMenu = () => {
    setIsLevelMenuOpen(!isLevelMenuOpen);
  };

  // Change the level value on Click
  const handleLevelChange = (level: Level) => {
    setSelectedLevel(level); // Update Level
    setIsLevelMenuOpen(false); // Close Level Menu
    resetGame(); // Reset game
  };

  return (
    <div className={styles.gameboard}>
      <div className={styles.header}>
        <div className={styles.selector}>
          <button
            type="button"
            className={styles.level}
            onClick={handleToggleLevelMenu}
          >
            <p>{selectedLevel.value}</p>
            <ChevronDown color="#dedff3" />
          </button>
          <ul
            className={`${styles.options} ${
              isLevelMenuOpen ? styles.open : ''
            }`}
          >
            {levels.map((level) => (
              <li
                className={`${styles.option} ${
                  level.value === selectedLevel.value ? styles.selected : ''
                }`}
                key={level.value}
              >
                <input
                  className={styles.input}
                  type="radio"
                  id={level.value}
                  name="level"
                  value={level.value}
                  checked={selectedLevel.value === level.value}
                  onChange={() => handleLevelChange(level)}
                />
                <label className={styles.label} htmlFor={level.value}>
                  {level.value}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.timer}>{formatTime(timer)}</div>
        <div className={styles.counter}>
          <p>{countFlag}</p>
          <FlagFill color="#ec1c24" size={22} />
        </div>
      </div>
      <Grid
        level={selectedLevel}
        grid={grid}
        setGrid={setGrid}
        startGame={startGame}
        gameStatus={gameStatus}
        countFlag={countFlag}
        setCountFlag={setCountFlag}
      />
      <div className={styles.score}>Score</div>
      <Button resetGame={resetGame} />
    </div>
  );
}

export default GameBoard;

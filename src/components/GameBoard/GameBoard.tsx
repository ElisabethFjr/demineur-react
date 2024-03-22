import { useEffect, useState } from 'react';
import { FlagFill, ChevronDown } from 'react-bootstrap-icons';
import Button from './Button/Button';
import Grid from './Grid/Grid';
import { Level } from '../../@types';
import styles from './GameBoard.module.scss';
import { initializeGrid, placeRandomBombs, formatTime } from '../../utils/game';

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
  const [grid, setGrid] = useState<boolean[][]>(
    initializeGrid(selectedLevel.rows, selectedLevel.cols)
  );

  // --- EVENT HANDLING ---
  // Toggle the Select Level Menu on Click
  const handleToggleLevelMenu = () => {
    setIsLevelMenuOpen(!isLevelMenuOpen);
  };

  // Change the level value on Click
  const handleLevelChange = (level: Level) => {
    setSelectedLevel(level);
    setIsLevelMenuOpen(false);
    // Reset game status to waiting (0)
    setGameStatus(0);
    // Reset the grid to empty without bombs
    setGrid(initializeGrid(level.rows, level.cols));
  };

  // --- TIMER ---
  // Controls the game timer based on the game status
  useEffect(() => {
    let intervalId: number | undefined; // Variable to store the interval ID
    if (gameStatus === 1) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // Increment the timer by 1 second
      }, 1000); // Timer interval set to 1000 milliseconds (1 second)
    } else if (gameStatus === -1 || gameStatus === 2 || gameStatus === 3) {
      clearInterval(intervalId); // Clear the interval to stop the timer
    }
    // Cleanup function to clear the interval when the component unmounts or when game status changes
    return () => clearInterval(intervalId);
  }, [gameStatus]);

  // --- GAME FUNTIONS ---
  // Function to start the game when a cell is clicked
  const startGame = (rowClicked: number, colClicked: number) => {
    // Place random bombs when a cell is clicked, only if game status is 0 (waiting)
    if (gameStatus === 0) {
      placeRandomBombs(
        grid,
        selectedLevel.bombs,
        selectedLevel.rows,
        selectedLevel.cols,
        rowClicked,
        colClicked,
        setGrid
      );
      // Update game status to started (1)
      setGameStatus(1);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    // Reset game status to waiting (0)
    setGameStatus(0);
    // Reset the grid to empty without bombs
    setGrid(initializeGrid(selectedLevel.rows, selectedLevel.cols));
    // Reset Timer
    setTimer(0);
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
          <p>{selectedLevel.bombs}</p>
          <FlagFill color="#ec1c24" size={22} />
        </div>
      </div>
      <Grid level={selectedLevel} grid={grid} startGame={startGame} />
      <div className={styles.score}>Score</div>
      <Button resetGame={resetGame} />
    </div>
  );
}

export default GameBoard;

/* eslint-disable no-plusplus */
import Cell from '../Cell/Cell';
import { Cell as CellType, Level } from '../../../@types';
import styles from './Grid.module.scss';

function Grid({
  level,
  grid,
  setGrid,
  startGame,
  gameStatus,
}: {
  level: Level;
  grid: CellType[][];
  setGrid: React.Dispatch<React.SetStateAction<CellType[][]>>;
  startGame: (rowClicked: number, colClicked: number) => void;
  gameStatus: number;
}) {
  const { value, rows, cols } = level;

  const handleLeftClick = (row: number, col: number) => {
    if (gameStatus === 0) {
      startGame(row, col);
    } else if (gameStatus === 1) {
      const newGrid = [...grid];
      newGrid[row][col].isRevealed = true;
      setGrid(newGrid);
    }
  };

  const handleRightClick = (row: number, col: number) => {
    if (gameStatus === 1) {
      // Toggle flag on the Cell
      const newGrid = [...grid]; // Clone the grid array
      newGrid[row][col].flagged = !newGrid[row][col].flagged; // Toggle the flagged status of the clicked cell
      setGrid(newGrid); // Update the grid state
    }
  };

  // Render the grid cells with random Bombs
  const renderedGrid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      renderedGrid.push(
        <Cell
          key={`${row}-${col}`}
          cell={grid[row][col]}
          handleLeftClick={() => handleLeftClick(row, col)}
          handleRightClick={() => handleRightClick(row, col)}
        />
      );
    }
  }

  // STYLE SCSS -- Get the grid class based on the selected level
  let gridClass = '';
  if (value === 'facile') {
    gridClass = styles.facile;
  } else if (value === 'moyen') {
    gridClass = styles.moyen;
  } else if (value === 'difficile') {
    gridClass = styles.difficile;
  }

  return <div className={`${styles.grid} ${gridClass}`}>{renderedGrid}</div>;
}

export default Grid;

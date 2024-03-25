/* eslint-disable no-plusplus */
import Cell from '../Cell/Cell';
import { Cell as CellType, Level } from '../../../@types';
import styles from './Grid.module.scss';
import { revealCells } from '../../../utils/game';

function Grid({
  level,
  grid,
  setGrid,
  startGame,
  gameStatus,
  countFlag,
  setCountFlag,
}: {
  level: Level;
  grid: CellType[][];
  setGrid: React.Dispatch<React.SetStateAction<CellType[][]>>;
  startGame: (rowClicked: number, colClicked: number) => void;
  gameStatus: number;
  countFlag: number;
  setCountFlag: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { value, rows, cols } = level;

  // --- EVENT HANDLING ---
  // Handle Left Click on a Cell (Reveal Cell)
  const handleLeftClick = (row: number, col: number) => {
    // If game not started, start it by clicking on a Cell in the Grid
    if (gameStatus === 0) {
      startGame(row, col);
      // If game has started and click on a non-revealed Cell (isRevealed === false)
    } else if (gameStatus === 1 && !grid[row][col].isRevealed) {
      const newGrid = [...grid]; // Clone the grid array
      revealCells(row, col, newGrid, rows, cols); // Reveal Clicked Cell +/- Empty Adjacent Cells
      setGrid(newGrid); // Update grid state
    }
  };

  // Handle Right Click on a Cell (Flag)
  const handleRightClick = (row: number, col: number) => {
    if (gameStatus === 1) {
      // Toggle flag on the Cell
      const newGrid = [...grid]; // Clone the grid array
      const clickedCell = newGrid[row][col]; // Get the clicked cell
      // Toggle flag on the Cell if it's not revealed
      if (!clickedCell.isRevealed) {
        // If the cell is not already flagged and there are flags available
        if (!clickedCell.flagged && countFlag > 0) {
          clickedCell.flagged = true; // Set the cell as flagged
          setCountFlag(countFlag - 1); // Decrement the count of available flags
        } else if (clickedCell.flagged) {
          clickedCell.flagged = false; // Unset the cell as flagged
          setCountFlag(countFlag + 1); // Increment the count of available flags
        }
        setGrid(newGrid); // Update the grid state
      }
    }
  };

  // --- RENDERING GRID ---
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

  // --- STYLE SCSS ---
  // Get the grid class based on the selected level
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

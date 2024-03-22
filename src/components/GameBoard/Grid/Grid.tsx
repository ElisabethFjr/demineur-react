/* eslint-disable no-plusplus */
import Cell from '../Cell/Cell';
import { Level } from '../../../@types';
import styles from './Grid.module.scss';

function Grid({
  level,
  grid,
  startGame,
}: {
  level: Level;
  grid: boolean[][];
  startGame: (rowClicked: number, colClicked: number) => void;
}) {
  const { value, rows, cols } = level;

  // Function to count the number of adjacent bombs for a cell
  const countAdjacentBombs = (row: number, col: number): number => {
    let count = 0;
    // For every cell around the current cell
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        // Check if the adjacent cell is inside the grid and is not the current cell
        if (
          i >= 0 &&
          i < rows &&
          j >= 0 &&
          j < cols &&
          !(i === row && j === col)
        ) {
          // If the adjacent cell contains a bomb (= true), increment the count of adjacent bombs
          if (grid[i][j]) {
            count++; // Return the count of adjacent bombs for the current cell
          }
        }
      }
    }
    return count;
  };

  // Render the grid cells with random Bombs
  const renderedGrid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const adjacentBombs = countAdjacentBombs(row, col);
      renderedGrid.push(
        <Cell
          key={`${row}-${col}`}
          isBomb={grid[row][col]}
          adjacentBombs={adjacentBombs}
          handleClick={() => startGame(row, col)}
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

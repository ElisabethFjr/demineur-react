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

  // Render the grid cells with random Bombs
  const renderedGrid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      renderedGrid.push(
        <Cell
          key={`${row}-${col}`}
          isBomb={grid[row][col]}
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

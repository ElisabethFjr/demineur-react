/* eslint-disable no-plusplus */
import Cell from '../Cell/Cell';
import { Level } from '../../../@types';
import styles from './Grid.module.scss';

function Grid({ level }: { level: Level }) {
  const { value, rows, cols } = level;

  // Generate the Grid of Cells based on Level's rows & cols
  const grid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid.push(<Cell key={`${row}-${col}`} />);
    }
  }

  // Get the special class (template col & row) based on the level value
  let gridClass = '';
  if (value === 'facile') {
    gridClass = styles.facile;
  } else if (value === 'moyen') {
    gridClass = styles.moyen;
  } else if (value === 'difficile') {
    gridClass = styles.difficile;
  }

  return <div className={`${styles.grid} ${gridClass}`}>{grid}</div>;
}

export default Grid;

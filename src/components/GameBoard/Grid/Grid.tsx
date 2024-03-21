/* eslint-disable no-plusplus */
import Cell from '../Cell/Cell';
import styles from './Grid.module.scss';

function Grid() {
  const rows = 9;
  const cols = 9;
  const grid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid.push(<Cell key={`${row}-${col}`} />);
    }
  }

  return <div className={styles.grid}>{grid}</div>;
}

export default Grid;

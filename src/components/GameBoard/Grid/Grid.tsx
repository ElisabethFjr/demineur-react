/* eslint-disable no-plusplus */
import Cell from '../Cell/Cell';
import './Grid.scss';

function Grid() {
  const rows = 9;
  const cols = 9;
  const grid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid.push(<Cell key={`${row}-${col}`} />);
    }
  }

  return <div className="grid">{grid}</div>;
}

export default Grid;

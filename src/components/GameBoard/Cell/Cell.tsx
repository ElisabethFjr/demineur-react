import { CircleFill, FlagFill } from 'react-bootstrap-icons';
import styles from './Cell.module.scss';
import { Cell as CellType } from '../../../@types';

function Cell({
  cell,
  handleLeftClick,
  handleRightClick,
}: {
  cell: CellType;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}) {
  const { isRevealed, isBomb, flagged, adjacentBombs } = cell;

  // STYLE SCSS -- Assign color based on the number of ajacentBombs
  let colorClass = ''; // Initialize color variable
  if (adjacentBombs === 1) {
    colorClass = styles.one; // Color for 1
  } else if (adjacentBombs === 2) {
    colorClass = styles.two; // Color for 2
  } else if (adjacentBombs === 3) {
    colorClass = styles.three; // Color for 3
  } else if (adjacentBombs === 4) {
    colorClass = styles.four; // Color for 4
  } else if (adjacentBombs === 5) {
    colorClass = styles.five; // Color for 5
  }

  return (
    <button
      className={`${styles.cell} ${
        !isBomb && adjacentBombs !== 0 && colorClass
      }`}
      type="button"
      onClick={handleLeftClick}
      onContextMenu={(event) => {
        event.preventDefault();
        handleRightClick();
      }}
    >
      {isRevealed && (
        <>
          {isBomb && <CircleFill color="#ec1c24" />}
          {!isBomb && adjacentBombs !== 0 && adjacentBombs}
        </>
      )}
      {flagged && <FlagFill color="#ec1c24" />}
    </button>
  );
}

export default Cell;

import { CircleFill } from 'react-bootstrap-icons';
import styles from './Cell.module.scss';

function Cell({
  isBomb,
  handleClick,
}: {
  isBomb: boolean;
  handleClick: () => void;
}) {
  return (
    <button className={styles.cell} type="button" onClick={handleClick}>
      {isBomb && <CircleFill color="#ec1c24" />}
    </button>
  );
}

export default Cell;

import { Level } from '../../../@types';
import styles from './Button.module.scss';

function Button({
  text,
  selectedLevel,
  resetGame,
}: {
  text: string;
  selectedLevel: Level;
  resetGame: (bombs: number, rows: number, cols: number) => void;
}) {
  const { bombs, rows, cols } = selectedLevel;

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => resetGame(bombs, rows, cols)}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;

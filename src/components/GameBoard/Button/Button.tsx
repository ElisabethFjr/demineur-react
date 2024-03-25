import styles from './Button.module.scss';

function Button({
  rows,
  cols,
  resetGame,
}: {
  rows: number;
  cols: number;
  resetGame: (rows: number, cols: number) => void;
}) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => resetGame(rows, cols)}
      >
        Reset
      </button>
    </div>
  );
}

export default Button;

import styles from './Button.module.scss';

function Button({
  bombs,
  rows,
  cols,
  resetGame,
}: {
  bombs: number;
  rows: number;
  cols: number;
  resetGame: (bombs: number, rows: number, cols: number) => void;
}) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => resetGame(bombs, rows, cols)}
      >
        Reset
      </button>
    </div>
  );
}

export default Button;

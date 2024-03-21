import styles from './Button.module.scss';

function Button({ resetGame }: { resetGame: () => void }) {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn} onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

export default Button;

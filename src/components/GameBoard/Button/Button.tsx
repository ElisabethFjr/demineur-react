import styles from './Button.module.scss';

function Button() {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn}>
        Reset
      </button>
    </div>
  );
}

export default Button;

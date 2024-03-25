import { useEffect, useState } from 'react';
import Button from '../GameBoard/Button/Button';
import { Level } from '../../@types';
import clock from '../../assets/images/score.png';
import medal from '../../assets/images/top-score.png';
import styles from './Score.module.scss';

function Score({
  gameStatus,
  selectedLevel,
  resetGame,
}: {
  gameStatus: number;
  selectedLevel: Level;
  resetGame: (bombs: number, rows: number, cols: number) => void;
}) {
  const { bombs, rows, cols } = selectedLevel;
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (gameStatus === -1) {
      setStatus('Game Over !');
    } else if (gameStatus === 2) {
      setStatus('Victoire !');
    }
  }, [gameStatus]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <p className={styles.status}>{status}</p>
        <div className={styles.score}>
          <div className={styles.time}>
            <img
              className={styles.img}
              src={clock}
              alt="Score"
              loading="lazy"
            />
            <p className={styles.text}>Score Time</p>
          </div>
          <div className={styles.top}>
            <img
              className={styles.text}
              src={medal}
              alt="Top Score"
              loading="lazy"
            />
            <p>Top Score</p>
          </div>
        </div>
        <Button
          text="Rejouer ?"
          selectedLevel={selectedLevel}
          resetGame={() => resetGame(bombs, rows, cols)}
        />
      </div>
    </div>
  );
}

export default Score;

import { useEffect, useState } from 'react';
import Button from '../GameBoard/Button/Button';
import { Level } from '../../@types';
import clock from '../../assets/images/score.png';
import styles from './Score.module.scss';

function Score({
  gameStatus,
  selectedLevel,
  resetGame,
  timer,
}: {
  gameStatus: number;
  selectedLevel: Level;
  resetGame: (bombs: number, rows: number, cols: number) => void;
  timer: string;
}) {
  const { bombs, rows, cols } = selectedLevel;
  const [status, setStatus] = useState<string>('');
  const [score, setScore] = useState<string>('');

  useEffect(() => {
    if (gameStatus === -1) {
      setStatus('Game Over !');
    } else if (gameStatus === 2) {
      setStatus('Victoire !');
      setScore(timer);
    }
  }, [gameStatus, timer]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <p className={styles.status}>{status}</p>
        {gameStatus === 2 && (
          <div className={styles.score}>
            <img
              className={styles.img}
              src={clock}
              alt="Score"
              loading="lazy"
            />
            <p className={styles.text}>{score}</p>
          </div>
        )}

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

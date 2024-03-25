import { useEffect, useState } from 'react';
import Button from '../GameBoard/Button/Button';
import { Level } from '../../@types';
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
  const [score, setScore] = useState<string>('');

  useEffect(() => {
    if (gameStatus === -1) {
      setScore('Game Over !');
    } else if (gameStatus === 2) {
      setScore('Victoire !');
    }
  }, [gameStatus]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <p className={styles.score}>{score}</p>
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

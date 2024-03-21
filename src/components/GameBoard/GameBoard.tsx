import { useState } from 'react';
import { FlagFill, ChevronDown } from 'react-bootstrap-icons';
import Button from './Button/Button';
import Grid from './Grid/Grid';
import { Level } from '../../@types';
import styles from './GameBoard.module.scss';

// --- Levels ARRAY ---
const levels: Level[] = [
  { value: 'facile', rows: 9, cols: 9, bombs: 10 },
  { value: 'moyen', rows: 16, cols: 16, bombs: 40 },
  { value: 'difficile', rows: 30, cols: 16, bombs: 99 },
];

function GameBoard() {
  // --- STATES VARIABLES ---
  const [selectedLevel, setSelectedLevel] = useState<Level>(levels[0]);
  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState<boolean>(false);

  // --- EVENT HANDLING ---
  // Toggle the Select Level Menu on Click
  const handleToggleLevelMenu = () => {
    setIsLevelMenuOpen(!isLevelMenuOpen);
  };

  // Change the level value on Click
  const handleLevelChange = (level: Level) => {
    setSelectedLevel(level);
    setIsLevelMenuOpen(false);
  };

  return (
    <div className={styles.gameboard}>
      <div className={styles.header}>
        <div className={styles.selector}>
          <button
            type="button"
            className={styles.level}
            onClick={handleToggleLevelMenu}
          >
            <p>{selectedLevel.value}</p>
            <ChevronDown color="#dedff3" />
          </button>
          <ul
            className={`${styles.options} ${
              isLevelMenuOpen ? styles.open : ''
            }`}
          >
            {levels.map((level) => (
              <li
                className={`${styles.option} ${
                  level.value === selectedLevel.value ? styles.selected : ''
                }`}
                key={level.value}
              >
                <input
                  className={styles.input}
                  type="radio"
                  id={level.value}
                  name="level"
                  value={level.value}
                  checked={selectedLevel.value === level.value}
                  onChange={() => handleLevelChange(level)}
                />
                <label className={styles.label} htmlFor={level.value}>
                  {level.value}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.timer}>0:00</div>
        <div className={styles.counter}>
          <p>{selectedLevel.bombs}</p>
          <FlagFill color="#ec1c24" size={22} />
        </div>
      </div>
      <Grid level={selectedLevel} />
      <div className={styles.score}>Score</div>
      <Button />
    </div>
  );
}

export default GameBoard;

import { useState } from 'react';
import { FlagFill, ChevronDown } from 'react-bootstrap-icons';
import Button from './Button/Button';
import Grid from './Grid/Grid';
import styles from './GameBoard.module.scss';

function GameBoard() {
  const [selectedLevel, setSelectedLevel] = useState<string>('Facile');
  const [isLeveMenuOpen, setIsLeveMenuOpen] = useState<boolean>(false);

  const levels = [
    { value: 'facile' },
    { value: 'moyen' },
    { value: 'difficile' },
  ];

  const handleToggleLevelMenu = () => {
    setIsLeveMenuOpen(!isLeveMenuOpen);
  };

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    setIsLeveMenuOpen(false);
  };

  // Etapes:
  // 1. Créer les composants:
  // - Grid ==> la grille de jeu de 9*9
  // - Cell ==> une cellule de la grille
  // - Counter : déconte le nombre de drapeaux
  // - Timer : affiche le temps écoulé
  // - Score : Donne le resultats final (succès/echec, temps)
  // - Button (start ou restart)

  // 2. Générer aléatoirement l'emplacement des 10 bombes sur la grille

  // 3. Calculez le nombre de mines adjacentes à chaque case (8 possibilités) et placer les chiffres en fonction dans la grille (si 0 bombe => case vide, pas de chiffre)

  // 4. Gestion des intéractions :
  // - Ajouter les intérations de click droit sur les cellules => si case chiffre (nb mines adjacentes) ou case vide => afficher la case / si case bombe => perdu et dévoilé toute la grille
  // - Si click sur une case vide, dévoilé toutes les cases vides adjacentes + les chiffres
  // - Ajouter les intérations de toggle click gauche sur les cellules => afficher un drapeau
  // - Si nb drapreaux = nb bombes => plus possible de poser de drapeaux

  // 5. Gestion victoire : si toutes les cases non minées sont affichéees + nb drapeaux === nb mines alors VICTOIRE
  // Afficher le score : temps et nb de cliques ?

  // 6. Gestion du Restart d'une game (reset grille + regénération random) au clic sur le bouton

  // 7. Mettre différents niveaux :
  // 9*9 ==> 10 drapeaux
  // 16*16 ==> 40 drapeaux
  // 30*16 ==> 99 drapeaux

  return (
    <div className={styles.gameboard}>
      <div className={styles.header}>
        <div className={styles.selector}>
          <button
            type="button"
            className={styles.level}
            onClick={handleToggleLevelMenu}
          >
            <p>{selectedLevel}</p>
            <ChevronDown color="#dedff3" />
          </button>
          <ul
            className={`${styles.options} ${isLeveMenuOpen ? styles.open : ''}`}
          >
            {levels.map((level) => (
              <li
                className={`${styles.option} ${
                  level.value === selectedLevel ? styles.selected : ''
                }`}
                key={level.value}
              >
                <input
                  className={styles.input}
                  type="radio"
                  id={level.value}
                  name="level"
                  value={level.value}
                  checked={selectedLevel === level.value}
                  onChange={() => handleLevelChange(level.value)}
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
          <p>9</p>
          <FlagFill color="#ec1c24" size={22} />
        </div>
      </div>
      <Grid />
      <div className={styles.score}>Score</div>
      <Button />
    </div>
  );
}

export default GameBoard;

import Footer from '../Footer/Footer';
import GameBoard from '../GameBoard/GameBoard';
import Header from '../Header/Header';
import './App.scss';

function App() {
  // Etapes:

  // 1. Gérer le style SCSS en fonction des intéractions utilisateur (case révélée/ non révélée)

  // 2. Gestion des intéractions en fonction du game status:
  // Si GAME STATUS === 1 (démarré)
  // - Ajouter les intérations de click gauche sur les cellules => si case chiffre (nb mines adjacentes) ou case vide => afficher la case / si case bombe => perdu, GAME STATUS === -1 + dévoile toute la grille + affiche le score
  // - Si click sur une case vide, dévoilé toutes les cases vides adjacentes + les chiffres
  // - Ajouter les intérations de toggle click droit sur les cellules => afficher un drapeau (icon, flag, setFlag)
  // - Si nb drapreaux = nb bombes => plus possible de poser de drapeaux

  // 3. Créer les composants:
  // - Score : Donne le resultats final (succès/echec, temps)

  // 4. Gestion victoire : si toutes les cases non minées sont affichéees + nb drapeaux === nb mines alors VICTOIRE GAME STATUS === 3 (gagné)
  // Afficher le score : temps et à côté les meilleurs scores effectués (ccréer un tableau de score vide et ajouter les scores à chaque fois qu'une game est gagnée)

  return (
    <div className="app">
      <Header />
      <GameBoard />
      <Footer />
    </div>
  );
}

export default App;

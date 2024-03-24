import Footer from '../Footer/Footer';
import GameBoard from '../GameBoard/GameBoard';
import Header from '../Header/Header';
import './App.scss';

function App() {
  // Etapes:
  // 1. Gestion des intéractions en fonction du game status:
  // Tant que GAME STATUS === 1 (démarré)
  // - Si click sur cell isBomb => perdu, GAME STATUS === -1 + dévoile toute la grille + affiche le score
  // - Faire le décompte du nb de drapeaux
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

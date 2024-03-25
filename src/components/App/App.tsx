import Footer from '../Footer/Footer';
import GameBoard from '../GameBoard/GameBoard';
import Header from '../Header/Header';
import './App.scss';

function App() {
  // 1. Créer les composants:
  // - Score : Donne le resultats final (succès/echec, temps)
  // - Afficher le score : temps et à côté les meilleurs scores effectués (ccréer un tableau de score vide et ajouter les scores à chaque fois qu'une game est gagnée)

  // 2. Gestion victoire : si toutes les cases non minées sont affichéees + nb drapeaux === nb mines alors VICTOIRE GAME STATUS === 3 (gagné)

  return (
    <div className="app">
      <Header />
      <GameBoard />
      <Footer />
    </div>
  );
}

export default App;

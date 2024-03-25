import Footer from '../Footer/Footer';
import GameBoard from '../GameBoard/GameBoard';
import Header from '../Header/Header';
import './App.scss';

function App() {
  // 2. Attention, si drapeau dans la Cell on ne peux pas clique gauche dessus

  // 3. Fix bug: lorsque je pose le dernier drapeau + toutes les cells no bombs revealed ça ne termine pas la game

  return (
    <div className="app">
      <Header />
      <GameBoard />
      <Footer />
    </div>
  );
}

export default App;

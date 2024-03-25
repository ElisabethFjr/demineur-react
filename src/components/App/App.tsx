import Footer from '../Footer/Footer';
import GameBoard from '../GameBoard/GameBoard';
import Header from '../Header/Header';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <GameBoard />
      <Footer />
    </div>
  );
}

export default App;

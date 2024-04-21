import './App.css';
import GameForm from './components/GameForm/GameForm';
import GameTable from './components/GameTable/GameTable';
import PlayerForm from './components/PlayerForm/PlayerForm';
import PlayerTable from './components/PlayersTable/PlayerTable';
import TeamTable from './components/TeamTable/TeamTable';
import GamePage from './pages/gamePage/GamePage';
import PlayerPage from './pages/playerPage/PlayerPage'
import TeamPage from './pages/TeamPage/TeamPage'

function App() {
  return (
    <div className="App">
        {/* <GameTable/>
        <PlayerTable/>
        <TeamTable/>
        <GameForm/>
        <PlayerForm/> */}
        {/* <GamePage/> */}
        {/* <PlayerPage/> */}
        <TeamPage/>
    </div>
  );
}

export default App;

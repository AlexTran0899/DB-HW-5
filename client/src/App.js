import './App.css';
import GameForm from './components/GameForm/GameForm';
import PlayerForm from './components/PlayerForm/PlayerForm';
import GamePage from './pages/GamePage/GamePage';
import PlayerPage from './pages/PlayerPage/PlayerPage'
import TeamPage from './pages/TeamPage/TeamPage'
import NavBar from './components/NavBar/NavBar';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DbTablePage from './pages/DbTablePage/DbTablePage';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GamePage/>,
      
    },
    {
      path: "/games",
      element: <GamePage/>,
    },
    {
      path: "/teams",
      element: <TeamPage/>,
    },
    {
      path: "/players",
      element: <PlayerPage/>,
    },
    {
      path: "/add-game",
      element: <GameForm/>,
    },
    {
      path: "/add-player",
      element: <PlayerForm/>,
    },
    {
      path: "/db-tables",
      element: <DbTablePage/>,
    }

  ]);
  
  return (
    <div className="App">
        <NavBar/>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;

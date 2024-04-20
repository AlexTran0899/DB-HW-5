import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./Games.module.css"

function Games() {
    const [games, setGames] = useState([])
  useEffect(() => {
    const url =  process.env.REACT_APP_API_URL + "/api/games"
    axios.get(url).then(res => setGames(res.data))
  }, [])
  return (
    <div className={style}>
        <table>
            <tr>
                <th>GameId</th>
                <th>TeamId1</th>
                <th>TeamId2</th>
                <th>Score1</th>
                <th>Score2</th>
                <th>Date</th>
            </tr>
            {games.length > 0 && games.map(game => (    
                <tr key={game.GameId}>
                    <td>{game.GameId}</td>
                    <td>{game.TeamId1}</td>
                    <td>{game.TeamId2}</td>
                    <td>{game.Score1}</td>
                    <td>{game.Score2}</td>
                    <td>{game.Date}</td>
                </tr>
            ))}
        </table>
    </div>
  );
}

export default Games;

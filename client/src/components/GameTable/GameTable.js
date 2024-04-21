import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./GameTable.module.css"

function GameTable() {
    const [games, setGames] = useState([])
  useEffect(() => {
    const url =  process.env.REACT_APP_API_URL + "/api/games"
    axios.get(url).then(res => setGames(res.data))
  }, [])
  return (
    <div className={style.GameTable}>
        <table>
            <tr>
                <th>game_id</th>
                <th>team_id1</th>
                <th>team_id2</th>
                <th>score1</th>
                <th>score2</th>
                <th>date</th>
            </tr>
            {games.length > 0 && games.map(game => (    
                <tr key={game.game_id}>
                    <td>{game.game_id}</td>
                    <td>{game.team_id1}</td>
                    <td>{game.team_id2}</td>
                    <td>{game.score1}</td>
                    <td>{game.score2}</td>
                    <td>{game.date}</td>
                </tr>
            ))}
        </table>
    </div>
  );
}

export default GameTable;

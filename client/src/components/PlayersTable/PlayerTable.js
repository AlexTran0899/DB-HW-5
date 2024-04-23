import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./PlayerTable.module.css"

function PlayerTable() {
    const [players, setPlayers] = useState([])
  useEffect(() => {
    const url =  process.env.REACT_APP_API_URL + "/api/players"
    axios.get(url).then(res => {setPlayers(res.data); console.log(res.data)})
  }, [])

  return (
    <div className={style.PlayerTable}>
        <table>
            <tr>
                <th>player_id</th>
                <th>team_id</th>
                <th>Name</th>
                <th>Position</th>
            </tr>
            {players.length > 0 && players.map(player => (    
                <tr key={player.player_id}>
                    <td>{player.player_id}</td>
                    <td>{player.team_id}</td>
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                </tr>
            ))}
        </table>
    </div>
  );
}

export default PlayerTable;

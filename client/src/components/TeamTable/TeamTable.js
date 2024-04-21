import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./TeamTable.module.css"

function TeamTable() {
    const [teams, setTeams] = useState([])
  useEffect(() => {
    const url =  process.env.REACT_APP_API_URL + "/api/teams"
    axios.get(url).then(res => setTeams(res.data))
  }, [])

  return (
    <div className={style.TeamTable}>
        <table>
            <tr>
                <th>team_id</th>
                <th>location</th>
                <th>nickname</th>
                <th>Conference</th>
                <th>Division</th>
            </tr>
            {teams.length > 0 && teams.map(team => (    
                <tr key={team.team_id}>
                    <td>{team.team_id}</td>
                    <td>{team.location}</td>
                    <td>{team.nickname}</td>
                    <td>{team.Conference}</td>
                    <td>{team.Division}</td>
                </tr>
            ))}
        </table>
    </div>
  );
}

export default TeamTable;

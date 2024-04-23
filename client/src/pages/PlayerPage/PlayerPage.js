import { useEffect, useState } from "react";
import axios from 'axios'
import PlayerCard from "../../components/PlayerCard/PlayerCard";

const positionOption = [
    "Quarterback",
    "Running Back",
    "Fullback",
    "Wide Receiver", 
    "Tight End",
    "Offensive Tackle",
    "Offensive Guard",
    "Center",
    "Defensive End",
    "Defensive Tackle",
    "Linebacker",
    "Cornerback",
    "Safety",
    "Nickelback",
    "Dimeback",
    "Kicker",
    "Punter",
    "Long Snapper",
    "Holder",
    "Kick Returner",
    "Punt Returner"
]

const PlayerPage = () => {
    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [filter, setFilter] = useState("-1")

    const getAllPlayers = () => {
      const playersUrl =  process.env.REACT_APP_API_URL + "/api/players"
      axios.get(playersUrl).then(res => setPlayers(res.data))
    }

    const getAllTeams = () => {
        const teamsUrl =  process.env.REACT_APP_API_URL + "/api/teams"
        axios.get(teamsUrl).then(res => setTeams(res.data))
    }

    useEffect(() =>  {  
        getAllPlayers()
        getAllTeams()
    }, [])

    const onChangeTeam = (e) => {
        const team_id = e.target.value
        if(team_id === '-1') return getAllPlayers()
        const playerUrl =  process.env.REACT_APP_API_URL + `/api/players/team_id/${team_id}`
        axios.get(playerUrl)
        .then(res => setPlayers(res.data))
        .catch(err => alert("There was an error getting all the players for that team"))
    }
    
    const onChangeFilter = (e) => {
      const filter = e.target.value
      getAllPlayers()
      setFilter(filter)
    }

    const onChangePlayerPosition = (e) => {
      const position = e.target.value
      const playerUrl = process.env.REACT_APP_API_URL + `/api/players/position/${position}`
      axios.get(playerUrl)
      .then(res => setPlayers(res.data))
      .catch(err => alert("There was an error getting all the player for that player position"))
    }


    return (
        <div style={{margin:"50px"}}>
          <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", margin:"50px"}}>Players</h1>
          <div style={{marginBottom: "20px", display:"flex", gap:"20px"}}>

          <select onChange={onChangeFilter} id="filterSelector" name="filterSelector">
              <option selected="selected" value="-1">Please Select a Filter</option>
                <option value="team" >Get all player from a certain team</option>
                <option value="position" >Get all player for a certain position</option>
            </select>

            <div>

              {filter === "team" &&
                <div>
                  <label for="teamSelector">Please select a team: </label>
                  <select onChange={onChangeTeam} id="teamSelector" name="team">
                    <option selected="selected" value="-1">Show all player</option>
                    {teams && teams.map(team => (
                      <option value={team.team_id}>{team.nickname}</option>
                    ))}
                  </select>
                </div>}

                {filter === "position" &&
                <div>
                  <label for="positionSelector">Please select a player position: </label>
                  <select onChange={onChangePlayerPosition} id="positionSelector" name="position">
                    <option selected="selected" value="-1">Show all player</option>
                    {positionOption && positionOption.map(playerPosition => (
                      <option value={playerPosition}>{playerPosition}</option>
                    ))}
                  </select>
                </div>}    
            </div> 
            
          </div>
          {players && players.map(player => <PlayerCard player={player}/>) }
                        
        </div>
    )
}

export default PlayerPage;
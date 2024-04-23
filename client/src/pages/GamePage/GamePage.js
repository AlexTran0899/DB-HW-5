import { useEffect, useState } from "react";
import axios from 'axios'
import GameCard from "../../components/GameCard/GameCard";

const GamePage = () => {
    const [games, setGames] = useState([])
    const [teams, setTeams] = useState([])
    const [filter,setFilter] = useState("-1")

    const getAllGames = () => {
      const gamesUrl =  process.env.REACT_APP_API_URL + "/api/games"
      axios.get(gamesUrl).then(res => setGames(res.data))
    }

    useEffect(() =>  {  
        getAllGames()  
        const teamsUrl =  process.env.REACT_APP_API_URL + "/api/teams"
        axios.get(teamsUrl).then(res => {setTeams(res.data)})

    }, [])

    const onChangeTeam = (e) => {
     const team_id = e.target.value
     if(team_id === "-1") return getAllGames()

     const gamesByteam_idUrl =  process.env.REACT_APP_API_URL + `/api/games/team_id/${team_id}`
     axios.get(gamesByteam_idUrl)
      .then(res => {setGames(res.data)})
      .catch(err => alert("cant get game for that particular team"))
    }
    
    const onChangedate = (e) => {
      const date = e.target.value
      const gamesBydate =  process.env.REACT_APP_API_URL + `/api/games/date/${date}`
      axios.get(gamesBydate)
       .then(res => {setGames(res.data)})
       .catch(err => alert("cant get game for that particular team"))  
    }

    const onChangeFilter = (e) => {
      const filter = e.target.value
      getAllGames()
      setFilter(filter)
    }

    return (
        <div style={{margin:"50px"}}>
          <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", margin:"50px"}}>Games</h1>
          <div style={{marginBottom: "20px", display:"flex", gap:"20px"}}>
            
            <select onChange={onChangeFilter} id="filterSelector" name="filterSelector">
              <option selected="selected" value="-1">Please Select a Filter</option>
                <option value="team" >Get all games from a certain team</option>
                <option value="date" >Get all games at a certain date</option>
            </select>
     
            {filter === "team" && 
              <div>
                <label for="teamSelector">Please select a team: </label>
                <select onChange={onChangeTeam} id="teamSelector" name="team">
                  <option selected="selected" value="-1">Showing all teams</option>
                  {teams.length > 0 && teams.map(team => (
                    <option value={team.team_id}>{team.nickname}</option>
                  ))
                  }
                </select>  
              </div> 
            }

            {filter === "date" && 
              <div >
                <label for="date">Please select a date:</label>
                <input type="date" id="date" name="date" onChange={onChangedate} />
              </div>
            } 
          </div>
            {games && games.map(game => <GameCard game={game}/>)}            
        </div>
    )
}

export default GamePage;
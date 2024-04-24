import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./GameForm.module.css"


const defaultGameData = { 
    team_id1: "1", 
    team_id2: "1", 
    score1: "", 
    score2: "", 
    date: '2024-04-15'
}


function GameForm() {
    const [gameData, setGameData] = useState(defaultGameData)
    const [teams, setTeams] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(gameData)
        const url = process.env.REACT_APP_API_URL + "/api/games"
        axios.post(url, gameData)
        .then(res => {
            console.log(res);
            alert("game created")
        }).catch(err => {
            console.log(err.message)
            alert("failed to create game")
        })
    }
    
    const onChange = (e) => {
        let {name, value} = e.target
        console.log(name, value)
        
        if(["score1","score2"].find(tag => tag === name)) {
            value = value.replace(/[a-zA-Z]+/g, '');     
        }
    
        setGameData(old => ({...old, [name]:value}))

    }
    useEffect(() => {
        const teamsUrl =  process.env.REACT_APP_API_URL + "/api/teams"
        axios.get(teamsUrl).then(res => {setTeams(res.data)})
    }, [gameData])

  return (
    <div className={style.GameForm}>

        <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", margin:"50px"}}>Add a Game</h1>
        <form style={{display:"flex", flexDirection:"column", gap:"20px"}}  onSubmit={onSubmit}>
            <div style={{display:"flex", gap:"20px"}}>
                <div>
                    <div>
                        <label for="team_id1">Team 1</label> <br/>
                        <select onChange={onChange} style={{marginBottom:"20px"}} id="teamSelector" name="team_id1" required>
                            {teams.length > 0 && teams.map(team => (
                                <option value={team.team_id}>{team.nickname}</option>
                            ))
                            }
                        </select>
                        <label for="score1">Team 1 Score:</label><br/>
                        <input type="text" id="score1" name="score1" value={gameData.score1} onChange={onChange} required/>
                    </div>                        
                </div>
                <div>
                    <div>
                        <label for="team_id2">Team 2</label><br/>
                        <select onChange={onChange} style={{marginBottom:"20px"}} id="teamSelector" name="team_id2" required>
                            {teams.length > 0 && teams.map(team => (
                                <option value={team.team_id}>{team.nickname}</option>
                            ))
                            }
                        </select>
                        <label for="score2">Team 2 Score:</label><br/>
                        <input type="text" id="score2" name="score2" value={gameData.score2} onChange={onChange} /><br/>
                    </div>
                </div>
            </div>
            <div>
                <label for="date">Date:</label><br/>
                <input type="date" id="date" name="date" value={gameData.date} onChange={onChange} />
            </div>
            <button type="submit" style={{width:"100%"}}>Submit</button>
        </form>
    </div>
  );
}

export default GameForm;
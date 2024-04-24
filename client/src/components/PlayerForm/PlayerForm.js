import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./PlayerForm.module.css"


const defaultGameData = { 
    team_id: "1",
    name: "",
    position:"Quarterback"
}

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

function PlayerForm() {
    const [playerData, setPlayerData] = useState(defaultGameData)
    const [teams, setTeams] = useState([])

    useEffect(()=> {
        const teamsUrl =  process.env.REACT_APP_API_URL + "/api/teams"
        axios.get(teamsUrl).then(res => {setTeams(res.data)})
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        const url = process.env.REACT_APP_API_URL + "/api/players"

        axios.post(url, playerData)
        .then(res => {
            alert("player created")
        }).catch(err => {
            alert("failed to create player")
        })
    }
    

    const onChange = (e) => {
        let {name, value} = e.target
        
        if("team_id" === name) {
            value = value.replace(/[a-zA-Z]+/g, '');     
        }
    
        setPlayerData(old => ({...old, [name]:value}))

    }

  return (
    <div className={style.PlayerForm}>

        <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", margin:"50px"}}>Add a Player</h1>
        <form style={{display:"flex", flexDirection:"column", gap:"20px"}} onSubmit={onSubmit}>
            <div style={{display:"flex", gap: "20px"}}>
                <div>
                    <label for="team_id">Team:</label><br/>
                    <select onChange={onChange} style={{marginBottom:"20px"}} id="teamSelector" name="team_id" required>
                            {teams.length > 0 && teams.map(team => (
                                <option value={team.team_id}>{team.nickname}</option>
                            ))
                            }
                    </select>
                </div>
                <div>
                    <label for="Name">Name:</label><br/>
                    <input type="text" id="Name" name="name" value={playerData.name} onChange={onChange} /><br/>
                </div>    
            </div>
            <div >
                <label for="Position">Position:</label><br/>
                <select name="position" id="Position" onChange={onChange}>
                    {positionOption.map(position =>  <option value={position}>{position}</option>)}
                </select>
                <br/>
            </div>
            
            <button type="submit" style={{width:"100%"}}>Submit</button>
        </form>
    </div>
  );
}

export default PlayerForm;

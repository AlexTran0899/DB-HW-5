import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./PlayerForm.module.css"


const defaultGameData = { 
    team_id: "",
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

    const onSubmit = (e) => {
        e.preventDefault()
        const url = process.env.REACT_APP_API_URL + "/api/players"

        axios.post(url, playerData)
        .then(res => {
            console.log(res);
            alert("player created")
        }).catch(err => {
            console.log(err.message)
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
        <form style={{display:"flex", flexDirection:"column", gap:"20px"}} onSubmit={onSubmit}>
            <div style={{display:"flex", gap: "20px"}}>
                <div>
                    <label for="team_id">team_id:</label><br/>
                    <input type="text" id="team_id" name="team_id" value={playerData.team_id} onChange={onChange} /><br/>
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

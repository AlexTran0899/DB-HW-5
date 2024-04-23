import { useEffect, useState } from 'react';
import axios from "axios";
import style from "./GameForm.module.css"


const defaultGameData = { 
    team_id1: "", 
    team_id2: "", 
    score1: "", 
    score2: "", 
    date: '2024-04-15'
}


function GameForm() {
    const [gameData, setGameData] = useState(defaultGameData)

    const onSubmit = (e) => {
        e.preventDefault()
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
        
        if(["team_id1", "team_id2","score1","score2"].find(tag => tag === name)) {
            value = value.replace(/[a-zA-Z]+/g, '');     
        }
    
        setGameData(old => ({...old, [name]:value}))

    }
    useEffect(() => {
        console.log(gameData)
    }, [gameData])

  return (
    <div className={style.GameForm}>

        <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", margin:"50px"}}>Add a Game</h1>
        <form style={{display:"flex", flexDirection:"column", gap:"20px"}}  onSubmit={onSubmit}>
            <div style={{display:"flex", gap:"20px"}}>
                <div>
                    <div>
                        <label for="team_id1">team_id1:</label> <br/>
                        <input style={{marginBottom:"20px"}} type="text" id="team_id1" name="team_id1" value={gameData.team_id1} onChange={onChange} />
                        <label for="score1">score1:</label><br/>
                        <input type="text" id="score1" name="score1" value={gameData.score1} onChange={onChange} />
                    </div>                        
                </div>
                <div>
                    <div>
                        <label for="team_id2">team_id2:</label><br/>
                        <input style={{marginBottom:"20px"}} type="text" id="team_id2" name="team_id2" value={gameData.team_id2} onChange={onChange} />                
                        <label for="score2">score2:</label><br/>
                        <input type="text" id="score2" name="score2" value={gameData.score2} onChange={onChange} /><br/>
                    </div>
                </div>
            </div>
            <div>
                <label for="date">date:</label><br/>
                <input type="date" id="date" name="date" value={gameData.date} onChange={onChange} />
            </div>
            <button type="submit" style={{width:"100%"}}>Submit</button>
        </form>
    </div>
  );
}

export default GameForm;

/*
<div>
                    <label for="team_id2">team_id2:</label>
                    <input type="text" id="team_id2" name="team_id2" value={gameData.team_id2} onChange={onChange} />                
                
                    <label for="score2">score2:</label><br/>
                    <input type="text" id="score2" name="score2" value={gameData.score2} onChange={onChange} /><br/>
                </div> */

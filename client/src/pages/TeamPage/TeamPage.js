import { useEffect, useState } from "react";
import axios from 'axios'
import TeamCard from "../../components/TeamCard/TeamCard";

const PlayerPage = () => {
    const [conferences, setConferences] = useState([])
    const [conferencesKeys, setConferencesKeys] = useState([])
    const [filter, setFilter] = useState("-1")

    const getAllTeams = () => {
        const conferencesWithTeamUrl =  process.env.REACT_APP_API_URL + "/api/teams/getTeamsByConferenceAndWins"
        axios.get(conferencesWithTeamUrl).then(res => {
                setConferences(res.data)
                const temp = []
                for(let conference in res.data) {
                    temp.push(conference)
                }
                setConferencesKeys(temp)
            }
        )
    }

    useEffect(() =>  {
        getAllTeams()
    }, [])

    const sortByNumberOfWins = () => {
        let temp = {...conferences}
        for(let conference in temp ){
            temp[conference].sort((a,b) => b.win - a.win)
        }
        setConferences(temp)
    }

    const sortByNumberOfConferencesWins = () => {
        let temp = {...conferences}
        for(let conference in temp ){
            temp[conference].sort((a,b) => b.conferenceWin - a.conferenceWin)
        }
        setConferences(temp)
    }


    useEffect(()=> {
        console.log("here",conferences)
    },[conferences])

    const onChangeFilter = (e) => {
      const filter = e.target.value
      setFilter(filter)
      if(filter === "wins") {
        sortByNumberOfWins()
      } else if(filter === "conferenceWin") {
        sortByNumberOfConferencesWins()
      }
    }


    return (
        <div style={{margin:"50px"}}>
          <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", margin:"50px"}}>Teams</h1>
          <div style={{marginBottom: "20px", display:"flex", gap:"20px"}}>

          <select onChange={onChangeFilter} id="filterSelector" name="filterSelector">
              <option selected="selected" value="-1">Please select a sorting by</option>
                <option value="wins" >Sort By number of wins</option>
                <option value="conferenceWin" >Sort by the number of conference wins</option>
            </select> 

          </div>
          {conferencesKeys && conferencesKeys.map(conferenceName => {
            const conferenceTeams = conferences[conferenceName]
            return (
                <div>
                    <h1 style={{fontSize:"20px", fontWeight:"bold", marginBottom:"20px"}}>{conferenceName}</h1>
                    {conferenceTeams.map(team => <TeamCard team={team}/>)}
                </div>
            )
          })}
          
        </div>
    )
}

export default PlayerPage;
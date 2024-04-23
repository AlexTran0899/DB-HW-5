import GameTable from "../../components/GameTable/GameTable";
import PlayerTable from "../../components/PlayersTable/PlayerTable";
import TeamTable from "../../components/TeamTable/TeamTable";
import style from "./DbTablePage.module.css"

const DbTablePage = () => {
    return(
        <div className={style.dbTablePage} style={{display:"flex", flexDirection:"column", gap:"50px"}}> 
            <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", margin:"50px"}}>DB Tables</h1>
            <div>
                <h1 style={{textAlign: "left", marginBottom:"20px", fontWeight:"bold", fontSize: "30px"}}>Game Table</h1>
                <GameTable/>
                
            </div>
            <div>
                <h1 style={{textAlign: "left", marginBottom:"20px", fontWeight:"bold", fontSize: "30px"}}>Player Table</h1>
                <PlayerTable/>
            </div>
            
            <div>
                <h1 style={{textAlign: "left", marginBottom:"20px", fontWeight:"bold", fontSize: "30px"}}>Team Table</h1>
                <TeamTable/>
            </div>
            
        </div>
    )
}

export default DbTablePage;
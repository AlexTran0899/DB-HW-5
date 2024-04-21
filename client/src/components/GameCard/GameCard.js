import style from "./GameCard.module.css"
import starSvg from "../../asset/star.svg"
const getFormateddate = (date) => {
    const temp = new Date(date)
    const month = temp.getMonth() + 1
    const day = temp.getDate()
    const year = temp.getFullYear()
    return `${month}-${day}-${year}`
}

const GameCard = ({game}) => {
    {console.log(game)}
    return (
        <div className={style.GameCard}>
            <div className={style.Upper}>
                <div className={style.team1} >
                    <h1 style={{width: "190px", textAlign:"left"}}>{game.score1}</h1>
                    {game.score1 > game.score2 && <img  className={style.star} src={starSvg} alt="winner"/>}
                        
                    <div style={{width: "200px"}}>
                        <h2>{game.team1.nickname}</h2> 
                        <h3>{game.team1.location}</h3>
                    </div>
                </div>
                <span>V.S</span>
                <div className={style.team2} >
                    <div style={{width: "200px"}}>
                        <h2>{game.team2.nickname}</h2> 
                        <h3>{game.team2.location}</h3>
                    </div>
                    {game.score2 > game.score1 && <img  className={style.star} src={starSvg} alt="winner"/>}
                    <h1 style={{width: "190px", textAlign:"right"}}>{game.score2}</h1>
                </div>
            </div>
            <div className={style.Bottom}>
                <p>{getFormateddate(game.date)}</p>  
            </div>
            
        </div>        
    )
}

export default GameCard;

// team location, name, date, score, mark who win
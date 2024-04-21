import style from './PlayerCard.module.css'

const PlayerCard =  ({player}) => {
    return (
        <div className={style.PlayerCard}>
            <h1><span> Name: </span> {player.name}</h1>
            <h2><span> Position: </span> {player.position}</h2>
        </div>
    )
}

export default PlayerCard
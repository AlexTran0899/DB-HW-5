import style from './TeamCard.module.css'

const TeamCard =  ({team}) => {
    return (
        <div className={style.TeamCard}>
            <h1><span> Nickname: </span> {team.nickname}</h1>
            <h2><span> Conference: </span> {team.conference}</h2>
            <h2><span> Division: </span> {team.division}</h2>
            <h2><span> Total Wins: </span> {team.win}</h2>
            <h2><span> Conference Wins: </span> {team.conferenceWin}</h2>
        </div>
    )
}

export default TeamCard
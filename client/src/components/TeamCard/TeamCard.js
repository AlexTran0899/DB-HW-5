import style from './TeamCard.module.css'

const TeamCard =  ({team}) => {
    return (
        <div className={style.TeamCard}>
            <h1><span> nickname: </span> {team.nickname}</h1>
            <h2><span> conference: </span> {team.conference}</h2>
            <h2><span> division: </span> {team.division}</h2>
            <h2><span> total wins: </span> {team.win}</h2>
            <h2><span> conference wins: </span> {team.conferenceWin}</h2>
        </div>
    )
}

export default TeamCard
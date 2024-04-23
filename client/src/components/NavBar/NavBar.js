import style from './NavBar.module.css'


const NavBar = () => {

    return(
        <div className={style.NavBar}>
            <a href={`/games`}>Games</a>
            <a href={`/players`}>Players</a>
            <a href={`/teams`}>Teams</a>
            <a href={`/add-game`}>Add Game</a>
            <a href={`/add-player`}>Add Player</a>
            <a href={`/db-tables`}>DB Tables</a>
        </div>

    )
}

export default NavBar;
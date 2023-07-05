import { Link } from "react-router-dom"
import style from "./navbar.module.css";


const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <Link to="/form">FORM</Link>
            <Link to="/home">HOME</Link>
        </div>
        /* 
        const NavBar = ({handleChange, handleSubmit}) => {

        <div className="search-box">
            <form onChange={handleChange}>
                <input placehoder="Search Recipe..." type="search"/>
                <button type="submit" onClick={handleSubmit}>Buscar</button>
            </form>
        </div> */
    )
}

export default NavBar;
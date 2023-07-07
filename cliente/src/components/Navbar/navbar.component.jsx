import { Link } from "react-router-dom"
import style from "./navbar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getRecipesByName } from "../../redux/actions";

const NavBar = () => {
    const dispatch = useDispatch();//permite acceder a cualquier store para actualizar algo.a useDispatch le pasamos el nombre de la store 

    const [searchName, setSearchName] = useState("");

    const handleInput = (event) => { // funcion que setea el searchName, me lo setea a lo que sea el target value del input de busqueda
    event.preventDefault();//para que la pagina no se refresque, no se rerenderice
    setSearchName(event.target.value)
    };

    const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(getRecipesByName(searchName))
    // setSearchName("")
    }
    
    return (
        <div className={style.mainContainer}>
            <Link to="/form">FORM</Link>
            <input placehoder="Search Recipe..." type="search"  onChange={handleInput}/>
            <button type="submit" onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default NavBar;
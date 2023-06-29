import "./navbar.styles.css";

function NavBar({handleChange, handleSubmit}){
    return (
        <div className="search-box">
            <form onChange={handleChange}>
                <input placehoder="Search Recipe..." type="search"/>
                <button type="submit" onClick={handleSubmit}>Buscar</button>
            </form>
        </div>
    )
}

export default NavBar;
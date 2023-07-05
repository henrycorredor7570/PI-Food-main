// import { Link } from "react-router-dom";
import style from "./card.module.css"; 

const Card = ({recipe}) => {
    const {name, image, diets} = recipe;// extraemos todas las propiedades atributos que recibo
    // console.log(diets);
    return (
        <div className={style.card}>
            {/* esta informacion la saco de la api y esta la traigo de mi backend */}
            {/* importante para el PI: */}
            {/* <Link to={`home/${id}`}>ruta que me envia al detail */}
                <h2>{name}</h2>
                <p>{diets}</p>
                <img src={image} alt="" />
            {/* </Link> */}
        </div>
    );
}

export default Card;
import { Link } from "react-router-dom";
import style from "./card.module.css"; 


const Card = ({recipe}) => {
    const {id, name, image, diets } = recipe;// extraemos todas las propiedades atributos que recibo
    
    return (
        <div className={style.card}>
            <Link to={`/detail/${id}`}>
                <h2>{name}</h2>
                <p>{diets}</p>
                <img src={image} alt="" />
            </Link>
        </div>
    );
}
 
export default Card;
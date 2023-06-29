import { Link } from "react-router-dom";
import "./card.styles.css";

function Card({recipe}){
    const {name, image, healthScore, id} = recipe;// extraemos todas las propiedades atributos que recibo
    return (
        <div className="card-container">
            {/* esta informacion la saco de la api y esta la traigo de mi backend */}
            {/* importante para el PI: */}
            <Link to={`home/${id}`}>{/* ruta que me envia al detail */}
                <h2>{name}</h2>
                <p>{image}</p>
                <p>{healthScore}</p>
            </Link>
        </div>
    );
}

export default Card;
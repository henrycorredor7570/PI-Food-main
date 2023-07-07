import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';

import { getRecipes } from "../../redux/actions";
import style from "./cards.module.css";
import Card from "../Card/card.component";

const Cards = () => {
    const dispatch = useDispatch();// dispatch es la manera en que yo le envio una action al store
    const allRecipes = useSelector((state) => state.allRecipes);// con useSelector indico de que estado quiero estar pendiente, a cual estado esta suscrito
    
    useEffect(()=>{// cuando se monta el home se monta el use effect y hace inmediatamente el dispatch que ejecuta la accion
        dispatch(getRecipes())
      },[dispatch]);// este me sirve para cuando haya un cambio en la variable del array de dependencias
      // el distpatch del medio se vuelva a ejecutar

    return (
        <div className={style.cardsList}>
            {allRecipes?.map(recipe => <Card recipe = {recipe}/>
            )}
        </div>  
    );
};

export default Cards;
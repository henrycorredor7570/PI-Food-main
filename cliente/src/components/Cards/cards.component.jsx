import style from "./cards.module.css";
import Card from "../Card/card.component";
const Cards = ({allRecipes}) => {// hago destructurin del estado que recibo
    const recipesList = allRecipes;
    // const recipesList =  useSelector(state=>state.allRecipes)// del codigo de vega
    return (
        <div className={style.cardsList}>
            {recipesList?.map(recipe => <Card recipe = {recipe}/>
            )}
        </div>
    );
};

export default Cards;
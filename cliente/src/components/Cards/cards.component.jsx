import "./cards.styles.css";
import Card from "../Card/card.component";

function Cards({allRecipes}){// hago destructurin del estado que recibo
    const recipesList = allRecipes;

    return (
        <div className="cards-list">
            {recipesList?.map(recipe =>
                <Card recipe = {recipe}/>
            )}
        </div>
    );
};

export default Cards;
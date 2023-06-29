import { GET_RECIPES } from "./action-types";

let initialState = {
    allRecipes: [],
    recipesCopy: [],
    diets:[]};

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                allRecipes: action.payload,
                recipesCopy: action.payload,
            }
        default:
            return state;
    }
}

export default rootReducer;
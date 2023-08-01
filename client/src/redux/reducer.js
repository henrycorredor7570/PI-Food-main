import { GET_RECIPES, GET_BY_NAME } from "./action-types";

let initialState = {
    allRecipes: [],
    recipesFiltered:[],
    recipeDetail:{},
    diets:[]
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                allRecipes: action.payload,
                recipesCopy: action.payload,
            }
        case GET_BY_NAME:
            return{
                ...state,
                allRecipes: action.payload,
                recipesFiltered: action.payload,
            }
        default:
            return {...state};
    }
}

export default rootReducer;
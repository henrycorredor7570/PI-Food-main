import axios from "axios";
import { GET_RECIPES, GET_BY_NAME } from "./action-types";


export const getRecipes = () => {
    return async function(dispatch){// hace un distpatch para poder llegar al reducer
        try {
            const response = await axios.get(`http://localhost:3001/recipes`)
            
            const recipes = response.data
            return dispatch({
            type: GET_RECIPES,
            payload: recipes
        });
        } catch (error) {
            alert(error.message)
        }
        
    }
}

export const getRecipesByName = (name) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        const recipe = response.data
        return dispatch({
            type: GET_BY_NAME,
            payload: recipe,
        })
    }
}

 
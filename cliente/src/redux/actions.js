import axios from "axios";
import { LOCAL_HOST, GET_RECIPES, GET_BY_NAME } from "./action-types";


export const getRecipes = () => {
    return async function(dispatch){
        const response = await axios(`${LOCAL_HOST}/recipes`);
        return dispatch({
            type: GET_RECIPES,
            payload: response.data
        })
    }
}

export const getRecipesByName = (name) => {
    return async function(dispatch){
        const response = await axios(`${LOCAL_HOST}/recipes/${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data,
        })
    }
}


require('dotenv').config();
const { API_KEY } = process.env;

const { Recipe, Diet } = require("../db");
const axios = require("axios");

const getRecipeById = async (id, source) => {
    const recipe = 
            source === "api"
                ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`))
                //https://api.spoonacular.com/recipes/715497/information?apiKey=e7726fffc5904a699860cf7cd8f4240a
                : await Recipe.findByPk(id,{
                    include: {
                        model: Diet,
                        attributes: ["name"],
                    }
                });
                return recipe;
};


module.exports = {
    getRecipeById,
}
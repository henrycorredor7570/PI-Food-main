const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { infoCleaner } = require("../utils/genericFunctions.js");

const getRecipeById = async (id, source) => {
    const recipe = 
        source === "api"
            // ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
            ? (await axios.get(`http://localhost:8080/recipes/${id}/information?apiKey=${API_KEY}`)).data
            //https://api.spoonacular.com/recipes/715497/information?apiKey=e7726fffc5904a699860cf7cd8f4240a  //&addRecipeInformation=true
            : await Recipe.findByPk(id,{
                include: {
                    model: Diet,
                    attributes: ["name"],//quiero que me incluya unicamente estas columnas
                },
            });
            return recipe;
};

// traer todas las recetas de la base de datos:
const getAllRecipes = async ()=>{
    const recipesDB = await Recipe.findAll();// nos va a devolver todas las coincidencias dentro de nuestra tabla de recetas en la DB
    // const infoApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoApi);
    return [...recipesDB, ...recipesApi];
};

//obtener receta por name:
const getRecipeByName = async (name) => {
    // quiero filtrar todos los usuarios por el nombre que me viene por query, si no viene nada devuelvo un arr vacio
    // const infoRecipesApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoRecipesApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoRecipesApi);
    const recipeFiltered = recipesApi.filter(recip => recip.name == name);
    const recipeDb = await Recipe.findAll({where:{name: name}});// metodo de sequelize para filtrar por nombre en la DB
    const recipeById = [...recipeFiltered, ...recipeDb];
    if(recipeById.length === 0) throw Error (`No hay recetas asociadas con el nombre: ${name}`);
    return recipeById;
};

//crear una receta:
const createRecipeDB = async (name, image, summary, healthScore, step) => {
    const newRecipe = await Recipe.create({name, image, summary, healthScore, step})//crea un objeto que tiene las especificaciones del prototipo
    return newRecipe;
}


module.exports = {
    getRecipeById,
    getRecipeByName,
    getAllRecipes,
    createRecipeDB,
}



/* 
   
if(source === "api"){
    // const infoApi = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data.results;
    const infoApi = (await axios.get(`http://localhost:8080/recipes/${id}/information?apiKey=${API_KEY}`)).data.results;
    const recipe = infoCleaner(infoApi);
    return recipe;
}else{
    const recipe = await Recipe.findByPk(id,{
        include: {
            model: Diet,
            attributes: ["name"],//quiero que me incluya unicamente estas columnas
        },
    });
    return recipe;
}



        */

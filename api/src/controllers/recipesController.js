const { Recipe, Diet,  RecipeDiet } = require("../db.js");
const axios = require("axios");
// const { Op } = require("sequelize");
require('dotenv').config();
const { API_KEY } = process.env;
const { infoCleaner, infoCleanerById, normalizarCoincidencia } = require("../utils/genericFunctions.js");

//Ruta para obtener una receta por ID:
// FALTA:
const getRecipeById = async (id, source) => {    
    const recipe = (source === "api")
                // ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
                ? (await axios.get(`http://localhost:8080/recipes/${id}/information?apiKey=${API_KEY}`)).data
                : await Recipe.findByPk(id,{
                    include: {
                        model: Diet,
                        attributes: ["nameDiet"],//quiero que me incluya unicamente estas columnas
                    },
                });
    if(source === "api") {
        return infoCleanerById(recipe);
    }
    return recipe;
};

// Trae todas las recetas de la base de datos y de la API:
const getAllRecipes = async ()=>{
    const recipesDB = await Recipe.findAll();//retorna un arreglo con toda la info de la DB
    // const infoApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoApi); 
    return [...recipesDB, ...recipesApi];
};

//Obtener receta por nombre:
// (ARREGLAR ESTA FUNCION YA QUE LAS RECETAS YA SE PUEDEN OBTENER TODAS EN UNA FUNCION ANTERIOR).
const getRecipeByName = async (name) => {
    // const infoRecipesApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoRecipesApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoRecipesApi);
    const recipeFilteredApi = recipesApi.filter(recipe => normalizarCoincidencia(recipe.name).includes(normalizarCoincidencia(name)));
    
    const recipeDb = await Recipe.findAll({where:{name}});//: {[Op.substring]: name}
    const recipeByName = [...recipeFilteredApi, ...recipeDb];
    if(recipeByName.length === 0) throw Error (`No hay recetas asociadas con el nombre: ${name}`);
    return recipeByName;
};

//Crear una receta:
const createRecipeDB = async (name, image, summary, healthScore, steps, nameDiet) => {
    const newRecipe = await Recipe.create({name, image, summary, healthScore, steps});//crea un objeto que tiene las especificaciones del prototipo

    await Promise.all(
        nameDiet.map(async (diet) => {
            const [newDiet] = await Diet.findOrCreate({//se utiliza [newDiet] para desestructurar el resultado y obtener solo el primer elemento del array, ya que findOrCreate devuelve un array con el objeto encontrado o creado y un booleano indicando si se creó o no).
                where: {nameDiet: diet},
                defaults: {nameDiet: diet}
            });
            await  RecipeDiet.create({
                RecipeId: newRecipe.id,
                DietId: newDiet.id
            })
            return newDiet;
        })
    );
    return newRecipe;
}


module.exports = {
    getRecipeById,
    getRecipeByName,
    getAllRecipes,
    createRecipeDB,
}

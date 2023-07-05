const { Recipe, Diet , RecipeDiets } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
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
    const recipesDB = await Recipe.findAll();//retorna toda la info de la DB
    // const infoApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoApi);    
    return [...recipesDB, ...recipesApi];//son arrays
};

//Obtener receta por nombre:
const getRecipeByName = async (name) => {
    // const infoRecipesApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoRecipesApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoRecipesApi);
    // const recipeFiltered = recipesApi.filter(recip => recip.name == name);
    const recipeFilteredApi = recipesApi.filter(recipe => normalizarCoincidencia(recipe.name).includes(normalizarCoincidencia(name)));
    const recipeDb = await Recipe.findAll({where:{name: {[Op.substring]: name}}});//no esta funcionando el filtrado(Corregir)
    // const filtByName = recipeDb.filter(recipe => recipe.name.includes(name));
    //.toLowerCase() .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const recipeByName = [...recipeFilteredApi, ...recipeDb];
    if(recipeByName.length === 0) throw Error (`No hay recetas asociadas con el nombre: ${name}`);
    return recipeByName;
};

//Crear una receta:
const createRecipeDB = async (name, image, summary, healthScore, steps, nameDiet) => {
    const newRecipe = await Recipe.create({name, image, summary, healthScore, steps});//crea un objeto que tiene las especificaciones del prototipo

    const recipeDiet = await Promise.all(
        nameDiet.map(async (diet) => {
            const [newDiet] = await Diet.findOrCreate({
                where: {nameDiet: diet},
                defaults: {nameDiet: diet}
            });
            await  RecipeDiets.create({
                RecipeId: newRecipe.id,
                DietId: newDiet.id
            })
            return newDiet;
        }));
        return newRecipe;
        

    
}


module.exports = {
    getRecipeById,
    getRecipeByName,
    getAllRecipes,
    createRecipeDB,
}

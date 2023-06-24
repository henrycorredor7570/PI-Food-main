const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { infoCleaner } = require("../utils/genericFunctions.js");

//Ruta para obtener una receta por ID:
// FALTA:
// Tiene que incluir los datos de los tipos de dietas asociados a la receta.
const getRecipeById = async (id, source) => {
    const recipe = 
        source === "api"
            // ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
            ? (await axios.get(`http://localhost:8080/recipes/${id}/information?apiKey=${API_KEY}`)).data
            : await Recipe.findByPk(id,{
                include: {
                    model: Diet,
                    attributes: ["name"],//quiero que me incluya unicamente estas columnas
                },
            });
            return recipe;
};

// Trae todas las recetas de la base de datos y de la API:
const getAllRecipes = async ()=>{
    const recipesDB = await Recipe.findAll();// nos va a devolver todas las coincidencias dentro de nuestra tabla de recetas en la DB
    // const infoApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoApi);
    return [...recipesDB, ...recipesApi];
};

//Obtener receta por nombre:
// FALTA:
// Debe poder buscarla independientemente de mayúsculas o minúsculas
const getRecipeByName = async (name) => {
    // const infoRecipesApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const infoRecipesApi = (await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
    const recipesApi = infoCleaner(infoRecipesApi);
    const recipeFiltered = recipesApi.filter(recip => recip.name == name);
    const recipeDb = await Recipe.findAll({where:{name: name}});// metodo de sequelize para filtrar por nombre en la DB
    const recipeById = [...recipeFiltered, ...recipeDb];
    if(recipeById.length === 0) throw Error (`No hay recetas asociadas con el nombre: ${name}`);
    return recipeById;
};

//Crear una receta:
// FALTA:
// Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
// Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).
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

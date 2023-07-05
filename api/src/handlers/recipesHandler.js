const { getRecipeById, getRecipeByName, getAllRecipes, createRecipeDB } = require("../controllers/recipesController");

// buscar detalles de una receta:
const getDetailHandler = async (req,res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api";// si id no es un numero entonces: source = bdd y si es numero source = api  
    try {
        const response = await getRecipeById(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

// buscar por nombre:
const getRecipesHandler = async (req,res) => {
    const {name} = req.query;

    try {
        if(name){
            const recipeByName = await getRecipeByName(name);
            res.status(200).json(recipeByName);
        }else{
            const response = await getAllRecipes();
            res.status(200).json(response);
        }
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

//crear una receta:
const createRecipeHandler = async (req,res) => {
    const { name, image, summary, healthScore, steps, nameDiet} = req.body;
    try {
        const response = await createRecipeDB(name, image, summary, healthScore, steps, nameDiet);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getDetailHandler,
    getRecipesHandler,
    createRecipeHandler,
}
const { getRecipeById } = require("../controllers/recipesController");

// buscar detalles de una receta:
const getDetailHandler = async (res,res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api";// si id no es un numero entonces: source = bdd y si es numero source = api  
    try {
        const response = await getRecipeById(id,source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = {
    getDetailHandler,

}
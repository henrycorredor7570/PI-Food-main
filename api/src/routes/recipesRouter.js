const { Router } = require("express");
const recipesRouter = Router();
const { getDetailHandler, getRecipesHandler, createRecipeHandler } = require("../handlers/recipesHandler");
const {validateCreateRecipe} = require("../utils/genericFunctions");

// endpoints: ruta de acceso a nuestro backend;
recipesRouter.get("/:id", getDetailHandler);
recipesRouter.get("/", getRecipesHandler);
recipesRouter.post("/", validateCreateRecipe, createRecipeHandler);


module.exports = recipesRouter;


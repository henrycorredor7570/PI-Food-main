const { Router } = require("express");
const recipesRouter = Router();
const { getDetailHandler, getRecipesHandler, createRecipeHandler } = require("../handlers/recipesHandler");

// endpoints: ruta de acceso a nuestro backend;
recipesRouter.get("/:id", getDetailHandler);
recipesRouter.get("/", getRecipesHandler);
recipesRouter.post("/", createRecipeHandler);


module.exports = recipesRouter;


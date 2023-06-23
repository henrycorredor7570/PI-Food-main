const { Router } = require("express");
const recipesRouter = Router();
const { getDetailHandler } = require("../handlers/recipesHandler");

recipesRouter.get("/recipes/:id", getDetailHandler);


module.exports = recipesRouter;


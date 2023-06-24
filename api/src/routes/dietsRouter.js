const { Router } = require("express");
const dietsRouter = Router();
const { getDietsHandler } = require("../handlers/dietsHandler");

// endpoints: ruta de acceso a nuestro backend;
dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;
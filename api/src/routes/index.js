const { Router } = require('express');
const router = Router();
// Importar todos los routers...
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipesRouter");
const dietsRouter = require("./dietsRouter");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRouter);//. cuando algun endpoint incluya /recipes dirigelo a recipesRouter
router.use("/diets", dietsRouter);//. cuando algun endpoint incluya /diets dirigelo a dietsRouter

module.exports = router;
 
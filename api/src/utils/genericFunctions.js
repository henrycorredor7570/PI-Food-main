const infoCleaner = (arr) => { // funcion para limpiar la informacion que me traigo de la api
    
    return arr.map((element) => {
        // if(element.vegetarian === true) return 
        return{
            
            id: element.id,
            name: element.title,
            image: element.image,
            summary: element.summary,
            healthScore: element.healthScore,
            diets: element.diets.join(" -- "),//?.map(element => element), 
            steps: element.analyzedInstructions[0]?.steps.map((paso) => {
                return {
                  number: paso.number,
                  step: paso.step,
                }
            }),
            created: false,// tag que me sirve para validar lo que viene de la Db con lo de la API // pero habria que agregarselo al modelo
            // created: true viene de la base de datos... created: false viene de la api
        };
    });

};

const infoCleanerById = (recipe) => {// funcion para limpiar la informacion con detalles por id que me traigo de la api
    const { id, title, image, summary, healthScore, diets, analyzedInstructions } = recipe
        return{
            id,
            name: title,
            image,
            summary,
            healthScore,
            diets,
            steps: analyzedInstructions[0]?.steps.map((paso) => {
                return {
                  number: paso.number,
                  step: paso.step,
                }
            }),
        }
}

const normalizarCoincidencia = (nombre) => {
    return nombre.normalize("NFD")//para normalizar los caracteres (convierte Á en A, é en e, etc...) NFD :: Normalization Form Canonical Decomposition
            .replace(/[\u0300-\u036f]/g, "")//regExp
            .toLowerCase();
}
//validacion para requerir todos los campos en el create
const validateCreateRecipe = (req,res,next) => {
    const { name, image, summary, healthScore, steps } = req.body;
    if(!name) return res.status(400).json({error:"Required name"});
    if(!image) return res.status(400).json({error:"Required image"});
    if(!summary) return res.status(400).json({error:"Required summary"});
    if(!healthScore) return res.status(400).json({error:"Required healthScore"});
    if(!steps) return res.status(400).json({error:"Required steps"});

    next();
}

module.exports = {
    infoCleaner,
    validateCreateRecipe,
    infoCleanerById,
    normalizarCoincidencia
}

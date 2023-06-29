
const infoCleaner = (arr) => { // funcion para limpiar la informacion que me traigo de la api
    
    return arr.map((element) => {
            
        return{
            id: element.id,
            name: element.title,
            image: element.image,
            summary: element.summary,
            healthScore: element.healthScore,
            steps: element.analyzedInstructions[0]?.steps.map((paso) => {
                return {
                  number: paso.number,
                  step: paso.step,
                }
            }),
            // created: false,// tag que me sirve para validar lo que viene de la Db con lo de la API // pero hablia que agregarselo al modelo
            // created: true viene de la base de datos... created: false viene de la base de datos
        };
    });

};

//validacion para requerir todos los campos
const validateCreateRecipe = (req,res,next) => {
    const { name, image, summary, healthScore, step } = req.body;
    if(!name) return res.status(400).json({error:"Required name"});
    if(!image) return res.status(400).json({error:"Required image"});
    if(!summary) return res.status(400).json({error:"Required summary"})
    if(!healthScore) return res.status(400).json({error:"Required healthScore"})
    if(!step) return res.status(400).json({error:"Required step"})

    next();
}

module.exports = {
    infoCleaner,
    validateCreateRecipe,
}

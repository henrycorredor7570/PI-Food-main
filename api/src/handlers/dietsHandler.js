const { getDietsByApi } = require("../controllers/dietsControllers");

const getDietsHandler = async (req,res) => {
    try {
        const dietsApi = await getDietsByApi();
        res.status(200).json(dietsApi);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = {
    getDietsHandler,
}
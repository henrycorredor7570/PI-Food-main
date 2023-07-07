const { Diet } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;

const getDietsByApi = async () => {
 
  const infoApi = await axios.get(`http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`); // obtengo la informacion de la API
  
  const dietsSet = new Set();// con el Set() los datos ingresados no se pueden repetir y me devuelve un objeto

  infoApi.data.results.forEach( diet => {// recorro el data.results que es un arreglo de la informacion recibida en infoApi 
    diet.diets.forEach(element => dietsSet.add(element))//recorro los subarrays de diets y agrego cada elemento a dietsSet 
  });
  // console.log(dietsSet);
  const arrDiets = Array.from(dietsSet); // el ojeto dietsSet lo convierto en array
// console.log(arrDiets);
  for(const diet of arrDiets){ // recorro el array final con todas las dietas existentes 
    await Diet.findOrCreate({where: {nameDiet: diet},});//creo con mi modelo cada una de las dietas recibidas en la propiedad nombre
  }

  return (arrDiets);
};

module.exports = {
    getDietsByApi,
}
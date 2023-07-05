const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,//UUID es una combinacion de numeros, letras y guiones(codigo alfanumerico) y para que no choquen con los de la api 
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4//aqui se crea el numero aleatorio
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: { // tag que me permite saber si una receta viene de la api o de la DB
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },{timestamps:false}//No me aparezcan los campos de fecha en la que se creo el usuario
  );
};

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diet', {
    id:{
      type: DataTypes.UUID,//UUID es una combinacion de numeros, letras y guiones(codigo alfanumerico)
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4//aqui se crea el numero aleatorio
    },
    nameDiet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{timestamps:false}//para que no me aparezcan los campos de fecha en la que se creo el usuario
  );
};

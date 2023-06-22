const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo mis modelos
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

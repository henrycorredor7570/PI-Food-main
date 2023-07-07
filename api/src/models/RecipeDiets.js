const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('RecipeDiets', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DietId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{timestamps:false}
  );
};

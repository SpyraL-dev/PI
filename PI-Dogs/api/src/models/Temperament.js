const { Sequelize , DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 return sequelize.define('Temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
      primaryKey: true
    },
  });
};

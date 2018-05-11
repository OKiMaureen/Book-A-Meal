'use strict';

module.exports = function (sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    category: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false }
  });
  Meal.associate = function (models) {
    // associations can be defined here
    Meal.belongsTo(models.Menu, { foreignKey: 'menuId' });
    Meal.belongsTo(models.User, { foreignKey: 'userId' });
    Meal.hasMany(models.Order, { foreignkey: 'orderId' });
  };
  return Meal;
};
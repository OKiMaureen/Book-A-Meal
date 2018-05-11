'use strict';

module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    menuName: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
  });
  Menu.associate = function (models) {
    // associations can be defined here
    Menu.hasMany(models.Meal, { foreignKey: 'menuId' });
    Menu.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Menu;
};
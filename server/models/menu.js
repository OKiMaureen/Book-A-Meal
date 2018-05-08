module.exports = (sequelize) => {
  const Menu = sequelize.define('Menu', {}, {});
  Menu.associate = (models) => {
    // associations can be defined here
    Menu.belongsToMany(models.Meal, { through: models.MealMenu });
    Menu.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Menu;
};

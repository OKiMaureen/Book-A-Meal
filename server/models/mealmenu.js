module.exports = (sequelize, DataTypes) => {
  const MealMenu = sequelize.define('MealMenu', {
    mealId: DataTypes.STRING,
    menuId: DataTypes.STRING
  }, {});
  MealMenu.associate = (models) => {
    // associations can be defined here
    MealMenu.hasMany(models.Meal);
    MealMenu.hasMany(models.Menu);
  };
  return MealMenu;
};

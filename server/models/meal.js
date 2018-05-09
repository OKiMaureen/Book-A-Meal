module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    category: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  });
  Meal.associate = (models) => {
    // associations can be defined here
    Meal.belongsTo(models.Menu, { foreignKey: 'menuId' });
    Meal.belongsTo(models.User, { foreignKey: 'userId' });
    Meal.belongsToMany(models.Order, {
      through: models.MealOrder,
      as: 'order',
      foreignKey: 'mealId'
    });
  };
  return Meal;
};

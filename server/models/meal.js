module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    category: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  });
  Meal.associate = (models) => {
    // associations can be defined here
    Meal.belongsToMany(models.Order, { through: models.MealOrder });
    Meal.belongsTo(models.User, { foreignKey: 'userId' });
    Meal.belongsToMany(models.Menu, { through: models.MealMenu });
  };
  return Meal;
};

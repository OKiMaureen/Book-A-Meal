module.exports = (sequelize, DataTypes) => {
  const MealOrder = sequelize.define('MealOrder', {
    mealId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {});
  MealOrder.associate = (models) => {
    // associations can be defined here
    MealOrder.hasMany(models.Meal);
    MealOrder.hasMany(models.Order);
  };
  return MealOrder;
};

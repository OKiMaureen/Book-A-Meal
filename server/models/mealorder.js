module.exports = (sequelize, DataTypes) => {
  const MealOrder = sequelize.define('MealOrder', {
    mealId: { type: DataTypes.INTEGER, allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, {});
  MealOrder.associate = (models) => {
    // associations can be defined here
    MealOrder.hasMany(models.Meal);
    MealOrder.hasMany(models.Order);
  };
  return MealOrder;
};

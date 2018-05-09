module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {}, {});
  Order.associate = (models) => {
    // associations defined here
    Order.belongsToMany(models.Meal, {
      through: models.MealOrder,
      as: 'meal',
      foreignKey: 'orderId'
    });
    Order.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Order;
};

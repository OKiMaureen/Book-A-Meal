module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.STRING, allowNull: false },
  });
  Order.associate = (models) => {
    // associations defined here
    Order.belongsTo(models.Meal, { foreignKey: 'mealId' });
    Order.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Order;
};

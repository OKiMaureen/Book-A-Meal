module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM, values: ['user', 'admin'], defaultValue: 'user', allowNull: false
    },
  }, {});
  User.associate = (models) => {
    // associations defined here
    User.hasMany(models.Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Meal, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.Menu, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  return User;
};

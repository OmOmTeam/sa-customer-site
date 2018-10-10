'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    person_id: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

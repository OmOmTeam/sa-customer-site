'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: DataTypes.STRING(20),
    email: DataTypes.STRING,
    expires: DataTypes.DATE
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
  };
  return Token;
};

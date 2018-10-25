'use strict';
module.exports = (sequelize, DataTypes) => {
  const CallbackRequest = sequelize.define('CallbackRequest', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  CallbackRequest.associate = function(models) {
    // associations can be defined here
  };
  return CallbackRequest;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    building_number: DataTypes.STRING,
    additional_info: DataTypes.STRING
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    sender_addr_id: DataTypes.INTEGER,
    receiver_addr_id: DataTypes.INTEGER,
    pkg_height: DataTypes.FLOAT,
    pkg_length: DataTypes.FLOAT,
    pkg_wigth: DataTypes.FLOAT,
    pkg_weight: DataTypes.FLOAT,
    express: DataTypes.BOOLEAN,
    door_to_door: DataTypes.BOOLEAN
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    owner_id: DataTypes.INTEGER,
    sender_name: DataTypes.STRING,
    sender_phone: DataTypes.STRING,
    sender_country: DataTypes.STRING,
    sender_region: DataTypes.STRING,
    sender_city: DataTypes.STRING,
    sender_street: DataTypes.STRING,
    sender_building_number: DataTypes.STRING,
    sender_additional_info: DataTypes.STRING,
    recipient_name: DataTypes.STRING,
    recipient_phone: DataTypes.STRING,
    recipient_country: DataTypes.STRING,
    recipient_region: DataTypes.STRING,
    recipient_city: DataTypes.STRING,
    recipient_street: DataTypes.STRING,
    recipient_building_number: DataTypes.STRING,
    recipient_additional_info: DataTypes.STRING,
    pkg_height: DataTypes.FLOAT,
    pkg_length: DataTypes.FLOAT,
    pkg_wigth: DataTypes.FLOAT,
    pkg_weight: DataTypes.FLOAT,
    express: DataTypes.BOOLEAN,
    door_to_door: DataTypes.BOOLEAN,
    sms_notify: DataTypes.BOOLEAN,
    contents_list: DataTypes.BOOLEAN,
    letter: DataTypes.BOOLEAN
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};

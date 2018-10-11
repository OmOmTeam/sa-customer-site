'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      sender_name: {
        type: Sequelize.STRING
      },
      sender_phone: {
        type: Sequelize.STRING
      },
      sender_country: {
        type: Sequelize.STRING
      },
      sender_region: {
        type: Sequelize.STRING
      },
      sender_city: {
        type: Sequelize.STRING
      },
      sender_street: {
        type: Sequelize.STRING
      },
      sender_building_number: {
        type: Sequelize.STRING
      },
      sender_additional_info: {
        type: Sequelize.STRING
      },
      recipient_name: {
        type: Sequelize.STRING
      },
      recipient_phone: {
        type: Sequelize.STRING
      },
      recipient_country: {
        type: Sequelize.STRING
      },
      recipient_region: {
        type: Sequelize.STRING
      },
      recipient_city: {
        type: Sequelize.STRING
      },
      recipient_street: {
        type: Sequelize.STRING
      },
      recipient_building_number: {
        type: Sequelize.STRING
      },
      recipient_additional_info: {
        type: Sequelize.STRING
      },
      pkg_height: {
        type: Sequelize.FLOAT
      },
      pkg_length: {
        type: Sequelize.FLOAT
      },
      pkg_width: {
        type: Sequelize.FLOAT
      },
      pkg_weight: {
        type: Sequelize.FLOAT
      },
      express: {
        type: Sequelize.BOOLEAN
      },
      door_to_door: {
        type: Sequelize.BOOLEAN
      },
      sms_notify: {
        type: Sequelize.BOOLEAN
      },
      contents_list: {
        type: Sequelize.BOOLEAN
      },
      letter: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};

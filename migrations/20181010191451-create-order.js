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
      sender_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "People",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "People",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      sender_addr_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Addresses",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      receiver_addr_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Addresses",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      pkg_height: {
        type: Sequelize.FLOAT
      },
      pkg_length: {
        type: Sequelize.FLOAT
      },
      pkg_wigth: {
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

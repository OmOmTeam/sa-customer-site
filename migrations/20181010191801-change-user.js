'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'name'),
      queryInterface.addColumn('Users', 'first_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'last_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'patronymic', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'country', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'region', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'street', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'building_number', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'additional_info', {
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'additional_info'),
      queryInterface.removeColumn('Users', 'building_number'),
      queryInterface.removeColumn('Users', 'street'),
      queryInterface.removeColumn('Users', 'city'),
      queryInterface.removeColumn('Users', 'region'),
      queryInterface.removeColumn('Users', 'country'),
      queryInterface.removeColumn('Users', 'patronymic'),
      queryInterface.removeColumn('Users', 'last_name'),
      queryInterface.removeColumn('Users', 'first_name'),
      queryInterface.addColumn('Users', 'name', {
        type: Sequelize.STRING
      })
    ]);
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'payment_status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'UNPAID'
      }),
      queryInterface.addColumn('Orders', 'synchronized', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'payment_status'),
      queryInterface.removeColumn('Orders', 'synchronized')
    ]);
  }
};

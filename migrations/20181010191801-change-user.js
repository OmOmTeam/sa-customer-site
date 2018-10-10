'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'name'),
      queryInterface.removeColumn('Users', 'phone'),
      queryInterface.addColumn('Users', 'person_id', {
        type: Sequelize.INTEGER,
        references: {
          model: "People",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'person_id'),
      queryInterface.addColumn('Users', 'phone', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'name', {
        type: Sequelize.STRING
      })
    ]);
  }
};

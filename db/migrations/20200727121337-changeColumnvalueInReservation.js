'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reservation', 'total', {
        type: Sequelize.FLOAT(9,2),
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reservation', 'total', {
        type: Sequelize.FLOAT(9,2),
      })
    ])
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reservation', 'isHold', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }),
      queryInterface.addColumn('Reservation', 'paymentAttempt', {
        type: Sequelize.INTEGER(1),
        defaultValue: 0,
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Reservation', 'isHold'),
      queryInterface.removeColumn('Reservation', 'paymentAttempt'),
      
    ])
  }
};

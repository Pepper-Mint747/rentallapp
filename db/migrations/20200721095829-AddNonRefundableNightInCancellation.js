'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Cancellation', 'nonRefundableNightsPriorCheckIn', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }),
      queryInterface.addColumn('Cancellation', 'nonRefundableNightsBeforeCheckIn', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      }),
      queryInterface.addColumn('Cancellation', 'nonRefundableNightsDuringCheckIn', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Cancellation', 'nonRefundableNightsPriorCheckIn'),
      queryInterface.removeColumn('Cancellation', 'nonRefundableNightsBeforeCheckIn'),
      queryInterface.removeColumn('Cancellation', 'nonRefundableNightsDuringCheckIn'),

    ])
  }
};

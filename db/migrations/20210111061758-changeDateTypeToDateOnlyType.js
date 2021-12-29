'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'ListBlockedDates',
        'blockedDates',
        {
          type: Sequelize.DATEONLY,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Reservation',
        'checkIn',
        {
          type: Sequelize.DATEONLY,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Reservation',
        'checkOut',
        {
          type: Sequelize.DATEONLY,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'ReservationSpecialPricing',
        'blockedDates',
        {
          type: Sequelize.DATEONLY,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'ThreadItems',
        'startDate',
        {
          type: Sequelize.DATEONLY
        }
      ),
      queryInterface.changeColumn(
        'ThreadItems',
        'endDate',
        {
          type: Sequelize.DATEONLY
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'ListBlockedDates',
        'blockedDates',
        {
          type: DataType.DATE,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'Reservation',
        'checkIn',
        {
          type: DataType.DATE,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'Reservation',
        'checkOut',
        {
          type: DataType.DATE,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'ReservationSpecialPricing',
        'blockedDates',
        {
          type: DataType.DATE,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        'ThreadItems',
        'startDate',
        {
          type: DataType.DATE
        }
      ),
      queryInterface.changeColumn(
        'ThreadItems',
        'endDate',
        {
          type: DataType.DATE
        }
      )
    ]);
  }
};

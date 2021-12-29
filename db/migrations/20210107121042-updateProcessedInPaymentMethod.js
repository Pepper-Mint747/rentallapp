'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE PaymentMethods SET processedIn="5–7 business days" WHERE id=2')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE PaymentMethods SET processedIn="5 to 7 business days" WHERE id=2')
  }
};

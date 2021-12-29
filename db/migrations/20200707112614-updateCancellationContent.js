'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `Cancellation` SET `policyContent`='Cancel up to 1 day prior to arrival and get a 100% refund',priorDays = 1 WHERE `id`=1 "),
      queryInterface.sequelize.query("UPDATE `Cancellation` SET `policyContent`='Cancel up to 5 days prior to arrival and get a 50% refund',priorDays = 5 WHERE `id`=2 "),
      queryInterface.sequelize.query("UPDATE `Cancellation` SET `policyContent`='Cancel up to 7 days prior to arrival and get a 50% refund',priorDays = 7 WHERE `id`=3 ")
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `Cancellation` SET `policyContent`='Cancel up to 1 day prior to arrival and get a 100% refund',priorDays = 1 WHERE `id`=1 "),
      queryInterface.sequelize.query("UPDATE `Cancellation` SET `policyContent`='Cancel up to 5 days prior to arrival and get a 50% refund',priorDays = 5 WHERE `id`=2 "),
      queryInterface.sequelize.query("UPDATE `Cancellation` SET `policyContent`='Cancel up to 7 days prior to arrival and get a 50% refund',priorDays = 7 WHERE `id`=3 ")
    ])
  }
};
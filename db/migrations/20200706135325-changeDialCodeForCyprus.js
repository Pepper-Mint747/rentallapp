'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `Country` SET `dialCode`='+357' WHERE `countryCode`='CY'")
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `Country` SET `dialCode`='+357' WHERE `countryCode`='CY'")
    ])
  }
};

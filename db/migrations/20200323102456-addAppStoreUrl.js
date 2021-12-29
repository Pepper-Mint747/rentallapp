'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings',[{
        title: "AppStore URL",
        name: 'appStoreUrl',
        value: 'www.apple.com',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings',{
        name:{
          $in: ['appStoreUrl']
        }
      })
    ])
  }
};

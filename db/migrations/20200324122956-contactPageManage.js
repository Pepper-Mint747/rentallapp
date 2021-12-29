'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: "email",
          name: 'email',
          value: "admin@radicalstart.com",
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Phone Number",
          name: 'phoneNumber',
          value: '9876543210',
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Address",
          name: 'address',
          value: "12,anna nagar, madurai",
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['mailId', 'phoneNumber', 'address']
        }
      })
    ])
  }
};

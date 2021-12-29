'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SideMenu', [{
        title: 'Flexible',
        description: 'Cancel up to 1 day prior to arrival and get a 100% refund.',
        name: 'block1',
        page: null,
        step: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SideMenu', [{
        title: 'Moderate',
        description: 'Cancel up to 5 days prior to arrival and get a 50% refund.',
        name: 'block2',
        page: null,
        step: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SideMenu', [{
        title: 'Strict',
        description: 'Cancel up to 7 days prior to arrival and get a 50% refund.',
        name: 'block3',
        page: null,
        step: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SideMenu', {
      name: {
        $in: ['block1', 'block2', 'block3']
      }
    })
  }
};

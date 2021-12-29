'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticPage',[
        {
          pageName: 'Help',
          content: '<p></p>',
          metaTitle: "Help",
          metaDescription: "Help",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelet('StaticPage', {
        pageName: {
          $in: ['Help']
        }
      })
    ])
  }
};

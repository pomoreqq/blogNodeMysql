'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories',[
      {
        name: 'NodeJS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Essa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'drip',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'swag',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories',{},null)
  }
};

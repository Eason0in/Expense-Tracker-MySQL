'use strict'
const hashPassword = require('../public/javascripts/getHashPassword')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'asd',
          email: 'asd@asd',
          password: hashPassword('asd'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', [
      {
        name: 'asd'
      }
    ])
  }
}

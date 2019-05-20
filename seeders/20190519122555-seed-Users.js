'use strict'
const bcrypt = require('bcryptjs')
let initPassword = 'asd'
const getPasswordHash = new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return reject(err)
    return resolve(salt)
  })
})

const getPasswordHash2 = salt => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(initPassword, salt, (err, hash) => {
      if (err) return reject(err)
      return resolve(hash)
    })
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await getPasswordHash
    const hashPassword = await getPasswordHash2(salt)
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'asd',
          email: 'asd@asd',
          password: hashPassword,
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

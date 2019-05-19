'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = await queryInterface.rawSelect(
      'Users',
      {
        where: {
          name: 'asd'
        }
      },
      ['id']
    )

    if (userId) {
      return queryInterface.bulkInsert(
        'Records',
        [
          {
            name: '午餐',
            category: '餐飲食品',
            date: '2019/04/23',
            amount: 60,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '晚餐',
            category: '餐飲食品',
            date: '2019/04/23',
            amount: 60,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '捷運',
            category: '交通出行',
            date: '2019/04/23',
            amount: 120,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '電影:驚奇隊長',
            category: '休閒娛樂',
            date: '2019/04/23',
            amount: 220,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '租金',
            category: '家居物業',
            date: '2019/04/01',
            amount: 25000,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      )
    }
  },

  async down(queryInterface, Sequelize) {
    const userId = await queryInterface.rawSelect(
      'Users',
      {
        where: {
          name: 'asd'
        }
      },
      ['id']
    )

    if (userId) {
      return queryInterface.bulkDelete(
        'Records',
        [
          {
            userId: userId
          }
        ],
        {}
      )
    }
  }
}

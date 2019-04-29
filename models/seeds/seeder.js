const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../User')
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://127.0.0.1/expensetracker', { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
  let initPassword = 'asd'
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(initPassword, salt, (err, hash) => {
      User.create(
        {
          email: 'asd@asd',
          name: 'asd',
          password: hash
        },
        (err, user) => {
          if (err) console.error(err)

          Record.insertMany([
            {
              name: '午餐',
              category: '餐飲食品',
              date: '2019/04/23',
              amount: 60,
              userId: user._id
            },
            {
              name: '晚餐',
              category: '餐飲食品',
              date: '2019/04/23',
              amount: 60,
              userId: user._id
            },
            {
              name: '捷運',
              category: '交通出行',
              date: '2019/04/23',
              amount: 120,
              userId: user._id
            },
            {
              name: '電影:驚奇隊長',
              category: '休閒娛樂',
              date: '2019/04/23',
              amount: 220,
              userId: user._id
            },
            {
              name: '租金',
              category: '家居物業',
              date: '2019/04/01',
              amount: 25000,
              userId: user._id
            }
          ])
          console.log('insert done!')
        }
      )
    })
  })

  // let initPassword = 'asd'
  // getBcryptPassword(initPassword, insertDatas)
})

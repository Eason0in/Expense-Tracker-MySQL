const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect('mongodb://127.0.0.1/expensetracker', { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
  Record.insertMany([
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2019/04/23',
      amount: 60
    },
    {
      name: '晚餐',
      category: '餐飲食品',
      date: '2019/04/23',
      amount: 60
    },
    {
      name: '捷運',
      category: '交通出行',
      date: '2019/04/23',
      amount: 120
    },
    {
      name: '電影:驚奇隊長',
      category: '休閒娛樂',
      date: '2019/04/23',
      amount: 220
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2019/04/01',
      amount: 25000
    }
  ])
  console.log('insert done!')
  // let initPassword = 'asd'
  // getBcryptPassword(initPassword, insertDatas)
})

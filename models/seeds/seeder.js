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
      category: 'eat',
      date: '2019/04/23',
      amount: 60
    },
    {
      name: '晚餐',
      category: 'eat',
      date: '2019/04/23',
      amount: 60
    },
    {
      name: '捷運',
      category: 'transportation',
      date: '2019/04/23',
      amount: 120
    },
    {
      name: '電影:驚奇隊長',
      category: 'entertainment',
      date: '2019/04/23',
      amount: 220
    },
    {
      name: '租金',
      category: 'home',
      date: '2019/04/01',
      amount: 25000
    }
  ])
  console.log('insert done!')
  // let initPassword = 'asd'
  // getBcryptPassword(initPassword, insertDatas)
})

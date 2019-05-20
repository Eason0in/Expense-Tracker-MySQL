const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const getTotalAmount = require('../public/javascripts/getTotalAmount')
const { authenticated } = require('../config/auth')

//依照資料取得畫圖的百分比
function getDrawPercentage(percentage) {
  let one = percentage % 10
  let ten = Math.floor(percentage / 10)
  if (ten === 10) {
    return 100
  }
  if (ten === 9 && one >= 5) {
    return 95
  }
  if (ten !== 0 && one >= 5) {
    return ++ten * 10
  }
  if (ten !== 0 && one < 5) {
    return ten * 10
  }
  if (ten === 0 && one >= 5) {
    return ++ten * 10
  }
  if (ten === 0 && one < 5) {
    return 5
  }
}

router.get('/', authenticated, (req, res) => {
  res.render('statistic')
})

//依照月份顯示統計圖表
router.get('/:month', authenticated, (req, res) => {
  let month = req.params.month
  Record.findAll({ where: { userId: req.user.id } })
    .then(recordList => {
      recordList = recordList.filter(item => {
        return item.date.split('/')[1] === month
      })
      const total = getTotalAmount(recordList)
      var records = []
      recordList.reduce((res, value) => {
        if (!res[value.category]) {
          res[value.category] = { category: value.category, amount: 0 }
          records.push(res[value.category])
        }
        res[value.category].amount += value.amount
        return res
      }, {})

      let currentSum = 0
      records.forEach((item, index, array) => {
        if (index === array.length - 1) {
          item.percentage = (100 - currentSum).toFixed(1)
          item.drawPercentage = getDrawPercentage(parseInt(item.percentage))
        } else {
          item.percentage = ((item.amount / total) * 100).toFixed(1)
          currentSum += parseFloat(item.percentage)
          item.drawPercentage = getDrawPercentage(parseInt(item.percentage))
        }
      })
      res.render('statistic', { records, total, month })
    })
    .catch(err => console.log(err))
})

module.exports = router

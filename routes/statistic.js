const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const getTotalAmount = require('../public/javascripts/getTotalAmount')
const { authenticated } = require('../config/auth')

function getDrawPercentage(percentage) {
  let one = percentage % 10
  let ten = Math.floor(percentage / 10)
  if (ten > 9 && one > 5) {
    return 100
  }
  if (ten === 9 && one >= 5) {
    return 95
  }
  if (ten !== 0 && one > 5) {
    return ++ten * 10
  }
  if (ten !== 0 && one < 5) {
    return ten * 10
  }
  if (ten === 0 && one > 5) {
    return ++ten * 10
  }
  if (ten === 0 && one < 5) {
    return 5
  }
}

router.get('/', authenticated, (req, res) => {
  res.render('statistic')
})

router.get('/:month', authenticated, (req, res) => {
  let month = req.params.month
  Record.find({ userId: req.user._id }).exec((err, recordList) => {
    if (err) console.err(err)

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
        item.percentage = 100 - currentSum
        item.drawPercentage = getDrawPercentage(item.percentage)
      } else {
        item.percentage = Math.round((item.amount / total) * 100)
        item.drawPercentage = getDrawPercentage(item.percentage)
        currentSum += item.percentage
      }
    })
    res.render('statistic', { records, total, month })
  })
})

module.exports = router

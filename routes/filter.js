const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const categoryInfo = require('../public/javascripts/categoryInfo')

const filterCondition = {}

const filterData = recordList => {
  let records = recordList
  const { month, condition } = filterCondition
  if (month) {
    records = records.filter(item => {
      return item.date.split('/')[1] === filterCondition.month
    })
  }

  if (condition) {
    records = records.filter(item => {
      return item.category === filterCondition.condition
    })
  }

  const total = records.reduce((sum, { amount }) => sum + amount, 0)
  return { records, total }
}

router.get('/:category', (req, res) => {
  const { category } = req.params
  if (isNaN(parseInt(category))) {
    filterCondition.condition = category
  } else if (category) {
    filterCondition.month = category
  }

  Record.find({ userId: req.user._id }).exec((err, recordList) => {
    if (err) console.err(err)
    const { records, total } = filterData(recordList)
    res.render('index', { records, total, categoryInfo, filterCondition })
  })
})

module.exports = router

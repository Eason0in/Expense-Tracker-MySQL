const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const categoryInfo = require('../public/javascripts/categoryInfo')
const getTotalAmount = require('../public/javascripts/getTotalAmount')

const filterCondition = {}

const filterData = (recordList, filterCondition) => {
  let records = recordList
  const { month, category } = filterCondition
  if (month) {
    records = records.filter(item => {
      return item.date.split('/')[1] === filterCondition.month
    })
  }

  if (category) {
    records = records.filter(item => {
      return item.category === filterCondition.category
    })
  }

  const total = getTotalAmount(records)
  return { records, total }
}

router.get('/:condition', (req, res) => {
  const { condition } = req.params
  if (isNaN(parseInt(condition))) {
    filterCondition.category = condition
  } else if (condition) {
    filterCondition.month = condition
  }

  Record.find({ userId: req.user._id }).exec((err, recordList) => {
    if (err) console.err(err)
    const { records, total } = filterData(recordList, filterCondition)
    res.render('index', { records, total, categoryInfo, filterCondition })
  })
})

module.exports = router

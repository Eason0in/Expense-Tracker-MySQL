const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
  Record.aggregate([
    // { "$match": { "name": "午餐" } },
    {
      $project: {
        name: '$name',
        category: '$category',
        amount: '$amount',
        date: {
          $dateToString: {
            format: '%Y/%m/%d',
            date: '$date'
          }
        }
      }
    }
  ]).exec((err, records) => {
    if (err) console.err(err)
    const total = records.reduce((sum, { amount }) => sum + amount, 0)
    res.render('index', { records, total })
  })
})

module.exports = router

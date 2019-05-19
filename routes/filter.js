const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const getTotalAmount = require('../public/javascripts/getTotalAmount')

router.post('/', (req, res) => {
  const category = req.body.category ? req.body.category : { $exists: true }
  const month = req.body.month ? req.body.month : ''

  Record.find({ userId: req.user._id, category }).exec((err, records) => {
    if (err) console.err(err)

    if (month) {
      records = records.filter(record => {
        return record.date.split('/')[1] === month.padStart(2, '0')
      })
    }
    console.log(records)
    const total = getTotalAmount(records).toLocaleString()
    res.render('index', { records, total, category, month })
  })
})

module.exports = router

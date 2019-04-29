const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/:month', (req, res) => {
  Record.find().exec((err, recordList) => {
    if (err) console.err(err)
    const records = recordList.filter(item => {
      return item.date.split('/')[1] === req.params.month
    })

    const total = records.reduce((sum, { amount }) => sum + amount, 0)
    res.render('index', { records, total })
  })
})

module.exports = router

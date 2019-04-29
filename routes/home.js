const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
  Record.find().exec((err, records) => {
    if (err) console.err(err)
    const total = records.reduce((sum, { amount }) => sum + amount, 0)
    res.render('index', { records, total })
  })
})

module.exports = router

const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const Handlebars = require('handlebars')
const categoryInfo = require('../public/javascripts/categoryInfo')

router.get('/', (req, res) => {
  Record.find().exec((err, records) => {
    if (err) console.err(err)
    const total = records.reduce((sum, { amount }) => sum + amount, 0)
    res.render('index', { records, total, categoryInfo })
  })
})

module.exports = router

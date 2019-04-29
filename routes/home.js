const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const Handlebars = require('handlebars')
const categoryInfo = require('../public/javascripts/categoryInfo')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Record.find().exec((err, records) => {
    if (err) console.err(err)
    let filterCondition = {}
    const total = records.reduce((sum, { amount }) => sum + amount, 0)
    res.render('index', { records, total, categoryInfo, filterCondition })
  })
})

module.exports = router

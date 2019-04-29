const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const Handlebars = require('handlebars')
const categoryInfo = require('../public/javascripts/categoryInfo')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .sort('-date')
    .exec((err, records) => {
      if (err) console.err(err)
      let filterCondition = {}
      const total = records.reduce((sum, { amount }) => sum + amount, 0)
      res.render('index', { records, total, categoryInfo, filterCondition })
    })
})

Handlebars.registerHelper('letterText', function(letter, options) {
  switch (letter) {
    case '家居物業':
      return 'fa-home'
    case '交通出行':
      return 'fa-shuttle-van'
    case '休閒娛樂':
      return 'fa-grin-beam'
    case '餐飲食品':
      return 'fa-utensils'
    case '其他':
      return 'fa-pen'
  }
})

module.exports = router

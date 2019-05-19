const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const Handlebars = require('handlebars')
const getTotalAmount = require('../public/javascripts/getTotalAmount')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .sort('-date')
    .exec((err, records) => {
      if (err) console.err(err)
      const total = getTotalAmount(records).toLocaleString()
      res.render('index', { records, total })
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

Handlebars.registerHelper('for', function(from, to, incr, month, block) {
  var accum = ''
  var option = ''
  for (var i = from; i < to; i += incr) {
    option = block.fn(i)
    if (i === parseInt(month)) {
      option = option.replace('<option ', '<option selected ')
    }
    accum += option
  }
  return accum
})

Handlebars.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
})

module.exports = router

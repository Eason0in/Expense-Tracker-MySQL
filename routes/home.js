const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const Handlebars = require('handlebars')

router.get('/', (req, res) => {
  Record.find().exec((err, records) => {
    if (err) console.err(err)
    const total = records.reduce((sum, { amount }) => sum + amount, 0)
    res.render('index', { records, total })
  })
})

Handlebars.registerHelper('times', n => {
  let months = ''
  for (let i = 1; i <= n; i++) {
    month = i.toString().padStart(2, '0')
    months += `<a class="dropdown-item" href="/filter/${month}">${month}</a>`
  }

  return months
})
module.exports = router

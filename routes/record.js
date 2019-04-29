const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { setDateFormat } = require('../config/setDateFormat')
const categoryInfo = require('../public/javascripts/categoryInfo')
const Handlebars = require('handlebars')

router.get('/new', (req, res) => {
  res.render('new', { categoryInfo })
})

router.post('/new', setDateFormat, (req, res) => {
  const newRecord = new Record(req.body)
  newRecord.save().then(() => {
    res.redirect('/')
  })
})

router.get('/edit/:id', (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) console.err(err)
    record.date = record.date.replace(/\//g, '-')
    res.render('edit', { record, categoryInfo })
  })
})

router.put('/edit/:id', setDateFormat, (req, res) => {
  Record.findOneAndUpdate({ _id: req.params.id }, req.body, err => (err ? console.err(err) : res.redirect('/')))
})

router.delete('/delete/:id', (req, res) => {
  res.send('delete')
})

Handlebars.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
})

module.exports = router

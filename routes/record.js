const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const { setDateFormat } = require('../config/setDateFormat')
const Handlebars = require('handlebars')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', setDateFormat, (req, res) => {
  const newRecord = new Record(req.body)
  newRecord.userId = req.user.id
  newRecord.save().then(() => {
    res.redirect('/')
  })
})

router.get('/edit/:id', (req, res) => {
  Record.findOne({ where: { id: req.params.id, userId: req.user.id } }).then(record => {
    record.date = record.date.replace(/\//g, '-')
    res.render('edit', { record })
  })
})

router.put('/edit/:id', setDateFormat, (req, res) => {
  Record.update(req.body, { where: { id: req.params.id, userId: req.user.id } }).then(() => res.redirect('/'))
})

router.delete('/delete/:id', (req, res) => {
  Record.destroy({ where: { id: req.params.id, userId: req.user.id } }).then(() => res.redirect('/'))
})

Handlebars.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
})

module.exports = router

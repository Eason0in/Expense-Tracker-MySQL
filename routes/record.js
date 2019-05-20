const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const { setDateFormat } = require('../config/setDateFormat')
const Handlebars = require('handlebars')

//顯示新增畫面
router.get('/new', (req, res) => {
  res.render('new')
})

//新增一筆資料
router.post('/new', setDateFormat, (req, res) => {
  const newRecord = new Record(req.body)
  newRecord.userId = req.user.id
  newRecord
    .save()
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

//取得點選資料的編輯畫面
router.get('/edit/:id', (req, res) => {
  Record.findOne({ where: { id: req.params.id, userId: req.user.id } })
    .then(record => {
      record.date = record.date.replace(/\//g, '-')
      res.render('edit', { record })
    })
    .catch(err => console.log(err))
})

//儲存點選資料的編輯資料
router.put('/edit/:id', setDateFormat, (req, res) => {
  Record.update(req.body, { where: { id: req.params.id, userId: req.user.id } })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//刪除資料
router.delete('/delete/:id', (req, res) => {
  Record.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//當類別下拉選定該類別
Handlebars.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
})

module.exports = router

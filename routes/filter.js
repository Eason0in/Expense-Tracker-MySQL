const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../models')
const Record = db.Record
const getTotalAmount = require('../public/javascripts/getTotalAmount')

router.post('/', (req, res) => {
  const category = req.body.category ? req.body.category : { [Op.like]: '%' }
  const month = req.body.month ? req.body.month : ''

  Record.findAll({
    where: { userId: req.user.id, category }
  }).then(records => {
    if (month) {
      records = records.filter(record => {
        return record.date.split('/')[1] === month.padStart(2, '0')
      })
    }
    const total = getTotalAmount(records).toLocaleString()
    res.render('index', { records, total, category, month })
  })
})

module.exports = router

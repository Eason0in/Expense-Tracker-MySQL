const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const newRecord = new Record(req.body)
  newRecord.save().then(() => {
    res.redirect('/')
  })
})

router.get('/edit/:id', (req, res) => {
  res.render('edit')
})

router.put('/edit/:id', (req, res) => {
  res.send('edit')
})

router.delete('/delete/:id', (req, res) => {
  res.send('delete')
})

module.exports = router

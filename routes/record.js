const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/edit/:id', (req, res) => {
  res.render('edit')
})

module.exports = router

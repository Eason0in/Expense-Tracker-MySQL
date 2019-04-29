const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位為必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼不一致' })
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 })
  } else {
    const newUser = new User({ name, email, password })

    newUser.save().then(() => {
      res.redirect('/users/login')
    })
  }
})
module.exports = router

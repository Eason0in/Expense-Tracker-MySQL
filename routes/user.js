const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

//取得登入畫面
router.get('/login', (req, res) => {
  res.render('login')
})

//驗證登入
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash('warning_msg', info.message)
      return res.redirect('/users/login')
    }
    req.logIn(user, err => {
      if (err) {
        return next(err)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

//取得註冊畫面
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊新使用者
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
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          console.log('使用者已存在')
          res.render('register', { errors, name, email, password, password2 })
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              const newUser = new User({ email, name, password: hash })
              newUser
                .save()
                .then(() => {
                  res.redirect('/users/login')
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
      .catch(err => console.log(err))
  }
})

//登出
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '登出成功')
  res.redirect('/users/login')
})

module.exports = router

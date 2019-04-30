const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')

router.use('/', require('./home'))
router.use('/records', authenticated, require('./record'))
router.use('/filter', authenticated, require('./filter'))
router.use('/auth', require('./auth'))
router.use('/users', require('./user'))

module.exports = router

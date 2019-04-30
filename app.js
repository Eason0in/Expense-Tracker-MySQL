const express = require('express')
const mongoose = require('mongoose')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({ secret: 'ddd123', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
mongoose.connect('mongodb://127.0.0.1/expensetracker', { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection

app.use(require('./routes'))

app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})

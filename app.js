const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
mongoose.connect('mongodb://127.0.0.1/expensetracker', { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection

app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})

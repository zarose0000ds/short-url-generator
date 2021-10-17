const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/short-url'

// DATABASE CONNECTION
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected')
})

// TEMPLATE ENGINE
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// STATIC FILES
app.use(express.static('public'))

// BODY PARSER
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  console.log('POST URL')
  res.redirect('/')
})

// SERVER LISTENING
app.listen(PORT, () => {
  console.log('The server is listening')
})
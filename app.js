const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const sha256 = require('js-sha256')

const ShortURL = require('./models/shortURL')

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/short-url'
const SHORTEN_KEYS = [0, 5, 24, 31, 32] //MUST IN RANGE 0 ~ 63

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
  // GENERATE SHORTEN URL
  const hash = sha256.create()
  const hashedURL = hash.update(req.body.url).hex()
  let shortenURL = `http://localhost:${PORT}/`

  SHORTEN_KEYS.forEach(id => {
    shortenURL += hashedURL[id]
  })
  console.log(`[Shorten URL] ${shortenURL}`)

  res.redirect('/')
})

app.get('/:code', (req, res) => {
  console.log(req.params.code)

  res.redirect('/')
})

// SERVER LISTENING
app.listen(PORT, () => {
  console.log('The server is listening')
})
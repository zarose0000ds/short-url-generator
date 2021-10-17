const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  shorten: {
    type: String,
    required: true
  },
  original: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('shortURL', urlSchema)
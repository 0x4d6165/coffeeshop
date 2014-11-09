var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  url: { type: String, lowercase: true },
  title: String,
  body: String,
  time: { type: Date, default: Date.now() },
  author: String,
  img: String
});

module.exports = mongoose.model('Post', postSchema);

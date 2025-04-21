const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  description: String,
  size: String,
  soluong: Number,
  image: String
});

module.exports = mongoose.model('Product', productSchema);
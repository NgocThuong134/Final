const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "categories",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "brands",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  listed: {
    type: Boolean,
    default: false,
  },
});

const productDb = mongoose.model('products', productSchema);
module.exports = productDb
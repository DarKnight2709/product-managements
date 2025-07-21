const mongoose = require('mongoose');

const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    
  title: String, // Sản phẩm 1
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {type: Boolean, default: false},
  deletedAt: Date,
  slug: {
    type: String, 
    slug: "title", 
    unique: true
  } // san-pham-1 (unique)
  
}, {
  timestamps: true
});


const Product = mongoose.model('Product', productSchema, "products");


module.exports = Product;

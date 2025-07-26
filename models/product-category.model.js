const mongoose = require('mongoose');

const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
  {
    
  title: String, // Sản phẩm 1
  parent_id: {
    type: String, default: ""
  },
  description: String,
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


const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "product-category");


module.exports = ProductCategory;

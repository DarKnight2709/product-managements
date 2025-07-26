const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller")

const multer = require('multer');
// const storageMulter = require("../../helpers/storageMulter");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const validate = require("../../validates/admin/product-category.validate.js");




router.get('/', controller.index)

router.get('/create', controller.createForm);

router.post('/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createCategory,
  controller.createCategory);

router.patch('/change-multi', controller.changeMulti);

module.exports = router;
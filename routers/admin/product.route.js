const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer = require('multer');
// const storageMulter = require("../../helpers/storageMulter");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const validate = require("../../validates/admin/product.validate");



router.get('/', controller.index)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.createForm);

router.post('/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createProduct);

router.get("/edit/:id", controller.editForm);

router.patch("/edit/:id",
  upload.single("thumbnail"), // lấy ảnh từ form
  uploadCloud.upload,
  validate.createPost,
  controller.editProduct);

router.get("/detail/:id", controller.detail);


module.exports = router;
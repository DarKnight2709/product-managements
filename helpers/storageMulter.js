// module.exports = (multer) => {
//   const storage = multer.diskStorage({
//     // nơi lưu ảnh
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads/')
//     },
//     // tên ảnh
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, `${uniqueSuffix}-${file.originalname}`)
//     }
//   });

//   return storage;
// }
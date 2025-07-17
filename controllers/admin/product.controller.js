const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");

// [GET] /admin/products/
exports.index =  async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  
  let find = {
    deleted: false,
  };
  if(req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";
  console.log(keyword);
  if(req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i');
    find.title = regex;
  }
  console.log(find);

  const products = await Product.find(find);
  // console.log(products);
  res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });

  
}
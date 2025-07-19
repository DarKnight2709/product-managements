const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHeper = require("../../helpers/pagination");

// [GET] /admin/products/
exports.index =  async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  
  let find = {
    deleted: false,
  };
  if(req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);

  if(objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Phân trang 
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHeper(
    {
      currentPage: 1,
      limitItem: 4,
    }, 
    req.query,
    countProducts
  );
  
  // Kết thúc phân trang

  
  const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
  // console.log(products);
  res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

// [PATCH] /admin/products/change-status/:status/:id
exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({_id: id}, {status: status});

  res.redirect("back");
  // quay lại trang vừa mới thoát

}



exports.changeMulti = async (req, res) => {
  console.log(req.body);

  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({_id: {$in: ids}}, {status: "active"});
      break;
    case "inactive":
      await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
      break;
    default:
      break;
  }

  res.redirect("back");

} 
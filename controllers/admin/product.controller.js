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

  
  const products = await Product
    .find(find)
    .sort({position: "desc"})
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);
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
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");

  res.redirect("back");
  // quay lại trang vừa mới thoát

}



//[PATCH]
exports.changeMulti = async (req, res) => {
  console.log(req.body);

  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({_id: {$in: ids}}, {status: "active"});

      req.flash("success", `Cập nhật thành công trạng thái của ${ids.length} sản phẩm đã chọn!`);
      break;
    case "inactive":
      await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
      req.flash("success", `Cập nhật thành công trạng thái của ${ids.length} sản phẩm đã chọn!`);
      break;
    case "delete-all":
      await Product.updateMany(
        {_id: {$in: ids}}, 
        {
          deleted: true, 
          deleteAt: new Date()
        },
        
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne(
          {_id: id}, 
          {
            position: position, 
          },
        );

      }
      
      break;
    default:
      break;
  }



  res.redirect("back");

} 

//[DELETE] item
exports.deleteItem = async (req, res) => {

  const id = req.params.id;
  console.log(id);

  // await Product.deleteOne({_id: id});
  await Product.updateOne({_id: id}, {
    deleted: true, 
    deletedAt: new Date()
  });


  res.redirect("back");

} 

const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHeper = require("../../helpers/pagination");

const systemConfig = require("../../config/system");

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

  let products = await Product
    .find(find)
    .sort({position: "desc"})
    
  products = products.slice(objectPagination.skip, objectPagination.skip + objectPagination.limitItem);
  // console.log(products);
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
      req.flash("success", `Đã xoá thành công ${ids.length} sản phẩm đã chọn!`);
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
      req.flash("success", `Đã thay đổi vị trí thành công của ${ids.length} sản phẩm đã chọn!`);
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

  req.flash("success", `Đã xoá thành công sản phẩm`);
  res.redirect("back");

} 


//[GET] get create form product page
exports.createForm =  (req, res) => {

   res.render("admin/pages/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm"
    });

} 

// [POST] create a product
exports.createProduct =  async (req, res) => {


  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);


  if(req.body.position === "") {
    const productCount = await Product.countDocuments();
    req.body.position = productCount + 1
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
    console.log(req.body);

  }
  

  const product = new Product(req.body);
  product.save();
  // console.log(req.file);
  
  
  
  res.redirect(`${systemConfig.prefixAdmin}/products`);

} 

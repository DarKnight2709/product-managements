const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const searchHelper = require("../../helpers/search");
const filterStatusHelper = require("../../helpers/filterStatus");

const paginationHelper = require("../../helpers/pagination");

const buildTreeHelper = require("../../helpers/buildTree");

// [GET] categories
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
  const countProductCategories = await ProductCategory.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    }, 
    req.query,
    countProductCategories
  );
  
  // Kết thúc phân trang

  // Sort
  let sort = {}

  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // // End sort


  let records = await ProductCategory
    .find(find)
    .sort(sort)
    
  // records = records.slice(objectPagination.skip, objectPagination.skip + objectPagination.limitItem);
  // console.log(products);
  // console.log(products);

  const newRecords = buildTreeHelper(records);


  res.render("admin/pages/product-category/index.pug", {
        pageTitle: "Trang danh mục sản phẩm",
        records: newRecords,
        keyword: objectSearch.keyword,
        filterStatus: filterStatus,
        pagination: objectPagination
    });
}



// lấy form create category
exports.createForm = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);


  const newRecords = buildTree(records);


  res.render("admin/pages/product-category/create.pug", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecords,
    });
  
}


// tạo category
exports.createCategory = async (req, res) => {

  if(req.body.position === "") {
    const productCount = await ProductCategory.countDocuments();
    req.body.position = productCount + 1
  } else {
    req.body.position = parseInt(req.body.position);
  }


  const record = new ProductCategory(req.body);
  await record.save();
  
  
  res.redirect(`${systemConfig.prefixAdmin}/product-category`);
  
}


// [PATCH] thay đổi nhiều danh mục cùng lúc theo nhiều tiêu chí
exports.changeMulti = async (req, res) => {
  console.log(req.body);

  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await ProductCategory.updateMany({_id: {$in: ids}}, {status: "active"});

      req.flash("success", `Cập nhật thành công trạng thái của ${ids.length} danh muc đã chọn!`);
      break;
    case "inactive":
      await ProductCategory.updateMany({_id: {$in: ids}}, {status: "inactive"});
      req.flash("success", `Cập nhật thành công trạng thái của ${ids.length} danh mục đã chọn!`);
      break;
    case "delete-all":
      await ProductCategory.updateMany(
        {_id: {$in: ids}}, 
        {
          deleted: true, 
          deleteAt: new Date()
        },
        
      );
      req.flash("success", `Đã xoá thành công ${ids.length} danh mục đã chọn!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await ProductCategory.updateOne(
          {_id: id}, 
          {
            position: position, 
          },
        );

      }
      req.flash("success", `Đã thay đổi vị trí thành công của ${ids.length} danh mục đã chọn!`);
      break;
    default:
      break;
  }



  res.redirect("back");

} 
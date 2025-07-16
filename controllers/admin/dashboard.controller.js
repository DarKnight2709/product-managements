// [GET] /admin/dashboard/
exports.dashboard =  (req, res) => {
  res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quang"
    });
  
}
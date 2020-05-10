var Categories = require("../controllers/categoriesController");

module.exports = function (router) {
  router.post("/create", Categories.createCategory);
  router.get("/get", Categories.getCategories);
  router.get("/get/:email", Categories.getCategory);
  router.get("/getById/:id", Categories.getCategoryById);
  router.put("/update/:id", Categories.updateCategory);
  router.delete("/remove/:id", Categories.removeCategory);
};

// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const restaurant = require("../../models/restaurant");

//新增餐廳
router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res) => {
  return restaurant
    .create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//瀏覽特定餐廳
router.get("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  restaurant
    .findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render("show", { restaurantData }))
    .catch((err) => console.log(err));
});

//讀取編輯餐廳頁面
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  restaurant
    .findById(id)
    .lean()
    .then((restaurantData) => res.render("edit", { restaurantData }))
    .catch((err) => console.log(err));
});

// 修改餐廳資料資料
router.put("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  restaurant
    .findById(id)
    .then((restaurantData) => {
      restaurantData.name = req.body.name;
      restaurantData.name_en = req.body.name_en;
      restaurantData.category = req.body.category;
      restaurantData.image = req.body.image;
      restaurantData.location = req.body.location;
      restaurantData.phone = req.body.phone;
      restaurantData.google_map = req.body.google_map;
      restaurantData.rating = req.body.rating;
      restaurantData.description = req.body.description;
      return restaurantData.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

//刪除餐廳
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return restaurant
    .findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;

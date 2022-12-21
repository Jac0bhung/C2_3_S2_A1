// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const restaurant = require("../../models/restaurant");

//引用Restaurant
router.get("/", (req, res) => {
  restaurant
    .find({})
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((err) => console.log(err));
});

//搜尋餐廳 
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/");
  }

  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  restaurant
    .find({})
    .lean()
    .then((restaurantsData) => {
      const filterRestaurantsData = restaurantsData.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      );
      res.render("index", { restaurantsData: filterRestaurantsData, keywords });
    })
    .catch((err) => console.log(err));
});

module.exports = router;

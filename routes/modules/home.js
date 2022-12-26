// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const restaurant = require("../../models/restaurant");

//引用Restaurant
router.get("/", (req, res) => {
  restaurant
    .find({})
    .lean()
    .sort({ _id: "desc" })
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    // .catch((err) => console.log(err));
    //助教A11建議
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
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
    // .catch((err) => console.log(err));
    //助教A11建議
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

// 參考
router.get("/sort", (req, res) => {
  const sortMethod = req.query.sortMethod;
  let sortBy;
  if (sortMethod === "A -> Z") {
    sortBy = { name_en: "asc" };
  }
  if (sortMethod === "Z -> A") {
    sortBy = { name_en: "desc" };
  }
  if (sortMethod === "推薦指數:高至低") {
    sortBy = { rating: "desc" };
  }
  if (sortMethod === "推薦指數:低至高") {
    sortBy = { rating: "asc" };
  }
  restaurant
    .find({})
    .lean()
    .sort(sortBy)
    .then((restaurantsData) =>
      res.render("index", { restaurantsData, sortMethod })
    )
    .catch((error) => {
      console.log(error);
      res.render("error", { error_message: error.message });
    });
});

module.exports = router;

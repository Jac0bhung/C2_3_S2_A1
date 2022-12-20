const express = require("express");
const app = express();
const port = 3000;

//require express-handlebars
const exphbs = require("express-handlebars");
// const restaurantsData = require("./restaurants.json").results; //舊的用json

//作業A7串DB
const Restaurant = require("./models/restaurant"); //載入Restaurant Model

//連結到資料庫
const mongoose = require("mongoose"); // 載入 mongoose

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // 設定連線到 mongoDB

const db = mongoose.connection;
//連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

//連線正常
db.once("open", () => {
  console.log("mongodb connected!");
});

//設定模板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

//舊版撈JSON
// app.get("/", (req, res) => {
//   res.render("index", { restaurants: restaurantsData });
// });

//新A7新版Render
app.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((err) => console.log(err));
});

//新增餐廳
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

//瀏覽特定餐廳
app.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantID } = req.params;
  Restaurant.findByID(restaurantID)
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((err) => console.log(err));
});
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//搜尋餐廳
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/");
  }

  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  Restaurant.find({})
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

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`);
});

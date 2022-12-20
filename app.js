const express = require("express");
const app = express();
const port = 3000;

//require express-handlebars
const exphbs = require("express-handlebars");
const restaurantsData = require("./restaurants.json").results;

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

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantsData });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const cssName = "show";
  const restaurantShow = restaurantsData.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurantShow, name: cssName });
});

// app.get("/search", (req, res) => {
//   console.log("req.query", req.query);
//   const keywords = req.query.keywords.trim().toLowerCase();
//   const restaurantKeyword = restaurantsData.filter((restaurant) => {
//     restaurant.name.toLowerCase().includes(keywords);
//   });
//   res.render("index", { restaurantsData: restaurantKeyword });
// });

app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/");
  }

  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  const filterRestaurantsData = restaurantsData.filter(
    (data) =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  );

  res.render("index", { restaurants: filterRestaurantsData, keywords });
});

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`);
});

const express = require("express");
const app = express();
const port = 3000;

//require express-handlebars
const exphbs = require("express-handlebars");
// const restaurantsData = require("./restaurants.json").results; //舊的用json

//A8 RestFul API
const methodOverride = require("method-override");

//A8 引用路由器
const routes = require("./routes");
app.use(routes);

//作業A7串DB
const Restaurant = require("./models/restaurant"); //載入Restaurant Model

//連結到資料庫
const mongoose = require("mongoose"); // 載入 mongoose
const restaurant = require("./models/restaurant");

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
app.use(methodOverride("_method"));

// 新A7新版Render ，A8重整路由器拿掉
// app.get("/", (req, res) => {
//   Restaurant.find({})
//     .lean()
//     .then((restaurantsData) => res.render("index", { restaurantsData }))
//     .catch((err) => console.log(err));
// });

// //新增餐廳
// app.get("/restaurants/new", (req, res) => {
//   return res.render("new");
// });

// app.post("/restaurants", (req, res) => {
//   restaurant
//     .create(req.body)
//     .then(() => res.redirect("/"))
//     .catch((err) => console.log(err));
// });

// //瀏覽特定餐廳
// app.get("/restaurants/:restaurantId", (req, res) => {
//   const { restaurantId } = req.params;
//   Restaurant.findById(restaurantId)
//     .lean()
//     .then((restaurantData) => res.render("show", { restaurantData }))
//     .catch((err) => console.log(err));
// });

// //讀取編輯餐廳頁面
// app.get("/restaurants/:id/edit", (req, res) => {
//   const id = req.params.id;
//   Restaurant.findById(id)
//     .lean()
//     .then((restaurantData) => res.render("edit", { restaurantData }))
//     .catch((err) => console.log(err));
// });

// // 修改餐廳資料資料;
// app.put("/restaurants/:restaurant_id", (req, res) => {
//   const id = req.params.restaurant_id;
//   Restaurant.findById(id)
//     .then((restaurantData) => {
//       restaurantData.name = req.body.name;
//       restaurantData.name_en = req.body.name_en;
//       restaurantData.category = req.body.category;
//       restaurantData.image = req.body.image;
//       restaurantData.location = req.body.location;
//       restaurantData.phone = req.body.phone;
//       restaurantData.google_map = req.body.google_map;
//       restaurantData.rating = req.body.rating;
//       restaurantData.description = req.body.description;
//       return restaurantData.save();
//     })
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch((err) => console.log(err));
// });

// //刪除餐廳
// app.delete("/restaurants/:id", (req, res) => {
//   const id = req.params.id;
//   return Restaurant.findById(id)
//     .then((restaurant) => restaurant.remove())
//     .then(() => res.redirect("/"))
//     .catch((error) => console.log(error));
// });

//搜尋餐廳A8重整路由器拿掉
// app.get("/search", (req, res) => {
//   if (!req.query.keywords) {
//     res.redirect("/");
//   }

//   const keywords = req.query.keywords;
//   const keyword = req.query.keywords.trim().toLowerCase();

//   Restaurant.find({})
//     .lean()
//     .then((restaurantsData) => {
//       const filterRestaurantsData = restaurantsData.filter(
//         (data) =>
//           data.name.toLowerCase().includes(keyword) ||
//           data.category.includes(keyword)
//       );
//       res.render("index", { restaurantsData: filterRestaurantsData, keywords });
//     })
//     .catch((err) => console.log(err));
// });

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`);
});

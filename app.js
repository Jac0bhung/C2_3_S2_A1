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

//作業A7串DB
const Restaurant = require("./models/restaurant"); //載入Restaurant Model

require("./config/mongoose");

// const restaurant = require("./models/restaurant");

//連結到資料庫  重構Mongooses拿掉
// const mongoose = require("mongoose"); // 載入 mongoose
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }); // 設定連線到 mongoDB

// const db = mongoose.connection;
// //連線異常
// db.on("error", () => {
//   console.log("mongodb error!");
// });

// //連線正常
// db.once("open", () => {
//   console.log("mongodb connected!");
// });

//設定模板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//之前無法解決的問題，是因為app.use(routes)在app.use(methodOverride)之前
app.use(routes);

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`);
});

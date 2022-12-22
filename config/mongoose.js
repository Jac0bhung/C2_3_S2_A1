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

module.exports = db;

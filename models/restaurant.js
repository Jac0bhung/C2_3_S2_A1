const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  name: { type: String, require: ture },
  name_en: { type: String, require: ture },
  category: { type: String, require: ture },
  image: { type: String, require: ture },
  location: { type: String, require: ture },
  phone: { type: String, require: ture },
  google_map: { type: String, require: ture },
  rating: { type: Number, require: ture },
  description: { type: String, require: ture },
});
module.exports = mongoose.model("Restaurant", restaurantSchema);

//REQUIRE MONGOOSE CONST
const mongoose = require("mongoose");

//SCHEMA HANDLER
const Schema = mongoose.Schema;
//RESTAURANT SCHEMA
const FoodSchema = new Schema ({
  nombreCasa: {
    type: String,
  },
  precio: {
    type: String,
  },
  status: {
    type: String,
  },
})

//RESTAURANT MODEL EXPORT
const Food = mongoose.model("Food", FoodSchema);

module.exports = {
  Food: Food
}

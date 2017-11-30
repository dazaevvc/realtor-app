const mongoose = require("mongoose");
const db = require("./models");

var theSaltLick = new db.Restaurant ({
  name: String,
  address: String,
  foodLeft: [],
  phoneNum: String,
  email: String
})

var leftovers = new db.Food ({
  name: String,
  weight: String,
})

theSaltLick.save();

theSaltLick.foodLeft.push(leftovers);

console.log(theSaltLick);

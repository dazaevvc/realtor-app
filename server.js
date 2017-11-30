//REQUIRE DEPENDENCIES
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");

//CONNECTION TO DB
require("dotenv").config();

mongoose.connection.openUri(process.env.MONGODB_URI || process.env.DB_CONN, function(err, conn){
  if (err) {
    console.log("ERROR MY DUDE", err);
  } else {
    console.log("CONNECTED TO MONGO DB");
  }
});

//APP SETUP
const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//APP ROUTES
const restRoutes = require("./routes/brokers");
const foodRoutes = require("./routes/foods");

const multerConf = {
  storage: multer.diskStorage({
    destination: function(req, file, next){
      next(null, './public/images');
    },
    filename: function(req, file, next){
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
  }),
  fileFilter: function (req, file, next){
    if(!file){
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if(image){
      console.log('uploaded!');
      next(null, true)
    } else {
      console.log('file not supported');
      return next();
    }
  }
};

app.get("https://realtor-dazaev-app.herokuapp.com/", function(req,res) {
	res.render('index', {});
});

app.get("/brokers", function(req,res) {
	res.render('brokers', {});
});

app.get("/crear-cuenta", function(req,res) {
	res.render('crear-cuenta', {});
});

app.get("/contact", function(req,res) {
	res.render('contact', {});
});

app.get("/ver-ofertas", function(req,res) {
  res.render('ver-ofertas', {});
});

app.get("/brokers/:restId/food", function(req,res) {
	res.render('food', {restId: req.params.restId});
});

app.post('/brokers',multer(multerConf).single('photo'),function(req,res){
   res.send('Complete!')
});

app.get("/api/restaurants", restRoutes.getRestaurantList);
app.get("/api/restaurants/:restId", restRoutes.getRestaurantListId);
app.post("/api/restaurants", restRoutes.createRestaurantList);
app.put("/api/restaurants/:restId", restRoutes.updateRestaurantList);
app.delete("/api/restaurants/:restId", restRoutes.removeRestaurantList);


app.get("/api/food", foodRoutes.getFoodList);
app.get("/api/restaurants/:restId/food/:foodId", foodRoutes.getFoodItem);
app.post("/api/restaurants/:restId/food", foodRoutes.createFoodItem);
app.put("/api/restaurants/:restId/food/:foodId", foodRoutes.updateFoodItem);
app.delete("/api/restaurants/food/:foodId", foodRoutes.removeFood);



//CONNECTION TO PORT
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

const db = require("../models/restaurant");

function getRestaurantList (req, res){
  db.Restaurant.find({}).
  populate('foodLeft').
  exec(function (err, restData){
    if (err) {
      console.log('Error retrieving restaurants from DB.', err);
      res.status(500).send('Internal server error');
    } else {
      console.log(restData);
      res.json(restData);
    }
  })
};

function getRestaurantListId (req, res){
  db.Restaurant.findOne({_id: req.params.restId}).
  populate('foodLeft').
  exec(function (err, restDataId){
    if (err) {
      console.log('Error retrieving restaurants from DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(restDataId);
    }
  });
};

function createRestaurantList (req, res){
  const newRestaurant = db.Restaurant({
    nombre: req.body.nombre,
    compañia: req.body.compañia,
    foodLeft: req.body.foodLeft,
    telefono: req.body.telefono,
    email: req.body.email
  });

  newRestaurant.save(function(err, data) {
    if (err) {
      console.log('Error saving restaurant to DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(data);
    }
  });

};

function updateRestaurantList (req, res){
  var restaurantId = req.params.restId;
  var updateRestaurantList = {
    nombre: req.body.nombre,
    compañia: req.body.compañia,
    foodLeft: req.body.foodLeft,
    telefono: req.body.telefono,
    email: req.body.email
  };

  db.Restaurant.findOneAndUpdate({_id: restaurantId}, updateRestaurantList, function(err, data){
    if (err) {
      console.log("Error updating restaurant", err);
    } else {
      res.status(201).json(data);
    }
  })
};

function removeRestaurantList (req, res){
  var restaurantId = req.params.restId;
  db.Restaurant.findOneAndRemove({_id: restaurantId}, function(err, deleteRestaurant){
    res.send("This is the delete homepage");
  });
};

module.exports = {
  getRestaurantList: getRestaurantList,
  getRestaurantListId: getRestaurantListId,
  createRestaurantList: createRestaurantList,
  updateRestaurantList: updateRestaurantList,
  removeRestaurantList: removeRestaurantList
}

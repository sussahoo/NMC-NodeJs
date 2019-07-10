const express = require("express");
const router = express.Router();
const Dish = require("../models/dishSchema");

router.get("/dishes",function(req,res,next){

  Dish.aggregate().near({
  near:
  {
   'type': 'Point',
    'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
  },
    maxDistance: 100000,
    spherical: true,
    distanceField: "dis"
  }).then(function(dishes){
      res.send(dishes);
    }).catch(next);

});

router.post("/dishes",function(req,res,next){
  Dish.create(req.body).then(function(dish){
    res.send(dish);
  }).catch(next);
});

router.put("/dishes/:id",function(req,res,next){
  Dish.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Dish.findOne({_id:req.params.id}).then(function(dish){
      res.send(dish);
    })
  }).catch(next)
});

router.delete("/dishes/:id",function(req,res,next){
  Dish.findByIdAndRemove({_id:req.params.id}).then(function(dish){
    res.send(dish);
  }).catch(next);
});

module.exports=router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// {
//   "type": "Feature",
//   "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   },
//   "properties": {
//     "name": "Dinagat Islands"
//   }
// }
const GeoScehma = new Schema({
  type:{
    type:String,
    default:"Point"
  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }
});

const DishSchema = new Schema({
  name : {
    type : String,
    required : [true,'Dish name is required']
  },
  willBeAvailableBy:{
    type : Date,
    required : [true,'willBeAvailableBy is required']
  },
  orderBefore : {
    type: Date,
    required : [true,'orderBefore is required']
  },
  quantity : {
    type: Number,
    required : [true,'quantity is required']
  },
  availableQuantity : {
    type: Number,
    required : [true,'availableQuantity is required']
  },
  active : {
    type: Boolean,
    required : [true,'active or not status is required'],
    default : true
  },
  price : {
    type: Number,
    required : [true,'price is required']
  },
  geometry:GeoScehma
});

const Dish = mongoose.model("dish",DishSchema);

module.exports = Dish;

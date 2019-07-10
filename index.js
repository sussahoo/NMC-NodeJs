const express = require("express");
//const routes = require("./route/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/nomorecook");
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/apis',require("./route/apis"));

//generic error handle
app.use(function(err,req,res,next){
  res.status(422).send({"customErrorMsg": err.message});
})

app.listen(process.env.port || 4000,function(){
  console.log("listening..")
});

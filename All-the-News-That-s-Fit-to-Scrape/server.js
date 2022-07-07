var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var PORT = process.env.PORT || 3000;

var app = express();
var routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
mongoose.connect("mongodb://localhost/mongoHeadlines");

app.use(routes);
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.listen(PORT, function() {
    console.log("App running on port: " + PORT + "!");
  });
  
 
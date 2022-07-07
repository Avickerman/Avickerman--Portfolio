// Dependecies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 3001;
mongoose.Promise = Promise;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static(__dirname + "/client/public"));
}

var articlesController = require("./server/controllers/articleController.js");
var router = new express.Router();

router.get("/api/saved", articlesController.find);

router.post("/api/saved", articlesController.insert);

router.delete("/api/saved/:id", articlesController.delete);

router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);

// Connect mongoose to our database
const db = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(db, function(error) {

  if (error) {
    console.error(error);
  }

  else {
    console.log("mongoose connection is successful");
  }
});


app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
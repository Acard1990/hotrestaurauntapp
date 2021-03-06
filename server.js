// Dependencies
//=======================================================================================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express set up
//=======================================================================================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Setting up body parse so express app can parse data
//=======================================================================================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Array to hold the booked tables
//=======================================================================================================================
var reservations = [
];
// Routes
//=======================================================================================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/home", function(req, res) {
  res.redirect('/');
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});


// View specific tables or view all tables
//=======================================================================================================================
app.get("/api/tables", function(req, res) {
  res.json(reservations.slice(0,5));
});
app.get("/api/waitlist", function(req, res) {
  res.json(reservations.slice(5));
});

// Create new tables
//=======================================================================================================================
app.post("/api/tables", function(req, res) {
  var newTable = req.body;
  reservations.push(newTable);
  res.json(newTable);
});


// Starts the server
//=======================================================================================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

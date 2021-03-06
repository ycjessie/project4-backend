require("dotenv").config();
//___________________
//Dependencies
//___________________
const express = require("express");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
const db = mongoose.connection;
app.use(cors())
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/" + "project4";
// Connect to Mongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));
// open the connection to mongo
db.on("open", () => {});
//___________________
//configuration for the layout
//___________________
app.set("view engine", "ejs");
//___________________
//Middleware
//___________________
app.use(expressLayouts);
//use public folder for static assets
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form
//___________________
// Routes
// const categoriesController = require('./controllers/categoriesController.js')
// app.use('/', categoriesController)
app.use("/", require("./controllers/categoriesController.js"));
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello Project 4 !');

// });
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));

module.exports = app
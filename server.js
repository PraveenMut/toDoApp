// require initial dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const tasks = require('./routes/routes')

// Port Field
const PORT = 3000;

// use middleware dependencies
app.use(express.json());

// use encoded form depdency
app.use(express.urlencoded({extended: false}));

// defining the db environment
const mongoDevURI = "mongodb://localhost/todolistdb";

// connecting to the DB
mongoose.connect(mongoDevURI, { useNewUrlParser: true }).then(() => {
  console.log("Success! Connected to the database!");
}).catch((err) => {
  console.log("Error! Not connected to the Database! The error is:", err);
});

// get all non-root routes
app.use('/', tasks);

// default route
app.get('/', (req,res) => {
  res.send("Response success. Application correctly started")
});

// instantiate server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const cookieParser = require('cookie-parser');
require("dotenv").config();


var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//db
const db = require("../models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// simple route
app.use(cookieParser());
app.use(routes)


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
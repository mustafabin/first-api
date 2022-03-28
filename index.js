//load our env vars
require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
//if the connection fails log the error
db.on("error", (error) => {
  console.error(error);
});

//once the db has connected successfully log connected!
db.once("open", () => {
  console.log("connected to MONGODB");
});

//allow json input
app.use(express.json());

const countryRouter = require("./routes/countryRoute");
app.use("/countries", countryRouter);

//start the server
app.listen(9000, () => {
  console.log("Server Started");
});

require("dotenv").config();
let mongoose = require("mongoose");
let mongooseConfig = { useNewUrlParser: true };
mongoose.connect("mongodb://127.0.0.1:27017/firstapi", mongooseConfig);

let data = require("./countries.json");
let Country = require("./models/country");
let countries = [];
for (let i = 0; i < data.length; i++) {
  countries.push({
    name: data[i].name.common,
    capital: data[i].capital ? data[i].capital[0] : null,
    region: data[i].capital,
    population: data[i].population,
  });
}
Country.deleteMany({})
  .then(() => Country.create(countries))
  .then(() => mongoose.disconnect())
  .then(() => console.log("Done"))
  .catch((error) => console.error(error));

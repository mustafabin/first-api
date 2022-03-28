const express = require("express");
const router = express.Router();
//import the country model
const Country = require("../models/country");

//the reason im using async functions is because the most functions (i.e .find) are async so i need to wait for it before i give it to the user
//get all countries
router.get("/", async (req, res) => {
  try {
    const allCountries = await Country.find({});
    res.json(allCountries);
  } catch (error) {
    //error code 500 means there is a mistake on the server side in this case with the .find all
    res.status(500).json({ message: error.message });
  }
});
//get one country by name
router.get("/:name", async (req, res) => {
  let name = req.params.name;
  let found = await Country.find({ name: name });
  //why does this only work but not found == [0]
  if (!found[0]) {
    res.status(404).json({ message: "not found" });
  } else {
    res.json(found);
  }
});

//find by id
router.get("/id/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let found = await Country.findById(id);
    res.json(found);
  } catch (err) {
    res.status(404).json({ message: "wrong id bozo" });
  }
});
//create one
router.post("/", async (req, res) => {
  try {
    let postCountry = await Country.create({
      name: req.body.name,
      captial: req.body.captial,
      region: req.body.region,
      population: req.body.population,
    });
    //201 means successful creation
    res.status(201).json(postCountry);
  } catch (err) {
    //400 means user input is invaild
    res.status(400).json({ message: err.message });
  }
});
//update one im using patch instead of put b/c i just want to change one aspect of the country not the whole country
//update by name
router.patch("/:name/:update", async (req, res) => {
  let name = req.params.name;
  let update = req.params.update;
  try {
    let updated = await Country.updateMany(
      { name: name },
      { $set: { name: `${update}` } }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delelting one
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let found = await Country.findByIdAndDelete(id);
    res.json(found);
  } catch (err) {
    res.status(404).json({ message: "wrong id bozo" });
  }
});

module.exports = router;

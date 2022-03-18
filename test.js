var petfinder = require("@petfinder/petfinder-js");
const dotenv = require("dotenv");
dotenv.config();
var client = new petfinder.Client({
  apiKey: process.env.API_KEY,
  secret: process.env.API_SECRET,
});
let requirement = { type: "Dog", age: "young", gender: "Male", size: "Medium" };
// client.animal.search("white")
client.animal
  .search({ ...requirement })
  .then(function (response) {
    // Do something with `response.data.animals`
    let animals = response.data.animals;
    console.log(animals);
  })
  .catch(function (error) {
    // Handle the error
  });

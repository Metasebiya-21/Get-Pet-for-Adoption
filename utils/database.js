/**impoting node modules */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
/**importing the models */
const {user, pet} = require("../models");
console.log("users Model", process.env.API_URL);
mongoose
  .connect(process.env.API_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("connection to MogoDB successfully!");
  })
  .catch((error) => {
    console.log("connection error: ", error);
  });

/** saving the model */
async function saveModels() {}

/**impoting node modules */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
/**importing the models */
<<<<<<< HEAD

const {user, pet} = require("../models");
let dbURI;
if (process.env.NODE_ENV === "development") {
  dbURI = process.env.DATABASE_DEV_URL;
}
if (process.env.NODE_ENV === "test") {
  dbURI = process.env.DATABASE_TEST_URL;
}
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.DATABASE_PROD_DB;
}
mongoose
  .connect(dbURI, {
=======
const {user, pet} = require("../models");
console.log("users Model", process.env.API_URL);
mongoose
  .connect(process.env.API_URL, {
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
<<<<<<< HEAD
    console.log("connected to MongoDB successfully!");
=======
    console.log("connection to MogoDB successfully!");
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
  })
  .catch((error) => {
    console.log("connection error: ", error);
  });

/** saving the model */
async function saveModels() {}

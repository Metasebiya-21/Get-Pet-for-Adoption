/**impoting node modules */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
/**importing the models */

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
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.log("connection error: ", error);
  });

/** saving the model */
async function saveModels() {}

let user = require("./user.schema")
let pet = require ("./pets.schema")
let adoptionRequest = require("./adoptionRequest.schema")
const schemas = {
  user,
  pet,
  adoptionRequest,
};
 module.exports = schemas
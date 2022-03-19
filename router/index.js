const authUser = require("./user.auth.route");
const authAdmin = require("./admin.auth.route")
const customer = require("./customer.route")
const pet = require("./pet.route")
const Routers = {
  authUser,
  authAdmin,
  customer, pet
};
module.exports = Routers;
const _index = require("./_index");
const authUser = require("./user.auth.route");
const authAdmin = require("./admin.auth.route");
const customer = require("./customer.route");
const pet = require("./pet.route");
const users = require("./users");

const router = {
  _index,
  users,
  authUser,
  authAdmin,
  customer,
  pet,
};
module.exports = { router };

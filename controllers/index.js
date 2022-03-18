const auth = require("./userAuthentication");
const customerCtrl = require("./customer.ctrl");
const petCtrl = require("./pet.ctrl");
const controllers = {
  auth,
  petCtrl,
  customerCtrl,
};
module.exports = controllers;

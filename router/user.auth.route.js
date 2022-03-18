const express = require("express");
const { auth } = require("../controllers");
const { authUser, validator } = require("../_middleware");
const route = express.Router();

/**
 * users route
 */
route.post("/pre-signup", validator.checkRecord, auth.preSignup);
route.post("/signup", auth.signup);
route.post("/signin", auth.signin);
route.put("/forgot-password", auth.forgotPassword);

module.exports = route;

const express = require("express");
const { authUser } = require("../_middleware");
const { auth } = require("../controllers") 
const route = express.Router();

/**
 * admin auhtentication route
 */
route.post("/user-signup", authUser.checkRecord, auth.Signup);
route.post("/user-signin", auth.Signin);
route.get("/signout", auth.signout);
route.get("/admin-forgotPassword", auth.forgotPassword);

module.exports = route;

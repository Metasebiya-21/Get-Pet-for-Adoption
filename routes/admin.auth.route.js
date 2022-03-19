const express = require("express");
const { authAdmin } = require("../_middleware");
const { adminAuth: adminAuthCtrl } = require("../admin-controllers");

const route = express.Router();

/**
 * admin auhtentication route
 */
route.post("/admin-signup", authAdmin.checkRecord,  adminAuthCtrl.adminSignup);
route.post("/admin-signin", adminAuthCtrl.adminSignin);
route.get("/signout", adminAuthCtrl.signout);
route.get("/admin-forgotPassword", adminAuthCtrl.adminforgotPassword);

module.exports = route;

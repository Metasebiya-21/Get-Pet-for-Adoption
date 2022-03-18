const authUser = require("./userAutherization");
const authAdmin = require("./authAdmin");
const validator = require("./validator");
const imageUpload  = require("./uploadFiles");
const _middleware = {
  authAdmin,
  authUser,
  validator,
  imageUpload,
};
module.exports = _middleware;

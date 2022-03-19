let { errorHandler, duplicateError, recordExists } = require("./errorHandler");
let { notifyUser, sendData } = require("./notificationHandler");
let { dbErrorHandler } = require("./dbErrorHandler");
let {resolveAfterXSeconds} = require("./medahinit.async")
const helperFunction = {
  errorHandler,
  notifyUser,
  sendData,
  dbErrorHandler,
  duplicateError,
  recordExists,
  resolveAfterXSeconds
};
module.exports = helperFunction;

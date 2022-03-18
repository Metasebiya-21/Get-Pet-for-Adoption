"use strict";

const capital = (e) => {
  return (e = e.charAt(0).toUpperCase() + e.slice(1));
};

const uniqueMessage = (error) => {
  try {
    let output = Object.keys(error.keyValue);
    output += " already exists";
    return output;
  } catch (error) {
    output = "Unique field already exists";
  }
};

exports.dbErrorHandler = (error) => {
  let message = "";
  // console.log("dbErrorHandler : ", error)
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = capital(uniqueMessage(error));
        break;
      default:
        message: `something went wrong ${error.name}`;
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }
  return message
};

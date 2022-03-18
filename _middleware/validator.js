const { errorHandler, recordExists } = require("../_helper");

const { user, adoptionRequest } = require("../models");
exports.checkRecord = async (req, res, next) => {
  try {
    // console.log("req: ", req.body);
    user
      .findOne({
        phoneNumber: req.body.phoneNumber,
      })
      .exec((err, user) => {
        console.log("user ", user);
        if (user === null) next();
        else {
          let result = {
            name: `${user.firstName} ${user.lastName}`,
            phoneNumber: user.phoneNumber,
          };
          recordExists({ msg: "user exists!", user: result }, res);
        }
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.checkPreviousRequest = async (req, res, next) => {
  try {
    let customer_id = req.profile.id;
    let pet_id = req.pet.id;
    adoptionRequest
      .find({ customer_id })
      .then((result) => {
        if (result !== null) {
          let found = false;
          result.forEach((pet, i) => {
            if (pet.pet_id === req.pet.id) {
              found = true;  
            }
          });
          if (!found) {
            next();
          }
          else{
            errorHandler("your request for adoption is still on going", res);
          }
        } else {
          next();
        }
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (error) {}
};

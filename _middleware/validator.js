const { errorHandler, recordExists, sendData } = require("../_helper");
const formidable = require("formidable");
const { user, adoptionRequest, pet } = require("../models");
const { populate } = require("../models/user.schema");
const { fields } = require("./uploadFiles");

exports.checkRecord = async (req, res, next) => {
  try {
    // console.log("req: ", req.body);
    user
      .findOne({
        $or: [{ phoneNumber: req.body.phoneNumber }, { email: req.body.email }],
      })
      .exec((err, user) => {
        if (user === null) next();
        else {
          let result = {
            name: `${user.firstName} ${user.lastName}`,
            phoneNumber: user.phoneNumber,
          };
          recordExists({ customer_id: user.id }, res);
        }
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.checkPetRecord = async (req, res, next) => {
  try {
    let pet_fields, pet_files;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      // req.fields = fields;
      // req.files = files;
      // let { tag } = fields;
      console.log("req.fields  ", req.fields);
      pet.findOne({ tag }).exec((err, pet) => {
        if (pet === null) {
          console.log("preceed to create customer");
          req.pet_reg_fields = fields;
          req.pet_photos = files;
          next();
        } else {
          console.log("pet_id: pet.id ", { pet_id: pet.id });
          recordExists({ pet_id: pet.id }, res);
        }
      });
    });
   
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.checkPreviousRequest = async (req, res, next) => {
  try {
    let customer_id = req.profile.id;
    let pet_id = req.pet.id;
    // sendData({pet: pet_id}, res)
    adoptionRequest
      .find({ customer_id })
      .populate("pet_id")
      .then((result) => {
        if (result !== null) {
          let found = false;
          result.forEach((adoption_request, i) => {
            let { pet_id: pet } = adoption_request;

            if (pet_id === pet.id) {
              found = true;
            }
          });

          if (!found) {
            next();
          } else {
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

const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { pet, adoptionRequest } = require("../models");
const { _, result } = require("lodash");
var petfinder = require("@petfinder/petfinder-js");
const fs = require("fs");
const {
  errorHandler,
  sendData,
  notifyUser,
  omitNullValues,
  omitNullValuesObj,
  dbErrorHandler,
} = require("../_helper");

exports.createPet = async (req, res) => {
  try {
    let {
      tag,
      type,
      breed,
      gender,
      age,
      size,
      color,
      good_with_Children,
      about,
    } = req.body;
    let photos = req.files;
    let profile = `${process.env.CLIENT_URL}/api/profile/${tag}`;
    let newPet = {
      tag,
      type,
      breed,
      gender,
      age,
      size,
      color,
      good_with_Children,
      photos,
      profile,
      about,
    };
    console.log("profile: ", profile);
    let new_pet = new pet(newPet);

    new_pet
      .save()
      .then((data) => {
        console.log("new ", data.id);
        sendData({ status: "success", pet_id: data._id }, res);
      })
      .catch((err) => {
        // error code: 11000 is a duplicate key error collection
        throw dbErrorHandler(err);
        // errorHandler(errMsg, res);
      });
  } catch (error) {
    console.log("creat pet err", err)
    errorHandler(error, res);
  }
};

exports.getPets = async (req, res) => {
  let { requirement, limit } = req.body;
   pet
    .find({ ...requirement, adopted: false, good_with_children: true })
    .then((pet_localdatabase) => {
      const API_KEY = "4Nadt1xYLpbz7zUA7EZw912fOFZ2XjfixflAV5ZSsVyTJJHgmA";
      const API_SECRET = "UdK8HkuwngzBXCjb3ZCKPONggJfgZ8o7DgtrNN0Q";

      var client = new petfinder.Client({
        apiKey: API_KEY,
        secret: API_SECRET,
      });
      client.animal
        .search({ ...requirement, good_with_children: true })
        .then(function (response) {
          let pet_remotedatabase = response.data.animals;
          // let temp = result_localdatabase.concat(response.data.animals);
          
          // console.log(pet_remotedatabase.length, pet_localdatabase.length);
          if (!(pet_localdatabase.length > limit)) {
            pet_remotedatabase.forEach((pet, i) => {
              
              if (pet_localdatabase.length < limit) {
                // console.log("hey");
                let { type, age, gender, size, good_with_children, photos } =
                  pet;
                  // console.log({
                  //   petfinder: {
                  //     source,
                  //     type,
                  //     age,
                  //     gender,
                  //     size,
                  //     good_with_children,
                  //     photos,
                  //   },
                  // });
                let source = "petfinder";
                pet_localdatabase.push({
                  petfinder: {
                    source,
                    type,
                    age,
                    gender,
                    size,
                    good_with_children,
                    photos,
                  },
                });
              }
            });
            // console.log("pet_localdatabase: ", pet_localdatabase);
            // sendData({ search: pet_remotedatabase }, res);
            sendData({ status: "success", pets: pet_localdatabase }, res);
          } else {
            let ceil = Math.ceil(limit / 2);
            let floor = Math.floor(limit / 2);
            let tempLocal = [];
            let tempReomte = [];
            pet_localdatabase.forEach((pet, i) => {
              if (tempLocal.length < ceil) {
                let source = "local";
                let {} = pet;
                tempLocal.push({ pet_id: pet.id, source });
              }
            });
            pet_remotedatabase.forEach((pet, i) => {
              if (tempReomte.length < floor) {
                let { type, age, gender, size, good_with_children, photos } =
                  pet;
                let source = "petfinder";
                tempReomte.push({
                  petfinder: {
                    source,
                    type,
                    age,
                    gender,
                    size,
                    good_with_children,
                    photos,
                  },
                });
              }
            });
            let conc_arr = tempLocal.concat(tempReomte);
            console.log("conc_arr: ", conc_arr.length);
            sendData({ status: "success", pets: conc_arr }, res);
          }
        })
        .catch(function (error) {
          // Handle the error
        });
    });
};

exports.adopt = async (req, res) => {
  try {
    let customer_id = req.profile.id;
    let pet_id = req.pet.id;

    let request = new adoptionRequest({ customer_id, pet_id });
    request
      .save()
      .then((data) => {
        console.log("new ", data.id);
        sendData(
          {
            status: "success",
            adoption_id: data._id,
          },
          res
        );
      })
      .catch((err) => {
        // error code: 11000 is a duplicate key error collection
        throw dbErrorHandler(err);
      });
  } catch (error) {
    errorHandler(err, res);
  }
};

exports.getProfile = async (req, res) => {
  try {
    let { tag } = req.params;
    await pet
      .findOne({ tag })
      .then((pet) => {
        if (pet !== null){
          let photosURL = [];
          pet.photos.forEach((photo) => {
            photo.url = `${process.env.CLIENT_URL}/api/image/${photo.filename}`;
            photosURL.push(
              `${process.env.CLIENT_URL}/api/image/${photo.filename}`
            );
          });
          // console.log("photos path: ", photos);
          pet.photosURL = photosURL
          sendData({ pet: pet }, res);
        } else{ errorHandler("pet not found!", res)}
      })
      .catch((err) => {
        console.log(err);
        throw dbErrorHandler(err)
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

const mongoose = require('mongoose')
const crypto = require('crypto');
const { notifyUser } = require('../_helper');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    BoD: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    about: {
      type: String,
    },
    role: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordToken: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);
userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
      
        this.age = this.calculateAge(this.BoD)
        this.hashed_password = this.encryptedPassword(password)
    })
    .get(function () {
        return this._password;
    })
userSchema.methods = {
    calculateAge: function (BoD){
        BoD = new Date(BoD)
        if (BoD !== "Invalid Date"){
          let date = new Date();
          return date.getFullYear() - BoD.getFullYear();
        }
        else{
            
        }
    },
    authentication: function (plainPassword) {
        return this.encryptedPassword(plainPassword) === this.hashed_password;
    },
    encryptedPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } 
        catch (err) {
            console.log('problem with hashing the password')
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

module.exports = mongoose.model('user', userSchema);

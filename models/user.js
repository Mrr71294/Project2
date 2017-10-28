const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName  : String,
  lastName   : String,
  username   : String,
  email      : String,
  password   : String,
  aboutMe    : String,
  imgUrl     : { type: String, default: "/images/person-placeholder.jpg" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

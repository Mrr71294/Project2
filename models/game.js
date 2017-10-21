const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  name        : String,
  developer   : String,
  description : String,
  rating      : String,
  imgUrl      : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
});

















const Game = mongoose.model('Game', userSchema);
module.exports = Game;

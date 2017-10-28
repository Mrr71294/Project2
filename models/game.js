const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  name        : String,
  platforms   : String,
  summary     : String,
  rating      : String,
  category    : String,
  cover       : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;

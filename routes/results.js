var express       = require('express');
var router        = express.Router();
const igdb        = require('igdb-api-node').default;
global.mashapeKey = 'c9258795fba813411d8fa399c4222a2e';
const client      = igdb(global.mashapeKey);
const Game        = require("../models/game");



router.get('/', (req, res, next) => {
      res.render('results');
});

router.post('/', (req, res, next) => {
  client.games({
      fields: '*', // Return all fields
      limit: 10, // Limit to 5 results
      offset: 15, // Index offset for results
      search: req.body.search
  }).then(response => {
    response.body.forEach(function(currentGame){
    });

    var total = response.body.length, result = [];


function saveAll(){
var doc = response.body.pop();

// console.log("Name!!!!!!!!!!!!!!!!!",doc.name);
// console.log("Platforms!!!!!!!!!!!!!!!!!",doc.platforms);
// console.log("Summary!!!!!!!!!!!!!!!!!",doc.summary);
// console.log("Rating!!!!!!!!!!!!!!!!!",doc.rating);
// console.log("Category!!!!!!!!!!!!!!!!!",doc.category);

let game = new Game({
  name: doc.name,
  platforms: doc.platforms,
  summary: doc.summary,
  rating: doc.rating,
  category: doc.category,
});

if(doc.cover)
{
  console.log("Cover!!!!!!!!!!!!!!!!!",doc.cover);
  game.cover = doc.cover.url;
  console.log(game);
}
else
{
  console.log("NO COVER!!!!");
}

game.save(function(err, saved){
  if (err) throw err;//handle error
  result.push(saved);

  if (--total) saveAll();
  else // all saved here
  res.render('results', {'games':result});
});
}
saveAll();
});
});



module.exports = router;

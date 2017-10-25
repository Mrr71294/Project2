var express = require('express');
var router = express.Router();
const igdb               = require('igdb-api-node').default;
global.mashapeKey = 'c9258795fba813411d8fa399c4222a2e';
const client = igdb(global.mashapeKey);



//Routes////////////////////////////////////////////////////////////////////////
router.get('/', (req, res, next) => {
  // client.games({
  //     fields: '*', // Return all fields
  //     limit: 5, // Limit to 5 results
  //     offset: 15, // Index offset for results
  //     search: 'mortal kombat'
  // }).then(response => {
      // console.log(response);
      res.render('index');

      // res.render('index', {'games':response.body});
  // }).catch(error => {
  //     throw error;
  // });
});



























module.exports = router;

var express = require('express');
var router = express.Router();
const passport        = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');



//Routes////////////////////////////////////////////////////////////////////////
router.get('/profile', ensureLoggedIn(),(req, res, next) => {
  res.render('profile', {'req':req});
});














module.exports = router;

var express                               = require('express');
var router                                = express.Router();
const passport                            = require('passport');
const User                                = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');



//Routes////////////////////////////////////////////////////////////////////////
router.get('/profile', ensureLoggedIn(),(req, res, next) => {
  res.render('profile', {'req':req});
});

router.post('/profile/edit', ensureLoggedIn('/login'), (req, res, next) => {
  console.log('req.body ', req.body);
 const updates = {
   firstName: req.body.firstName,
   lastName: req.body.lastName,
 };

 User.findByIdAndUpdate(req.user.id, updates, (err, user) => {
 if (err) {
     return res.render('profile', { user } );
  }
  if (!user) {
     return next(new Error('404'));
  }
   return res.redirect(`/profile/`);
 });

});


// router.post('/profile/edit', ensureLoggedIn('/login'),upload.single('photo'), (req, res, next) => {
//
//  const updates = {
//    firstname: req.body.firstName,
//    lastname: req.body.lastName,
//    pic_path: req.file.filename
//
//  };
//
//  User.findByIdAndUpdate(req.user.id, updates, (err, user) => {
//
//  if (err) {
//      return res.render('profile', { user }
//    );
//    }
//    if (!user) {
//      return next(new Error('404'));
//    }
//    return res.redirect(`/profile/`);
//  });
// });






module.exports = router;

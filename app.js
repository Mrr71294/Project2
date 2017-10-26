const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const expressLayouts     = require('express-ejs-layouts');
const mongoose           = require('mongoose');
const index              = require('./routes/index');
const users              = require('./routes/users');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const authRoutes         = require('./routes/authentication.js');
const LocalStrategy      = require('passport-local').Strategy;
const User               = require('./models/user');
const bcrypt             = require('bcrypt');
const passport           = require('passport');
const profile            = require('./routes/profile');
const igdb               = require('igdb-api-node').default;

const app = express();


require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);











//gamebar
// for
//   client.games({
//       fields: '*', // Return all fields
//       limit: 5, // Limit to 5 results
//       offset: 15, // Index offset for results
//       search: 'mortal kombat'
//   }).then(response => {
//       console.log(response);
//       res.render('index');
//
//       res.render('index', {'games':response.body});
//   }).catch(error => {
//       throw error;
//   });
// });














// view engine setup///////////////////////////////////////////////////////////
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
///////////////////////////////////////////////////////////////////////////////


app.use(expressLayouts);

app.use(session({
  secret: 'ironfundingdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Signing Up
passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
        User.findOne({
            'username': username
        }, (err, user) => {
            if (err){
              return next(err); }

            if (user) {
                return next(null, false);
            } else {
                // Destructure the body
                const { firstName, lastName, username, email, password, aboutMe } = req.body;
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  firstName,
                  lastName,
                  username,
                  email,
                  aboutMe,
                  password: hashPass
                });

                newUser.save((err) => {
                    if (err){ next(err); }
                    return next(null, newUser);
                });
            }
        });
    });
}));

passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());



app.use( (req, res, next) => {
  if (typeof(req.user) !== "undefined"){
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// Routes//////////////////////////////////////////////////////////////////////
app.use('/', profile);
app.use('/', index);
app.use('/users', users);
app.use('/', authRoutes);

///////////////////////////////////////////////////////////////////////////////







// catch 404 and forward to error handler//////////////////////////////////////
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler///////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookConfig = require('./config/facebookAuth.config');
const googleAuthConfig = require("./config/googleAuth.config");

// Passport session setup. 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: facebookConfig.facebook_key,
  clientSecret: facebookConfig.facebook_secret,
  callbackURL: facebookConfig.callback_url,
  profileFields: ['id', 'displayName', 'email', 'picture.type(large)'],
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: googleAuthConfig.googleClientID,
  clientSecret: googleAuthConfig.googleClientSecret,
  callbackURL: googleAuthConfig.callbackURL,
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//public folder
app.use('/static', express.static(__dirname + '/uploads'));

app.use(passport.initialize());
app.use(passport.session());

// simple route
require('./routes/user.routes')(app);
require('./routes/reference_test.route')(app);
require('./routes/reference_doc.route')(app);
require('./routes/shared_post.route')(app);
require('./routes/admin.route')(app);
require('./routes/practice.route')(app);
require('./routes/test.route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//User model
const User = require("../models/userModel");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, console.log("Password incorrect"));
              }
            });
          } else {
            return done(
              null,
              false,
              console.log("That email is not registered")
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

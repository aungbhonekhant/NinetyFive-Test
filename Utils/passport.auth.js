const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.modal');

passport.use(
    new localStrategy({
        usernameField: "email",
        passwordField: "password",
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({email}).populate('department', '_id, name');
            //usernam|email does not exist
            if(!user){
                return done(null, false, {messages: "Username/Email not registered"})
            }

            //email exist and verified password
            const isMatch = await user.isValidPassword(password);
            if(!isMatch){
                return done(null, false, {messages: "Username or Password Incorrect"})
            }else{
               return done(null, user)
            }

        } catch (error) {
            return done(error);
        }
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
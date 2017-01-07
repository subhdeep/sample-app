var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.model');

module.exports = function(passport) {
    console.log("Hi2");
    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy(function(username, password, done) {
        process.nextTick(function() {
            User.findOne({'username' : username}, (err, user) => {
                if(err) {
                    return done(err);
                }
                if(user) {
                    return done(null, null);
                } else {
                    var user = new User();

                    user.username = username;
                    user.password = user.generateHash(password);

                    user.save((err) => {
                        if(err){
                            throw err;
                        }else {
                            return done(null, user)
                        }
                    })
                }
            })
        })
    }))

    passport.use('local-signin', new LocalStrategy(function(username, password, done) {
        process.nextTick(function() {
            User.findOne({'username' : username}, (err, user) => {
                if(err) {
                    return done(err);
                }
                if(user && user.validPassword(password)) {
                    return done(null, user);
                } else {
                    return done(null);
                }
            })
        })
    }))
}
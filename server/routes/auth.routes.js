var express = require("express");
var passport = require("passport");

var User = require('../models/user.model');
var config = require('../config/config');

var router = express.Router();

//Create Admin
router.post('/admin/', checkAdminExists, (req,res) => {
    var admin = new User();
    
    admin.username = 'admin';
    admin.password = admin.generateHash(config.admin_password);
    admin.admin = true;

    admin.save((err) => {
        if(!err) {
            res.send("Admin Created");
        }
    })
})

router.post('/signup', passport.authenticate('local-signup'), (req,res) => res.json(req.user));
router.post('/signin', passport.authenticate('local-signin'), (req,res) => res.json(req.user));

router.get('/signout', function(req, res){
  req.logout();
  res.sendStatus(200);
});

function checkAdminExists(req, res, next) {
    User.findOne({'username' : 'admin'}, (err,user) => {
        if(user){
            res.sendStatus(409);
        }else {
            next();
        }
    })
}

module.exports = router;
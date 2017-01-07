var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");
var session = require('express-session');

var config = require("./config/config");

// var Course  = require("./models/course.model");

var studentRouter = require("./routes/student.routes");
var authRouter = require("./routes/auth.routes");

var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.database);

app.use(morgan('dev')); // log every request to the console
app.use(session({ 
    secret: config.secret,
    resave: false,
    saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport);

app.use('/api/student', isLoggedIn, studentRouter); // /api/student requests
app.use('/api/user', authRouter); // /api/user creation

app.listen(port, function() {
    console.log("Server listening on", port);
})

function isLoggedIn(req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        next();
    } else {
        res.sendStatus(401);
    }
}

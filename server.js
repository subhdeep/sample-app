var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Course  = require("./models/course.model");

var studentRouter = require("./routes/student.routes");

var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/app');

app.use('/api/student', studentRouter);

app.listen(port, function() {
    console.log("Server listening on", port);
})

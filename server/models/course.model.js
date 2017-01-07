var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var courseSchema = new Schema ({
        cor_name : String,
        cor_code : String,
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;


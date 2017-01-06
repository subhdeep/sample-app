var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var studentSchema = new Schema ({
    stud_name : String,
    stud_code : String,
    cour_name : String,
    cour_code : String,
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
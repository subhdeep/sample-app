var express = require("express");
var Student = require("../models/student.model");

var router = express.Router();

// Create New Student
router.post('/', (req,res) => {
    var student = new Student(req.body);
    student.save((err) => {
        if(!err){
            res.json({success: "Student Created"});
        }
    })
});

// Query Student 
router.get('/', (req,res) => {
    Student.find(req.query, (err,students) => {
        res.json(students);
    });
})

// getStudentById
router.get('/:stud_code', (req,res) => {
    Student.findOne({'stud_code' : req.params.stud_code}, (err,student) => {
        res.json(student);
    })
})

// deleteStudentById
router.post('/delete/:stud_code', (req,res) => {
    Student.remove({'stud_code' : req.params.stud_code}, (err,success) => {
        if(!err){
            res.status(200).send(success);
        }
    })
})

// deleteStudents
router.post('/delete', (req,res) => {
    for(var i = 0; i < req.body.stud_codes.length; i++){
        Student.find({'stud_code' : req.body.stud_codes[i]}).remove((err,success) => {
            if(!err){
                console.log()
                res.send(success);
            }
        })
    }
})

module.exports = router;

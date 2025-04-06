
const express = require('express');
const routes = express.Router();
const Student = require('../models/studentModel');
const Registration = require('../models/registrationModel');
const studentController = require('../controller/studentController');
const {verifyAccessToken}= require('../helpers/jwtHelper');



routes.get('/students', studentController.getStudent);
routes.get('/students/:id', studentController.getStudentId);
routes.post('/students', studentController.AddStudents);
routes.patch('/updateStudent/:id', studentController.updateStudents);
routes.delete('/deleteStudent/:id', studentController.deleteStudent);



module.exports = routes;
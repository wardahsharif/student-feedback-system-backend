const Student = require("../models/studentModel");
const mongoose = require('mongoose');
const createError = require('http-errors');



module.exports = {

    getStudent:  async (req,res) => {
    const result = await Student.find({})
    res.send(result);
},

    getStudentId:  async (req,res, next) => {
    const id = req.params.id;
    try{
    const student = await Student.findById(id)
    if(!student){
        throw(createError(404,"student does not exist"))
    }
    res.send(student);
} catch(error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){
        next(createError(400,"invalid student id"));
        return;
    }
    next(error);
}
},
    AddStudents: async(req,res, next) => {
    try{
        const student = new Student(req.body)
        const results = await student.save();
        res.send(results);
    }catch(error){
        console.log(error.message);
        if(error.name === "ValidationError") {
            next(createError(422, error.message))
            return;
        }
        next(error);
    }
},

 updateStudents: async(req,res,next) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const options = {new:true}
        const result = await Student.findByIdAndUpdate(id, update, options)
        
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if(error.name === "ValidationError") {
            next(createError(422, error.message))
            return;
    }
    next(error)
}
 }, deleteStudent: async(req,res,next) => {

   try {
    const id = req.params.id;
    const result = await Student.findByIdAndDelete(id);
    res.send(result);
   } catch (error) {
        console.log(error.message);
        if(error.name === "ValidationError") {
            next(createError(422, error.message))
            return;
    }
    next(error)
}

}


}


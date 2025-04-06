const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    firstname: {
        type: String,
    
        required:[true, 'Firstname is required']
    },
    lastname: {
        type: String,
  
        required:[true, 'Lastname is required']
    },
    email: {
        type: String,
  
        required:[true, 'Username is required']
    },
    password: {
        type: String,
  
        required:[true, 'Password is required']
    }

});

const Registration = mongoose.model('registration', registrationSchema); //create a model that is going to represent our collection in the DB 
module.exports = Registration;  //here we are exporting this file so that we can use it in other files
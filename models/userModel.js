const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required:[true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'Password is required'],
    }

});

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }
    catch (error){
        next(error)
    }
});


userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('user', userSchema); //create a model that is going to represent our collection in the DB 
module.exports = User;  //here we are exporting this file so that we can use it in other files
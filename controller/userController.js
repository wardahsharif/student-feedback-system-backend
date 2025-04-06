const User = require("../models/userModel");
const mongoose = require('mongoose');
const createError = require('http-errors');
const authSchema = require('../auth/auth_schema');
const loginSchema = require('../auth/login_schema')
const jwtHelper = require('../helpers/jwtHelper');
const { signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwtHelper'); 



module.exports = {
    getUser: async (req,res, next) => {
    const id = req.params.id;
    try{
    const user = await User.findById(id)
    if(!user){
        throw(createError(404,"user does not exist"))
    }
     res.send(user);
   } catch(error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){
        next(createError(400,"invalid user id"));
        return;
    }
    next(error);
}
},

AddUser: async (req,res,next) => {
    try{
      const results = await authSchema.validateAsync(req.body);
      const {email} = req.body;
      const exists = await User.findOne({email: email});
      if(exists){
          throw createError.Conflict(`${email} is already registered`);
      }
        const user = new User(results);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)
        res.send({accessToken,refreshToken});
    }catch(error){
       if(error.isJoi === true)error.status = 422;
    
       next(error);
    }
},

updateUser: async(req,res,next) => {
    try {
        const update = req.body;
        const id = req.params.id;
        const options = {new:true}
        const result = await User.findByIdAndUpdate(id, update, options)
        if(!result){
        throw(createError(404,"user does not exist"))
    }
        res.send(result);
    } catch (error) {
        console.log(error.message)
          if(error instanceof mongoose.CastError){
        next(createError(400,"invalid user id"));
        return;
    }
     next(error);
    }
},

deleteUser: async(req,res,next) => {
   try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    res.send(result);
   } catch (error) {
    console.log(error.message)
   }
 next(error);
},
login : async(req,res,next) => {
    try {
        const result = await loginSchema.validateAsync(req.body);
        const user = await User.findOne({email: result.email});
        if(!user)throw createError.NotFound("user not registered");

        const isMatch = await user.isValidPassword(result.password);
         if(!isMatch)throw createError.Unauthorized("username or password not valid");

         const accessToken = await signAccessToken(user.id);
         const refreshToken = await signRefreshToken(user.id);
        
         res.send({accessToken,refreshToken});

    }  catch(error){
       if(error.isJoi === true)return next(createError.BadRequest('invalid username or password'));
       next(error);
    }
},


refreshToken: async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();

        const userId = await verifyRefreshToken(refreshToken);
        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);

        res.send({ accessToken: accessToken, refreshToken: refToken });

    } catch (error) {
        next(error);
    }
}

}


   
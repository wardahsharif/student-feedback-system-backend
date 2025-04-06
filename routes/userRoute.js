const express = require('express');
const routes = express.Router();
const User = require('../models/userModel');
const userController = require('../controller/userController');

routes.get('/getUsers/:id', userController.getUser);
routes.patch('/updateUsers/:id', userController.updateUser);
routes.delete('/deleteUsers/:id', userController.deleteUser);
routes.post('/register', userController.AddUser);
routes.post('/login', userController.login);
routes.post('/refreshtoken', userController.refreshToken);

module.exports = routes;

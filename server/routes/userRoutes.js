const { getAllUsers, registerController, loginController } = require("../controllers/userController");

const express = require("express");

const Router = express.Router();

// get all users || METHOD: GET
Router.get('/allUsers', getAllUsers);

// create users || METHOD: POST
Router.post('/register',registerController);

//login || METHOD: POST
Router.post('/login', loginController);

module.exports = Router;

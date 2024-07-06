const express = require('express');
const { login, signUp } = require('../controllers/Authentication/userAuthController');
const route = express.Router();

route.post('/login',login)
route.post('/signup',signUp)

module.exports = route;
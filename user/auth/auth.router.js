const routes = require('express').Router();
const AuthController = require('./auth.controller');

routes.post('/register', AuthController.registerUser);
routes.post('/login', AuthController.login);

module.exports = routes;
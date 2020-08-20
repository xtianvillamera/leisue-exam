const routes = require('express').Router();
const UsersRouter = require('./users/users.router');
const AuthRouter = require('./auth/auth.router');

routes.use('/auth', AuthRouter);
routes.use('/users', UsersRouter);

module.exports = routes;
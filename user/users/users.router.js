const routes = require('express').Router();
const verify = require('./users.auth');
const UsersController = require('./users.controller');

routes.get('/', UsersController.getAllUsers);
routes.get('/:user_id', UsersController.getUser);

routes.post('/', UsersController.addUser);

routes.delete('/:user_id', verify.auth, UsersController.deleteUser);

routes.patch('/:user_id', verify.auth, UsersController.updateUser);
routes.patch('/:user_id/suspend', verify.auth, UsersController.suspendUser);

module.exports = routes;
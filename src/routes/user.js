const Router = require('express').Router();
const { Admin, Member } = require('../common/util');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');


Router.get('/nodeJsProject/admin/getListUser',authController.authenticateRole([Admin]),userController.getListUser);
Router.get('/nodeJsProject/getDetailUser/:id',authController.authenticateRole([Admin,Member]),userController.getDetailUser)
Router.patch('/nodeJsProject/user/updateUser/:id',authController.authenticateRole([Member,Admin]),userController.updateUser);
Router.delete('/nodeJsProject/admin/deleteUser/:id',authController.authenticateRole([Admin]),userController.deleteUser);



module.exports = Router;
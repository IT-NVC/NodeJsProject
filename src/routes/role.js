const Router = require('express').Router();
const controller = require('../controllers');
const {Admin} = require('../common/util');

const authController = require('../controllers/auth');
const roleController = controller.Role;

Router.get('/nodeJsProject/all/role',authController.authenticateRole([Admin]),roleController.getAllRole)
Router.post('/nodeJsProject/add/role',authController.authenticateRole([Admin]),roleController.postRole)

module.exports = Router;
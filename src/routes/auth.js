const Router = require("express").Router();
const authController = require("../controllers/auth");
const {Admin} = require('../common/util');

Router.post('/nodeJsProject/login',authController.login);
Router.post('/nodeJsProject/refreshToken',authController.refreshToken);
Router.post('/nodeJsProject/register',authController.register)


module.exports = Router;

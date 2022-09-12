const Router = require("express").Router();
const authController = require("../controllers/auth");
const {Admin} = require('../common/util');
const categoryController = require('../controllers/category');

Router.post('/nodeJsProject/category/add',authController.authenticateRole([Admin]),categoryController.postCategory);
Router.get('/nodeJsProject/category/all',authController.authenticateRole([Admin]),categoryController.getListCategory);
Router.get('/nodeJsProject/category/detail/:id',authController.authenticateRole([Admin]),categoryController.getDetailCategory);
Router.patch('/nodeJsProject/category/update/:id',authController.authenticateRole([Admin]),categoryController.updateCategory);
Router.delete('/nodeJsProject/category/delete/:id',authController.authenticateRole([Admin]));




module.exports = Router;
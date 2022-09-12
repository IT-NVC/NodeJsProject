const Router = require("express").Router();
const productController = require("../controllers/product");
const authController = require("../controllers/auth");
const {Admin,Member} = require("../common/util");


Router.get('/nodeJsProject/product/getListProduct',productController.getListProduct);
Router.get('/nodeJsProject/product/getDetailProduct/:id',productController.getDetailProduct);
Router.post('/nodeJsProject/product/find',productController.findProduct);
Router.get('/nodeJsProject/product/Category/:id',productController.getProductInCategory);


//admin
Router.post('/nodeJsProject/product/admin/createProduct',authController.authenticateRole([Admin]),productController.createProduct);
Router.patch('/nodeJsProject/product/admin/updateProduct/:id',authController.authenticateRole([Admin]),productController.updateProduct);
Router.delete('/nodeJsProject/product/admin/deleteProduct/:id',authController.authenticateRole([Admin]),productController.deleteProduct);



module.exports = Router;
const Router = require("express").Router();
const orderController = require("../controllers/order");
const authController = require("../controllers/auth");
const {Admin,Member} = require("../common/util");



Router.get('/nodeJsProject/order/getListOrder',authController.authenticateRole([Admin]),orderController.getListOrder)
Router.get('/nodeJsProject/order/getDetailOrder/:id',authController.authenticateRole([Admin,Member]),orderController.getDetailOrder)
Router.get('/nodeJsProject/order/findOrderbyUser/:id',authController.authenticateRole([Member]),orderController.findOrderByUser)
Router.post('/nodeJsProject/order/:idProduct',authController.authenticateRole([Admin,Member]),orderController.createOrder)
Router.patch('/nodeJsProject/order/:id',authController.authenticateRole([Admin]),orderController.updateOrder)
Router.delete('/nodeJsProject/order/:id',authController.authenticateRole([Admin]),orderController.deleteOrder)




module.exports = Router;
const Router = require("express").Router();
const orderController = require("../controllers/order");
const authController = require("../controllers/auth");
const {Admin,Member} = require("../common/util");



Router.get('/nodeJsProject/order/getListOrder',orderController.getListOrder)
Router.get('/nodeJsProject/order/getDetailOrder/:id',orderController.getDetailOrder)
Router.get('/nodeJsProject/order/findOrderbyUser/:id',orderController.findOrderByUser)
Router.post('/nodeJsProject/order/:idProduct',authController.authenticateRole([Admin,Member]),orderController.createOrder)
Router.patch('/nodeJsProject/order/:id',orderController.updateOrder)
Router.delete('/nodeJsProject/order/:id',orderController.deleteOrder)




module.exports = Router;
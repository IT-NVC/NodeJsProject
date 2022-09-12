const Router = require('express').Router();
const roleRoutes = require('./role');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const categoryRoutes = require('./category');
const productRoutes = require('./product');
const orderRoutes = require('./order');

Router.use(categoryRoutes);
Router.use(authRoutes);
Router.use(roleRoutes);
Router.use(userRoutes);
Router.use(productRoutes);
Router.use(orderRoutes);

module.exports = Router;
const taskProduct1 = require('../models/productModel');
const factory = require('./handleFactory');


exports.createProduct = factory.createOne(taskProduct1);
exports.getProduct = factory.getOne(taskProduct1);
exports.getAllProducts = factory.getAll(taskProduct1);

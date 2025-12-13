const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.post('/', orderController.createOrder);
router.get('/my-orders',authController.protect, orderController.getMyOrders);

module.exports = router;
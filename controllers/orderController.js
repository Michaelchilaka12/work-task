const taskOrder = require('../models/orderModel');
const factory = require('./handleFactory');


exports.createOrder = factory.createOne(taskOrder);


// Get all orders for the logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await taskOrder.find({ buyerID: req.user.id })
      .populate('productID')

    if (!orders || orders.length === 0) {
      return res.json({ message: "No orders found" });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

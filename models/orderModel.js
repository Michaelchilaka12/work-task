const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taskProduct1',
        required: [true, 'Product ID is required'],
    },
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taskUser1',
        required: [true, 'Buyer ID is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

const taskOrder = mongoose.model('taskOrder', orderSchema);
module.exports = taskOrder;
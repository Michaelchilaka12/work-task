const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taskUser1',
        required: [true, 'Seller ID is required'],
    },
    timestamp: { type: Date, default: Date.now },
     

});
const taskProduct1 = mongoose.model('taskProduct1', productSchema);

module.exports = taskProduct1;
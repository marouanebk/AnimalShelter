
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    // {
    //   product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'product'
    //   },
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     default: 1
    //   }
    // }
  ],
  total: {
    type: Number,
    required: true,
    default: 0
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }, 
  phone_number: {
    type: String,
    required: true,
  },
  address : {
    type: String,
    required : true,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
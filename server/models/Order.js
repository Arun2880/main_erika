const mongoose = require ('mongoose');

const OrederSchema = new mongoose.Schema({
  UserId : String,
  cartId : String,
  cartItems : [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      salePrice: String,
      quantity: Number
    }
  ],
  addressInfo : {
    addressId : String,
    address : String,
    city: String,
    pincode: String,
    phone: String,
    notes: String 

  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus : String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
  discountt: Number,
  totalCartAmount: Number,
  refferal: String,
  status : Number


})


module.exports = mongoose.model('Order', OrederSchema);
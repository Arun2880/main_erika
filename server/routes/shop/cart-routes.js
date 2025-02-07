const express = require('express');

const {addToCart, fetchCartItem, deleteCartItem, updateCartItemQty } = require('../../controllers/shop/Cart-controller');

const router = express.Router();

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItem);
router.put('/update-cart', updateCartItemQty);
router.delete('/:userId/:productId', deleteCartItem);

module.exports = router;

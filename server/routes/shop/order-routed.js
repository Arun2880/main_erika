const express = require("express");


const {createOrder, CapturePayment, getAllOrdersByUser, getOrderDetails, deleteOrder, refundPayment}= require('../../controllers/shop/order-controller')
const { reasonController } = require("../../controllers/shop/reason-controller")

const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', CapturePayment);
router.get('/list/:UserId', getAllOrdersByUser);
router.get('/details/:_id', getOrderDetails);
router.delete('/delete/:_id', deleteOrder);
router.post('/delete/reason', reasonController);
router.post('/refund/:_id', refundPayment);




module.exports = router;


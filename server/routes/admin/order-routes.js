const express = require("express");


const {getAllOrdersOfAllUsers,getOrderDetailsForAdmin, updateOrderStatus}= require('../../controllers/admin/order-controller')

const router = express.Router();

router.get('/get', getAllOrdersOfAllUsers);
router.get('/details/:_id', getOrderDetailsForAdmin);

router.put('/update/:_id', updateOrderStatus);




module.exports = router;


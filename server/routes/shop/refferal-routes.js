const express= require('express');

const { verifyrefferal, verifyEmail, fetchRefferal } = require('../../controllers/shop/refferal-controller');


const router = express.Router();


router.post("/verify", verifyrefferal );
router.post("/verify/email", verifyEmail );
router.post("/fetch", fetchRefferal );

module.exports = router;
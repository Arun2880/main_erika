
const express = require ("express")

const {SendEmail}= require("../../controllers/email/Email-controller")

const router = express.Router();
router.post('/email', SendEmail)



module.exports = router;




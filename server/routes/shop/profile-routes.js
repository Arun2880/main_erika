const {getUserProfile, updateProfile}= require('../../controllers/shop/profile-controller');
const express= require('express');

const router= express.Router();
router.get("/:_id", getUserProfile );
router.put("/update/:_id", updateProfile );

module.exports= router;




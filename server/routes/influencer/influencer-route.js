
const express = require("express");
const {addInfluencer, getAllinfluencer, findIdInfluencer} = require('../../controllers/admin/influencer');
const { reasconController } = require("../../controllers/admin/reason-controller");
const router = express.Router();

router.post('/add', addInfluencer);
router.get('/get', getAllinfluencer);
router.get('/get/reason', reasconController);
router.get('/details/:_id', findIdInfluencer);

module.exports= router;
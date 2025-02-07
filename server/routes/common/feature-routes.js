const express = require ('express');

const {addFeatureImage, getFeatureImage,fetureImageDelete } = require('../../controllers/common/feature-controller');

const router = express.Router();

router.post ('/add', addFeatureImage);
router.get ('/get', getFeatureImage);
router.delete ('/delete/:_id', fetureImageDelete);



module.exports = router;
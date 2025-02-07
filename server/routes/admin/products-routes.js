const express = require('express');

const {handleImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct} = require('../../controllers/admin/products-controller');


const{upload} = require('../../helper/Cloudinary') 


const router = express.Router();

router.post('/upload-image', upload.array('images', 10), handleImageUpload);

router.post('/add',addProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/get',fetchAllProducts)


module.exports = router;
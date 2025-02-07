const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dk80e5gz7',
  api_key: '543832139294734',
  api_secret: 'tZubigNicEJLgIg2gA-suWwj0i4',

});


const storage = new multer.memoryStorage();

async function ImageUploadUtil(file){
  const result = await cloudinary.uploader.upload(file,{
    resource_type : 'auto'
  })
  return result;
}


const upload = multer({storage}); 

module.exports = {upload, ImageUploadUtil};
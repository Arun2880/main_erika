const Feature = require('../../models/features');

const addFeatureImage = async(req, res)=>{
  try{
    const {image} = req.body;
   
    const featuresImages = new Feature({
      image
    })
    await featuresImages.save();

    res.status(201).json({
      success: true,
      data: featuresImages
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      mesage: "some error occured"
    })
  }
}

const getFeatureImage = async(req, res)=>{
  try{
    const images = await Feature.find({ })
    res.status(200).json({
      success: true,
      data: images
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      mesage: "some error occured"
    })
  }
}


const fetureImageDelete= async(req,res)=>{
  try{
    const {_id} = req.params;
    const images = await Feature.findOneAndDelete({_id});
    res.status(200).json({
      success: true,
      data: images
      })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured"
    })
  }

}


module.exports = {addFeatureImage,getFeatureImage,fetureImageDelete}
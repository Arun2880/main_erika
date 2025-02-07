const   Reason = require("../../models/cancellation");

const reasconController = async(req,res) =>{
  try{
    const response = await Reason.find();
    if(!response){
      return res.status(404).json({message:"No data found"})
    }
    else{
      return res.status(200).json(
        {
          message : "Data found successfully",
          success: true,
          data: response
        }
      )
    }

  }
  catch(error){
    res.status(500).json({
      message: "Internal server error",
      success : false
    })
  }

}

module.exports = {reasconController}
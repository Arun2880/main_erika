const cancellation = require("../../models/cancellation");

const Reason = require("../../models/cancellation")

const reasonController=async(req, res)=>{
  try{
    const {userId, reason, payementStatus}= req.body;
    const cancelReason = new Reason({
      userId:userId,
      reason:reason, 
      payementStatus:payementStatus,
    })


    console.log("xsaasas",payementStatus,reason, userId )
    await cancelReason.save();
    res.status(201).json({
      message: " Cancellation reason stored successfully",
      success: true,
      data: cancelReason,
    })

  }
  catch(error){
    res.status(500).json({
      message:"Internal server error",
      success: false,
      error:error.message,
    })
  }

}
module.exports= {reasonController}



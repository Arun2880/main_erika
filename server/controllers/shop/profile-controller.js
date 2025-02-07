const User = require("../../models/User");

const getUserProfile= async(req,res)=>{
  try{
  const {_id} = req.params;
  const profile = await User.findById(_id);
  if (!profile) {
    return res.status(404).json({
      success: false, 
     
      message: "User not found!",

     });
 

  }
  else{
    return res.status(200).json({
      success: true,
      data: profile,
      message:"User Found Successfully!"
    })
  }
  
}
catch(error){
  res.status(500).json({
    success: false,
    message: "Error fetching user profile!",
  })
}

}


const updateProfile = async(req,res)=>{
  try{

    const {_id}= req.params;
    const {username, email}=req.body;
    const user = await User.findOneAndUpdate( { _id }, 
      { username, email }, 
      { new: true } 
    );
    console.log("username", username, email)
    if(!user){
      res.status(404).json({
        success: false,
        message: "User not found!"

      })
    }
      else{
        res.status(200).json({
        success: true,
        data: user,
        message: "user updated successfully!"
        
        })
      }

    

  }
  catch(error){
    res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    })
  }
}


module.exports= {getUserProfile, updateProfile};


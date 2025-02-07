// Controller: controllers/shop/refferal-controller.js

const Influencer = require("../../models/Influencer");
const Order = require("../../models/Order")
const verifyrefferal = async (req, res) => {
  try {
    const { refferal } = req.body;  
    
    const influencerData = await Influencer.findOne({ refferal });

    if (influencerData) {
     
      return res.status(200).json({
        message: "Referral is valid",
        success: true,
        data: influencerData,
      });
    } else {
      // Referral code is invalid
      return res.status(400).json({
        message: "Invalid referral code",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error verifying referral code:", error);

    // Internal server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",  // Fixed typo in "message"
      error: error.message,
    });
  }
};




const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;  
    
    const influencerData = await Influencer.findOne({ email });

    if (influencerData) {
     
      return res.status(200).json({
        message: "Email is valid",
        success: true,
        data: influencerData,
      });
    } else {
      // Referral code is invalid
      return res.status(400).json({
        message: "Invalid Email",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error verifying Email:", error);

    // Internal server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",  
      error: error.message,
    });
  }
};


const fetchRefferal = async (req, res) => {
  try {
    const { referral } = req.body;  
   
    const influencerData = await Order.find({ refferal:referral });

    if (influencerData) {
     
      return res.status(200).json({
        message: "Email is valid",
        success: true,
        data: influencerData,
      });
    } else {
      // Referral code is invalid
      return res.status(400).json({
        message: "Invalid Email",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error verifying Email:", error);

    // Internal server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",  
      error: error.message,
    });
  }
};






// Export the function for use in routes
module.exports = { verifyrefferal ,verifyEmail, fetchRefferal };

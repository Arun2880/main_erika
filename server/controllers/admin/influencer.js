const Influencer = require ('../../models/Influencer');
const addInfluencer = async (req,res)=>{
  try{
    const {name,email,socialMediaHandle,plateform,discount} = req.body;

    const uniqueEmail = await Influencer.findOne({email});
    if(uniqueEmail) {
     res.status(200).json({
      message: "Email Id Already exist",
      success: false

     })
    }  
    else{
   
    const generateReferralCode = (name) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
      // Normalize the name (take the first 3 characters, make it uppercase)
      const namePart = name.substring(0, 3).toUpperCase();
      
      // Generate a random string of 5 characters
      let randomPart = '';
      for (let i = 0; i < 5; i++) {
        randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      // Combine the name part and random part
      return `${namePart}-${randomPart}`;
    };
    const referrallCode = generateReferralCode(name);
    const newInfluencer = new Influencer({name,email,socialMediaHandle,plateform,discount,refferal:referrallCode});
    await newInfluencer.save();
    res.status(201).json({message:'Influencer created successfully',
      success:true,
     })

    }


  }
  catch(error){
    res.status(500).json({
      message: 'Internal server error',
      success:  false,
    
    })
  }
}

const getAllinfluencer = async(req,res)=>{
  try{

    const allinfluencers= await Influencer.find();
    res.status(200).json({
      message: "All influencers find successfully",
      success: true,
      data: allinfluencers});



  }
  catch(error){
    res.status(500).json({
      succes: false,
      message: 'Internal server error',
    })
  }

}

const findIdInfluencer= async(req,res)=>{
  try{
    const {_id} = req.params;
    const influencerDetail = await Influencer.findById(_id);
    if(!influencerDetail){
      res.status(404).json({
        message: 'influencer does not exist',
        success: false
      })
    }
    res.status(200).json({
      message: 'influencer found successfully',
      success: true,
      data: influencerDetail
    })

  }
  catch(error){
    res.status(500).json({
      message: 'Internal  server error ',
      success: false
    })
  }
}



module.exports= {addInfluencer, getAllinfluencer, findIdInfluencer}
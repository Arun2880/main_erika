const mongoose= require('mongoose');
 
const InfluencerSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required : true
  },
  socialMediaHandle: {
    type: String,
    required : true
  },
  plateform: {
    type: String,
    required : true
  },
  discount: {
    type:  Number,
    required : true,
  },
  refferal : {
    type: String,

  },

  roles: {
    type: String,
    default: "influencer"
  },
  




}, {timestamps: true})


module.exports= mongoose.model('Influencer', InfluencerSchema );
const Order = require('../../models/Order')


const getAllOrdersOfAllUsers = async(req,res)=>{
  try{
   
    const orders= await Order.find();
    
    

    if(!orders.length){
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      })
    }

    res.status(200).json({
      success: true,
      message: "Orders found successfully",
      data: orders
    })

  }
  catch(e){
    console.log(error);
    res.status(500).json({
      success: false,
      Message: "some error occured "
    })

  }
}

const getOrderDetailsForAdmin = async(req,res)=>{
  try{
    const {_id} = req.params;
    const order= await Order.findById({_id});

    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      })
    }

    res.status(200).json({
      success: true,
      data: order
    })


  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      Message: "some error occured "
    })

  }
}


const updateOrderStatus = async(req,res)=>{
  try{
    const {_id} = req.params;
    const {orderStatus} =  req.body;

    const order= await Order.findById({_id});
    
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      })
    }

    await Order.findByIdAndUpdate(_id,{orderStatus})
    res.status(202).json({
      success: true,
      message: "Order Status is updated successfully"
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      Message: "some error occured "
    })
    
  }

}


module.exports = {getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus }
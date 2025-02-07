
const paypal = require('../../helper/paypal');
const Order = require('../../models/Order');
const Cart = require('../../models/cart');
const Product = require('../../models/Product');


const createOrder = async(req, res)=>{
  try{
    const {UserId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,payerId,cartId, discountt, totalCartAmount, refferal} = req.body;
    

    
    const create_payment_json = {
      intent : 'sale',
      payer:{
        payment_method: 'paypal',
      },
      redirect_urls:{
        return_url : 'http://localhost:5173/shop/paypal-return' ,
        cancel_url : 'http://localhost:5173/shop/paypal-cancel'
      },
      transactions: [
        {
          item_list : {
            items : cartItems.map((item)=>({
              name: item.title,
              sku : item.productId,
              price : item.price-(item.price*(discountt/100)),
              currency: 'USD',
              quantity : item.quantity,

            })),
          },
          amount:{
            currency : 'USD',
            total : totalAmount.toFixed(2),
          },
          description: 'description'

        }
      ]
      
    }

    paypal.payment.create(create_payment_json, async(error,paymentInfo)=>{
      if(error){
        console.log(error);
        return res.status(500).json({
          success: false,
          message: 'Error creating payment'
        })
      }
      else{
        const newlyCreatedOrder = new Order({
          UserId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
          discountt,
          totalCartAmount,
          refferal,
          status: 1,


        })
        await newlyCreatedOrder.save();
        const approvalURL = paymentInfo.links.find(link=>link.rel ==='approval_url').href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id
        })


      }
    })



  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      Message: "some error occured "
    })
  }
};

const CapturePayment = async(req,res)=>{
  try{

   const {payerId,paymentId, orderId}= req.body
   const order=await Order.findById(orderId);

   if(!order){
    return res.status(404).json({
      success: false,
      message: "Order can not be found"
    })
   }
 
   order.paymentStatus = 'paid';
   order.orderStatus = 'confirmed';
   order. paymentId = paymentId;
   order.payerId = payerId;


   for(let item of order.cartItems){
     let product = await Product.findById(item.productId)

     if(!product){
      return res.status(404).json({
        success: false,
        message: `Not enough stock for this product ${product.title}`
      })
     }
     product.totalStock = product.totalStock-item.quantity

     await product.save();
   }

   const getCartId = order.cartId;
 await Cart.findByIdAndDelete(getCartId)


   await order.save();


   res.status(200).json({
    success: true,
    message: "Payment captured successfully",
    data: order,
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

const getAllOrdersByUser = async(req,res)=>{
  try{
    const {UserId} = req.params;
    const orders= await Order.find({UserId});
    
    

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


const getOrderDetails = async(req,res)=>{
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

const deleteOrder = async (req, res) => {
  try {
    const { _id } = req.params;

    console.log(_id, "sds");

    // Find the order by ID
    const order = await Order.findById(_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    } else {
      // Mark the order as deleted by setting the status to 0
      order.status = 0;

      // Save the order after modifying the status
      await order.save();

      // Respond with success
      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



const refundPayment = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Order ID:", _id);

    // Step 1: Find the order by ID
    const order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!"
      });
    }

    // Step 2: Check if the order has already been refunded
    if (order.paymentStatus === 'refunded') {
      return res.status(400).json({
        success: false,
        message: "This order has already been refunded."
      });
    }

    // Step 3: Ensure payment is 'paid' before processing refund
    if (order.paymentStatus !== 'paid') {
      return res.status(400).json({
        success: false,
        message: "This order cannot be refunded because it is not paid."
      });
    }

    // Step 4: Fetch payment details from PayPal to ensure payment is valid
    paypal.payment.get(order.paymentId, async function (error, payment) {
      if (error) {
        console.error("Error fetching payment details:", error.response);
        console.log("Debug ID:", error.response.debug_id);
        return res.status(500).json({
          success: false,
          message: "Payment not found or invalid"
        });
      }

      // Ensure that the payment is in 'approved' state
      if (payment.state !== 'approved') {
        return res.status(400).json({
          success: false,
          message: "Payment not approved, cannot refund"
        });
      }

      // Step 5: Call PayPal to initiate refund (using the payment ID from the order)
      const refund_json = {
        amount: {
          total: order.totalAmount.toFixed(2),  // Total amount to refund
          currency: 'USD',
        }
      };

      paypal.sale.refund(order.paymentId, refund_json, async (error, refundResponse) => {
        if (error) {
          console.error("Error details:", error.response);
          return res.status(500).json({
            success: false,
            message: "Error processing refund with PayPal"
          });
        }

        // Step 6: Update order status to refunded and payment status
        order.paymentStatus = 'refunded';
        order.orderStatus = 'cancelled';  // Set order status to 'cancelled' or 'refunded'
        order.refundId = refundResponse.id;  // Store the PayPal refund ID for reference
        await order.save();

        // Step 7: Update stock for each product in the order
        for (let item of order.cartItems) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.totalStock += item.quantity;  // Revert stock count
            await product.save();
          }
        }

        // Step 8: Send response back
        res.status(200).json({
          success: true,
          message: "Refund processed successfully",
          data: order
        });
      });

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error while processing refund"
    });
  }
};




module.exports = {createOrder, CapturePayment, getOrderDetails, getAllOrdersByUser,deleteOrder, refundPayment }
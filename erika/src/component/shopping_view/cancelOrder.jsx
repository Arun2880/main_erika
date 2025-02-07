import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast';
import { cancellReason, deleteOrder } from '@/store/shop/order-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CancelOrder = (orderDetails) => {
  const dispatch = useDispatch()

  const [cancelReason, setCancelReason]= useState("");
  const {toast }= useToast();
  const navigate = useNavigate();
  console.log("userId", orderDetails );
  console.log(orderDetails?.orderDetails?.paymentStatus,"fsdfd");
  const payementStatus= orderDetails?.orderDetails?.paymentStatus; 

  function handleInputChange(e){
    setCancelReason(e.target.value);
  }
 

  const  handleSubmit=async(e)=>{
    e.preventDefault();
    const id = orderDetails?.orderDetails?._id
    
    const userId = orderDetails?.orderDetails?.UserId;
    console.log(userId, "idddddd");
    
    const  reason =   cancelReason ;
    console.log(payementStatus, "reason");
    dispatch(deleteOrder(id))
    dispatch(cancellReason({userId, reason, payementStatus}))
        toast ({ 
          title: "Oreder Canceled Successfully.",
           className: 'bg-white text-black p-4 rounded-lg shadow-md'
      })

      window.location.reload();
    
  }


  return (
    <DialogContent  className='bg-white text-black'  >
    <div className='bg-white text-black'>
       <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
      <label htmlFor="reason" className="block text-sm font-bold text-gray-700">
        Reason For Cancellation Your Order
      </label>
      <input
        type="text"
        id="reason"
        name="reason"
        value={cancelReason}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
        placeholder="Enter Your Reason"
        required
      />
      <button type="submit" className="bg-black text-white py-2 px-4 rounded-md">
        Delete
      </button>
    </form>
      
    </div>
    </DialogContent>
  )
}

export default CancelOrder

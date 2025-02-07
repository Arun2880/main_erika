import { Label } from '@/components/ui/label';
import { fetchRefferal, verifyEmailInFluencer, verifyrefferal } from '@/store/admin/influencer';
import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Profit = ( newemail, setNewEmail) => {


  const dispatch = useDispatch();
  
  const [code , setCode]= useState([])

  useEffect(() => {
    if ( newemail.newemail.refferal) {
      let referral =  newemail.newemail.refferal;
      console.log(referral);
      dispatch(fetchRefferal(referral))
        .then(data => {
          if(data.payload.success){
            setCode(data.payload.data)
          }
        })
        .catch(error => {
          console.error("Error fetching referral:", error);
        });
    }
  }, [newemail, dispatch]); 
  
  const profit = code.reduce((accumulatedProfit, index) => {
    if(index.paymentStatus=== "paid" && index.orderStatus==="delivered"  ){
    const itemProfit = index.totalCartAmount - index.totalAmount;
    return accumulatedProfit + itemProfit;
    }else{
      return 0
    }
    
   
  }, 0);
  
  console.log(profit, "profit");
  


  return (
    <div className='flex gap-10 mt-5 mx-10 items-center'>
      <p className='font-medium '>Total Profit :</p>
      <span className='font-medium'>{profit ===0 ? 0 : profit }</span>
      
      
    </div>
  )
}

export default Profit;

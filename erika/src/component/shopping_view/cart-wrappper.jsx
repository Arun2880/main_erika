import { Button } from '@/components/ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React from 'react'
import UsercartItemsContent from './cart-items-content';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({cartItems, setOpenCartSheet}) => {
  const navigate = useNavigate();

  const totalCartAmount = cartItems && cartItems.length > 0  ? cartItems.reduce((sum, currentItem ) => sum + (
    currentItem?.productId?.salePrice > 0 ? currentItem?.productId?.salePrice
    : currentItem?.productId?.price) * currentItem?.quantity , 
    0

  ) : 0;

 


  return (
  <SheetContent className="sm:max-w-md bg-white text-black">
    <SheetHeader>
      <SheetTitle>Your Cart</SheetTitle>
    </SheetHeader>
    <div className='mt-8 space-y-4'>
      {
        cartItems && cartItems.length > 0 ? 
        cartItems.map((item)=> <UsercartItemsContent cartItem = {item}/>): null
      }
    </div>
    <div className='mt-8 space-y-4'>
      <div className='flex justify-between'>
        <span className='font-bold '>
          Total
        </span>
        <span className='font-bold '>
          ₹{totalCartAmount}
        </span>
      </div>
    </div>
    <Button onClick={()=>{ navigate('/shop/checkout');
      setOpenCartSheet(false);
    }} className="w-full mt-6 bg-black text-white">
      Checkout
    </Button>
  </SheetContent>
  )
}

export default UserCartWrapper; 

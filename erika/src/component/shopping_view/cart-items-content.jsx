import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import { deleteCartItem, updateCartItemQty } from '@/store/shop/cart-slice';
import { Minus, Plus, Trash } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UsercartItemsContent = ({cartItem}) => {
 
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.auth)
  const {toast}= useToast();
  const {cartItems} = useSelector(state=> state.shoppingCart);
  const { productList } = useSelector((state) => state.shopProducts);


  function handleUpdateQuantity(getCartItem, typeOfAction){

    if(typeOfAction == 'plus'){
      let getCartItems = cartItems.items ||[];

    if(getCartItems.length){
      const indexOfCurrentIitem = getCartItems.findIndex(item=> item?.productId?._id === getCartItem?.productId?._id);
      

      const getCurrentProductIndex = productList.findIndex(product=> product?._id === getCartItem.productId?._id);
      const getTotalStock= productList[getCurrentProductIndex].totalStock
      


      if(indexOfCurrentIitem > -1){
        const getQuantity = getCartItems[indexOfCurrentIitem].quantity;
        
        if(getQuantity + 1 > getTotalStock)
        {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant : 'destructive'
          }
          )
          return;
        }
      }
      
    }
  
    }

    dispatch(updateCartItemQty({userId : user?.id, productId: getCartItem?.productId?._id, quantity: 
    typeOfAction ==='plus' ?  
    getCartItem?.quantity + 1 : getCartItem?.quantity -1})).then(data=>{
      if(data?.payload?. success){
       toast({
        title: 'Quantity updated',
       })
      }
    })

  }




 
  function handleCartItemDelete(getCartItem){

  dispatch(deleteCartItem({userId: user?.id, productId: getCartItem?.productId?._id})).then(data=>{
    if(data?.payload?. success){
      toast({
         title: "Cart item is deleted successfully.",
         style:{ backgroundColor: 'white', color: 'black'}
      })
    }
  })
  
 
  }

  return (
    <div className='flex items-center space-x-4'>
     <img src={cartItem?.productId?.image} alt={cartItem?.productId?.image} className='w-20 h-20 rounded object-cover' /> 
     <div className='flex-1'>
      <h3 className='font-extrabold'>
        {
          cartItem?.productId?.title
        }
      </h3>
      <div className='flex items-center mt-1 gap-2'>
        <Button variant = "outline " size= "icon" className="h-8 w-8 rounded-full" onClick={()=>handleUpdateQuantity(cartItem,'minus')}
          disabled={cartItem?.quantity === 1}>
          <Minus className='w-4 h-4'/>
          <sapn className="sr-only">
            Decrease
          </sapn>
        </Button>
        <span className='font-semibold'>{cartItem.quantity}</span>

        <Button variant = "outline " size= "icon" className="h-8 w-8 rounded-full bg-white text-black" onClick={()=>handleUpdateQuantity(cartItem,'plus')}>
          <Plus className='w-4 h-4'/>
          <sapn className="sr-only">
            Plus
          </sapn>
        </Button>

      </div>

     </div>
     <p className='font-semibold'>
      ₹{((cartItem?.productId?.salePrice > 0? cartItem?.productId?.salePrice : cartItem?.productId?.price
      ) * cartItem?.quantity).toFixed(2)}
     </p>
     <Trash onClick={()=>handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20}/>

    </div>
    
  )
}

export default UsercartItemsContent;

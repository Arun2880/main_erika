import React, { useState } from 'react'
import img from "../../assets/accountbn.jpg"
import Address from '@/component/shopping_view/address'
import { useDispatch, useSelector } from 'react-redux'
import UsercartItemsContent from '@/component/shopping_view/cart-items-content'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'
import { resetRefferalDetails, verifyrefferal } from '@/store/admin/influencer'




const Checkout = () => {

  const {cartItems} = useSelector(state=> state.shoppingCart)

  const [currentSelectedAddress, setCurrentSelectedAddress]= useState(null);

  const [isPaymentStart, setIsPaymemntStart] = useState(false);

  const {approvalURL} = useSelector(state => state.shopOrder)

  const {toast} = useToast();
  const [refferal, setrefferal]= useState('');
  const [ verifyRefferall, setVerifyRefferal]= useState('');
  let newTotal = 0; 
  

  const {user} = useSelector((state)=> state.auth);

  const dispatch = useDispatch();

 


   const  totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0  ? cartItems.items.reduce((sum, currentItem ) => sum + (
    currentItem?.productId?.salePrice > 0 ? currentItem?.productId?.salePrice
    : currentItem?.productId?.price) * currentItem?.quantity , 
    0

  ) : 0;


  function handleInitialPaypalPayment(discount){
   
    console.log(discount, "fgdfgfdg");


   

    const totalPayable = newTotal;
    if(cartItems.length === 0){
      toast({
        title: 'Your cart is empty. Please add items to proceed.',
        variant: 'destructive'
      });

      return;

    }

    if(currentSelectedAddress === null){
      toast({
        title: 'Please select one address to proceed.',
        variant: 'destructive'
      });

      return;

    }
   
    console.log("total payable", totalPayable);
    const orderData ={
      UserId: user?.id,
      cartId: cartItems?._id,
      cartItems : cartItems.items.map((singleCartItem) =>({
          productId: singleCartItem?.productId?._id,
          title: singleCartItem?.productId?.title,
          image: singleCartItem?.productId?.image,
          price: singleCartItem?.productId?.salePrice > 0 ? singleCartItem?.productId?.salePrice: singleCartItem?.productId?.price,
          quantity : singleCartItem?.quantity,

      })),
      addressInfo : {
        addressId : currentSelectedAddress?._id,
        address : currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes, 
    
      },
      orderStatus : 'pending',
      paymentMethod : 'paypal',
      paymentStatus : 'pending', 
      totalAmount : totalPayable,
      orderDate: new Date(),
      orderUpdateDate : new Date(),
      paymentId: '',
      payerId: '',
      discountt: discount,
      totalCartAmount: totalCartAmount,
      refferal: verifyRefferall.refferal,

     
    };
 
    

    dispatch(createNewOrder(orderData)).then((data)=>{
      
      if(data?.payload?.success){
        setIsPaymemntStart(true);
      }else{
        setIsPaymemntStart(false);
      }
    })

  }

  if(approvalURL){
    window.location.href = approvalURL;
  }

  const handleSubmitt = (e)=>{
    e.preventDefault();
    dispatch(verifyrefferal(refferal)).then(data=>{
      if(data.payload.success){
       
      setVerifyRefferal(data.payload.data);
      
      }
    })
      
  }

const handleInputChange =(e)=>{

  setrefferal(e.target.value)
  
}





 


  return <div className=' flex flex-col'>
    <div className='relative h-[300px] w-full overflow-hidden'>
      <img
      src ={img}
      className='h-full w-full object-cover object-center'
      />

    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
      <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}/>
      <div className='flex flex-col gap-8'>
        {
          cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.map(item => <UsercartItemsContent cartItem={item}/>):null
        }
        <form onSubmit={handleSubmitt} className='flex flex-col gap-6' >
        <label htmlFor="refferal" className="block text-sm font-medium text-gray-700">Enter your Refferal code:</label>
          <input
            type="text"
            id="refferal"
            name="refferal"
            value={refferal}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
            placeholder="Enter influencer's name"
          />
          <Button className="bg-black text-white w-1/2" >Apply</Button>
        </form>

        <div className='mt-8 space-y-4'>
          <div className='flex justify-between'>

          {
            verifyRefferall?.discount ?
            <>           
             <span className='font-bold '>
              Total Amount
            </span>
            <span className='font-bold '>
              {totalCartAmount}

            </span>
            </>:null

          }
          </div>
          </div>
           <div className='mt-8 space-y-4'>
           <div className='flex justify-between'>

          <span className='font-bold '>
            Your Discount: 
          </span>
          
          { verifyRefferall?.discount ? 
           
          <span className='font-bold '>
           {verifyRefferall?.discount}% <br>
           </br>
           { newTotal= totalCartAmount*(verifyRefferall?.discount/100)}
          </span>
          : 0
          }
          </div>

        </div>
      
        
      <div className='mt-8 space-y-4'>
      <div className='flex justify-between'>
        <span className='font-bold '>
         {newTotal === 0 ? 'Total Amount' : 'Total Payable Amount' }
        </span>
        <span className='font-bold '>
          ₹{newTotal= totalCartAmount-newTotal}
        </span>
      </div>
    </div>
        <div className='mt-4 w-full'>
          <Button onClick={()=>handleInitialPaypalPayment(verifyRefferall.discount ? verifyRefferall.discount : 0  )} className=" bg-black text-white  w-full">
           {
            isPaymentStart ? "Payment in progress" : "Checkout with PayPal"
           }
          </Button>
        </div>
      </div>
     

    </div>

  </div>
}

export default Checkout

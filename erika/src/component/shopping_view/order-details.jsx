import { Badge } from '@/components/ui/badge'
import { DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useSelector } from 'react-redux'

const ShoppingOrderDetailsView = (orderDetails) => {
 
  const {user} = useSelector((state) => state.auth);
  

  return (
    <DialogContent className="sm:max-w-[600px] bg-white text-black">
    <div className='grid gap-6'>
      <div className='grid gap-2 mt-4'>
        <div className='flex items-center justify-between p-1 '>
          <p className='font-medium'> Order ID</p>
          <Label>{ orderDetails?.orderDetails?._id}</Label>

        </div>
        <div className='flex items-center justify-between p-1 '>
          <p className='font-medium'> Order Date</p>
          <Label>{orderDetails?.orderDetails?.orderDate}</Label>

        </div>
        <div className='flex items-center justify-between p-1'>
          <p className='font-medium'> Order Price</p>
          <Label>${orderDetails?.orderDetails?.totalAmount}</Label>

        </div>
        <div className='flex items-center justify-between p-1'>
          <p className='font-medium'> Payment Method</p>
          <Label>{orderDetails?.orderDetails?.paymentMethod}</Label>

        </div>
        <div className='flex items-center justify-between p-1'>
          <p className='font-medium'> Payment Status</p>
          <Label>{orderDetails?.orderDetails?.paymentStatus}</Label>

        </div>
        <div className='flex items-center justify-between p-1'>
          <p className='font-medium'> Order Status</p>
          <Label> <Badge className={` text-white py-1 px-3 ${orderDetails?.orderDetails?.orderStatus==='confirmed'? 'bg-green-700': orderDetails?.orderDetails?.orderStatus==='rejected'? 'bg-red-600':  'bg-black'}`}>{orderDetails?.orderDetails?.orderStatus
              } </Badge></Label>

        </div>

      </div>
      <Separator/>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <div className='font-medium'>
            Order Details

          </div>
          <ul className='grid gap-3'>
            {
              orderDetails?.orderDetails?.cartItems &&  orderDetails?.orderDetails?.cartItems.length>0? orderDetails?.orderDetails?.cartItems.map(item=>
                <li className='flex items-center justify-between'>
              <span>
               Title: {item.title}
              </span>
              <span>
                Quantity: {item.quantity}
              </span>
              <span>
                Price: ${item.price}
              </span>
            </li>
              ): null
            }
            
          </ul>

        </div>

      </div>

      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <div className='font-medium'> 
            Shipping Info
          </div>
          <div className='grid gap-0.5 text-muted-foreground'>
            <span>{user?.username}</span>
            <span>{orderDetails?.orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.orderDetails?.addressInfo?.notes}</span>

          </div>

        </div>


      </div>
     
    </div>

  </DialogContent>
  )
}

export default ShoppingOrderDetailsView

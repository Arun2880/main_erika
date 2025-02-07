


import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ShoppingOrderDetailsView from './order-details'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice'
import { Badge } from '@/components/ui/badge'
import CancelOrder from './cancelOrder'


const ShoppingOrders = () => {

 const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
 const [openDetails, setOpenDetails] = useState(false);
 const dispatch = useDispatch();
 const { user} = useSelector(state=> state.auth);
 const{orderList, orderDetails}= useSelector(state=> state.shopOrder);


 function handleFetchOrderDetails(getId){
  setOpenDetailsDialog(true)
  dispatch(getOrderDetails(getId));
 }



 useEffect(()=>{
  dispatch(getAllOrdersByUser(user?.id))
 },[dispatch]);



 

 

 
  

 function handleOrderDeletion(Id){
  dispatch(getOrderDetails(Id));
  setOpenDetails(true)
 }


 



  return (
   <Card>
    <CardHeader>
      <CardTitle>
        All orders
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
         
        <TableRow>
            <TableHead>
              Order Id
            </TableHead>
            <TableHead>
              Order Date
            </TableHead>
            <TableHead>
              Order status
            </TableHead>
            <TableHead>
              Order Price
            </TableHead>
            <TableHead>
              <span className='sr-only'>
                Details
              </span>
            </TableHead>
            <TableHead>
              <span className='sr-only'>
                Cancel Order
              </span>
            </TableHead>

          </TableRow>

        </TableHeader>
        <TableBody>
        {
            orderList && orderList.length  > 0 ?
            orderList.map((orderItem) =>(
              orderItem.status === 1 ?
              
              <TableRow>
            <TableCell>
              {orderItem?._id}
            </TableCell>
            <TableCell>
              {orderItem?.orderDate}
            </TableCell>
            <TableCell>
              <Badge className={` text-white py-1 px-3 ${orderItem?.orderStatus==='confirmed'? 'bg-green-700': orderItem?.orderStatus==='rejected'? 'bg-red-600':  'bg-black'}`}>{orderItem?.orderStatus
              } </Badge>
            </TableCell>
            <TableCell>
              {orderItem?.totalAmount
              }
            </TableCell>
            <TableCell>
              <Dialog open = {openDetailsDialog} onOpenChange={()=>{setOpenDetailsDialog(false);
                dispatch(resetOrderDetails());
              }}>
              <Button onClick={()=> handleFetchOrderDetails(orderItem?._id)} className="bg-black text-white">View Details</Button>
              <ShoppingOrderDetailsView orderDetails={orderDetails}/>
              </Dialog>
             
            </TableCell>
            <TableCell>
              <Dialog open = {openDetails} onOpenChange={()=>{setOpenDetails(false);
               
              }}>
              <Button onClick={()=> handleOrderDeletion(orderItem?._id)} className="bg-black text-white">Cancel Order</Button>
              <CancelOrder orderDetails={orderDetails}/>
              </Dialog>
             
            </TableCell>
          </TableRow>:null
          
            )):null
          }
          
        </TableBody>
      </Table>
    </CardContent>
   </Card>
  )
}

export default ShoppingOrders
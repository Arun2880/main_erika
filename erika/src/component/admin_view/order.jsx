import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/orders-slice'
import { Badge } from '@/components/ui/badge'

const AdminOrder = () => {

  const[openDetailsDialog, setOpenDetailsDialog] = useState(false); 
  

  const{orderList, orderDetails } = useSelector(state=> state.adminOrder)

  const dispatch = useDispatch();


  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetailsForAdmin(getId))
  }


  useEffect(()=>{
     dispatch(getAllOrdersForAdmin())
  },[dispatch])



  useEffect(()=>{
    if(orderDetails !== null) setOpenDetailsDialog(true)
  },[orderDetails])
  

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

          </TableRow>

        </TableHeader>
        <TableBody>
        {
            orderList && orderList.length > 0 ?
            orderList.map((orderItem) =>(
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
              }}
              >
              <Button 
              onClick={()=> handleFetchOrderDetails(orderItem?._id)} 
              
              className="bg-black text-white">View Details</Button>
              <AdminOrderDetailsView orderDetails={orderDetails}/>
              </Dialog>
             
            </TableCell>
          </TableRow>
            )):null
          }
        </TableBody>
      </Table>
    </CardContent>
   </Card>
  )
}

export default AdminOrder

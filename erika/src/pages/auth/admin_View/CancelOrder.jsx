import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchReason } from '@/store/admin/influencer';
import { data } from 'autoprefixer';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CancelOrder = () => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState([]);
  useEffect(()=>{
    dispatch(fetchReason()).then(data=>{[
      setReason(data.payload.data)
    ]})
  },[])
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Cancelled Order's Details</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className ="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>
                Sr. No.
              </TableHead>
              <TableHead>
                User Id
              </TableHead>
            
              <TableHead>
                Payment Status
              </TableHead>
              <TableHead>
                Refund Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reason.map((item, index) =>(
            <TableRow>
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell>
                {item?.userId}
              </TableCell>
             
              <TableCell >
                <span className={ item?.payementStatus=== "pending" ? ' ':'bg-green-700 items-center justify-center px-5 py-3 text-white rounded-2xl' }>
                {item?.payementStatus}
                </span>
              </TableCell>
              <TableCell>
                {item?.refundStatus}
              </TableCell>
            </TableRow>
            )
        )
      }
          </TableBody>
          
        </Table>
      </CardContent>
    </Card>
  )
}

export default CancelOrder

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchRefferal, getInfluencerList, resetInfluencerDetails, singleInfluencer } from '@/store/admin/influencer';
import { getOrderDetails } from '@/store/shop/order-slice';
import { DialogTitle } from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Show_Influencer = () => {
  const [influencerlist, setInfluencerList] = useState([]);
  const dispatch = useDispatch();
   const [openInfluencerDetails,setOpenInfluencerDetails] = useState(false);
   const [singleInfluencerdetails, setsingleinfluencerDetails]=useState([]);
   const{ orderDetails}= useSelector(state=> state.shopOrder);
   const [code ,setCode]= useState([])


  useEffect(() => {
    // Dispatch the action to get the influencer list
    dispatch(getInfluencerList()).then((data) => {
      // Assuming the data structure is data.payload.data, update state
      setInfluencerList(data.payload.data);
    });
  }, [dispatch]);

  const handleInfluencerDetails= async(influencerId, refferal)=>{

   
    dispatch(singleInfluencer(influencerId)).then(data=>{
      
      setsingleinfluencerDetails(data.payload.data);
      
    })
      const getId = refferal;
    dispatch(fetchRefferal(getId)).then(data=>{
      setCode(data.payload.data)

    })

    
    setOpenInfluencerDetails(true);
    resetInfluencerDetails();
  }



  const profit = code.reduce((accumulatedProfit, index) => {
    if(index.paymentStatus=== "paid" && index.orderStatus==="delivered"  ){
    const itemProfit = index.totalCartAmount - index.totalAmount;
    return accumulatedProfit + itemProfit;
    }else{
      return 0
    }
    
   
  }, 0);

  console.log(code, 'codeee'); // Log influencer data for debugging

  return (
    <Card>
      <CardHeader>
        <CardTitle>Influencer's Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Sr. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Social Media Handle</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {influencerlist.map((influencer, index) => (
              <TableRow key={influencer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{influencer.name}</TableCell> {/* Correct the name */}
                <TableCell>{influencer.socialMediaHandle}</TableCell> {/* Correct social media handle */}
                <TableCell>{influencer.plateform}</TableCell> {/* Correct platform */}
                <TableCell>
                <Dialog open={openInfluencerDetails} onOpenChange={()=>{setOpenInfluencerDetails(false)}}>
                  <Button className="bg-black text-white" onClick={()=>handleInfluencerDetails(influencer?._id, influencer?.refferal )}>Details</Button>
                 
                  <DialogContent className="sm:max-w-[600px] bg-white text-black">
                  <h1 className='font-extrabold text-[20px] mx-10'>Influencer's Details</h1>
                    <div className='grid gap-6'>
                      <div className='grid gap-2 mt-1 '>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Name:</p>
                          <Label>{singleInfluencerdetails?.name}</Label>
                        </div>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Id:</p>
                          <Label>{singleInfluencerdetails?._id}</Label>
                        </div>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Email:</p>
                          <Label>{singleInfluencerdetails?.email}</Label>
                        </div>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Social Media Handle:</p>
                          <Label>{singleInfluencerdetails?.socialMediaHandle}</Label>
                        </div>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Platform:</p>
                          <Label>{singleInfluencerdetails?.plateform}</Label>
                        </div>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Refferal Code:</p>
                          <Label>{singleInfluencerdetails?.refferal}</Label>
                        </div>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Discount:</p>
                          <Label>{singleInfluencerdetails?.discount}%</Label>
                        </div>
                        <div className='flex items-center p-1'>
                          <p className='font-medium mx-10'> Profit:</p>
                          <Label>₹{profit}</Label>
                        </div>
                      </div>

                    </div>
                   
                  </DialogContent>
                   </Dialog>
                 </TableCell>
                   {/* Correct details */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Show_Influencer;

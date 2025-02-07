import React, { useEffect, useState } from 'react'
import accimg from "../../assets/ran 02.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/component/shopping_view/orders'
import Address from '@/component/shopping_view/address'
import ShoppingOrders from '@/component/shopping_view/orders'
import ViewProfile from '@/component/shopping_view/view-profile'
import Profit from '@/component/shopping_view/influencer-profit'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmailInFluencer } from '@/store/admin/influencer'

const Account = () => {

  const [refferal , setRefferal]= useState(false)
  const {user} = useSelector(state=> state.auth);
  const email = user.email;
  const [newemail , setNewEmail ]= useState([])
  const dispatch = useDispatch();




  useEffect(() => {
    // Dispatch the action and handle the promise
    dispatch(verifyEmailInFluencer(email))
      .then(data => {
        if (data.payload.success) {
          setNewEmail(data.payload.data)
          setRefferal(true)
           
        }
      })
      .catch(error => {
        console.error("Error verifying email:", error);
      });
  }, [dispatch, email]);

  return (
    <div className='flex flex-col'>
      <div className='relative  w-full overflow-hidden'>
        <img src={accimg} 
          className='h-full w-full object-contain '
        />
      </div>
      <div className=' container mx-auto grid-cols-1 gap-8 py-8  '>
         <div className='flex flex-col rounded-lg border bg-background p-6 shadow'>
            <Tabs defaultValue='orders'>
              <TabsList>
              
                <TabsTrigger value="orders">
                  Orders
                </TabsTrigger>

              
                <TabsTrigger value="profile">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="address">
                  Address
                </TabsTrigger>
                { refferal?
                <TabsTrigger value="profit">
                  Profit
                </TabsTrigger>:null}
              </TabsList>
              <TabsContent value ="profile">
                <ViewProfile/>
              </TabsContent>
              <TabsContent value ="orders">
              <ShoppingOrders/>
              </TabsContent>
              <TabsContent value ="address">
              <Address/>
              </TabsContent>
              <TabsContent value ="profit">
              <Profit newemail={newemail} setNewEmail={setNewEmail}/>
              </TabsContent>
            </Tabs>
         </div>
      </div>
     
    </div>
  )
}

export default Account

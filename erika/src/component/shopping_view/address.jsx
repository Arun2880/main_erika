


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import Commonform from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, ediitaAddress, fetchAllAddresses } from '@/store/shop/address-slice'
import { LogIn } from 'lucide-react'
import AddressCard from './address-card'
import { current } from '@reduxjs/toolkit'
import { useToast } from '@/hooks/use-toast'

const initialAddressFormData ={
  address : '',
  city : '',
  phone : '',
  pincode : '',
  notes : ''

}

const Address = ({setCurrentSelectedAddress, selectedId}) => {

  const [formData, setFormData ] = useState(initialAddressFormData);

  const [getCurrentEditedId, setCurrentEditedid]= useState(null)

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  const {addressList} = useSelector((state)=> state.shopAddress);
  const {toast} = useToast();


  function handleManageAddress(event){
    event.preventDefault();

    if(addressList.length>=3 && getCurrentEditedId === null){
      setFormData(initialAddressFormData);
      toast({
        title :'You can add maximumm 3 addresses',
        variant : 'destructive'
       
      });
      return;
    }

    getCurrentEditedId !== null ? dispatch(ediitaAddress({
      userId : user?.id, addressId:getCurrentEditedId, formData 
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(user?.id))
        setCurrentEditedid(null)
        setFormData(initialAddressFormData);
        toast({
          title: 'Address Updated successfully'
        })
      }
    }):
    dispatch(addNewAddress({
      ...formData,
      userId : user?.id
    })).then (data => {
     
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(user?.id))

        setFormData(initialAddressFormData);
        toast({
          title: 'Address Added successfully'
        })


      }
      
    })

  }

  function handleDeleteAddress(getCurrentAddress){
    
    dispatch(deleteAddress({userId: user?.id, addressId : getCurrentAddress._id})).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(user?.id))
        toast({
          title :'Your  address has been deleted',

          variant : 'destructive'
         
        });
      }
    })  

   
    

  }

  function handleEditAddress(getCurrentAddress){
    setCurrentEditedid(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address : getCurrentAddress?.address,
      city : getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress.notes,
    })

  }



  function isFormValid(){
    return Object.keys(formData).map(key=> formData[key].trim() !== '').every((item)=>item);
  }

  useEffect(()=>{
    dispatch(fetchAllAddresses(user?.id))
  },[dispatch])

 
 

  return (
   <Card>
    <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2'>
      {
        addressList && addressList.length > 0 ? addressList.map((singleAddressItem)=>(<AddressCard
          selectedId={selectedId} 
          handleDeleteAddress={handleDeleteAddress} addressInfo={singleAddressItem}
          handleEditAddress ={ handleEditAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          />)):null
      }
    </div>
    <CardHeader>
      <CardTitle>{getCurrentEditedId != null ? 'Edit Address': 'Add New Address' }</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
        <Commonform
        formControls={addressFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={getCurrentEditedId != null ? 'Edit': 'Add '}
        onSubmit={handleManageAddress}
        isBtnDisabled={!isFormValid()}
        />
    </CardContent>
   </Card>
  )
}

export default Address

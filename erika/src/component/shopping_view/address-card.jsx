import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";


function AddressCard( {addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}){
 
  
  return(
   <Card onClick={setCurrentSelectedAddress?()=>setCurrentSelectedAddress(addressInfo):null}
   className= {`cursor-pointer border-red-700 ${selectedId?._id=== addressInfo?._id ? "border-red-900 border-[4px]"  :
    "border-black"
   }`}
   >
    <CardContent className = "grid gap-4 p-4">
      <Label> Address: {addressInfo?.address}</Label>
      <Label>City:  {addressInfo?.city}</Label>
      <Label>Pincode: {addressInfo?.pincode}</Label>
      <Label>Phone: {addressInfo?.phone}</Label>
      <Label>Notes: {addressInfo?.notes}</Label>

     

    </CardContent>
    <CardFooter className="flex justify-between">
      <Button onClick={()=>handleEditAddress(addressInfo)} className="text-white bg-black" >Edit</Button>
      <Button onClick= {()=>handleDeleteAddress(addressInfo)} className="text-white bg-black">Delete</Button>
    </CardFooter>
   </Card>
  );
}

export default AddressCard;
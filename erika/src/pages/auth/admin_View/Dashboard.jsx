import ProductImage from '@/component/admin_view/Image-upload';
import { Button } from '@/components/ui/button';
import { addFeatureImage, fetureImageDelete, getFeatureImage } from '@/store/common';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {

  const [imageFile, setImageFile]= useState([]);
  const [uploadedImageUrl, setUploadedUrl ]= useState('');
  const [imageLoadingState, setImageLoadingState]= useState(false);
  const dispatch = useDispatch();
  const {featureImageList} = useSelector(state=>state.commonFeature);
 



  function handleUploadFeatureImage(){
    dispatch(addFeatureImage(uploadedImageUrl)).then(data=>{
      c
      
      if(data?.payload?.success){
        dispatch(getFeatureImage());
        setImageFile(null);
        setUploadedUrl("");
      }
    })
  }

  useEffect(()=>{
    dispatch(getFeatureImage())
   
  },[dispatch])
   
  function handleDeleteFeature(_id){
        dispatch(fetureImageDelete(_id));
        dispatch(getFeatureImage());
  }
 



  return (
    <div >
     
     <ProductImage imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedUrl={setUploadedUrl}
        setImageLoadingState= {setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}

        // isEditMode={currentEditedid !==null}
        />
        <Button onClick={handleUploadFeatureImage} className="bg-black text-white w-full mt-5">Upload</Button>
        <div className='flex flex-col mt-5'>
          {
            featureImageList && featureImageList.length > 0 ?
            featureImageList.map((featureImageList =>
            <div className="relative mt-5">
            <img src={featureImageList?.image} alt='image'
            
            className="w-full h-[250px] object-cover object-center rounded-t-lg" />
            
            <Button onClick={()=>handleDeleteFeature(featureImageList?._id)} className="text-white bg-black mt-4 w-full"> Delete</Button>
  
             </div>
            )): null
          }
        </div>
    </div>
  )
}

export default Dashboard

import ProductImage from '@/component/admin_view/Image-upload';

import AdminProductTile from '@/component/admin_view/product-tile';
import Commonform from '@/component/common/form';
import { Button } from '@/components/ui/button'
import { Sheet,SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';

import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const initialFormData={
  image: null,
  title: '',
  description: '',
  detail: '',
  benefits:'',
  category: '',
  brand: '',
  price: '',
  salePrice:'',
  totalStock:'',
  


};


const Products = () => {
  const {toast}= useToast();

  const [openCreateProductDialog,setopenCreateProductDialog ] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile]= useState([]);
  const [uploadedImageUrl, setUploadedUrl ]= useState([]);

  const [imageLoadingState, setImageLoadingState]= useState(false);

  const [currentEditedid, setCurrentEditedId] = useState(null);

 

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  function onSubmit(event){
    event.preventDefault();

    currentEditedid !== null ?
    dispatch(editProduct({
      id : currentEditedid,
      formData
    })).then((data)=>{
      
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setopenCreateProductDialog(false);
        setCurrentEditedId(null);
        toast({
          title: 'Product Updated successfully',
        })
       
      }
    }):
    dispatch(addProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data)=>{
    
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setopenCreateProductDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title : "product addeed succesfully",
        })
      }
    });

  

  }

  function handleDelete(getCurrentProductId){
    
    dispatch(deleteProduct(getCurrentProductId)).then(data=>{

    
     
      if(data?.payload?.succes){
        toast({
          title: 'Product deleted successfully',
        })
       
        dispatch(fetchAllProducts());

      }
    });
  }



  function isFormValid(){
    return Object.keys(formData).map(key=> formData[key] !== '').every(item=> item);
  }


  useEffect(()=>{
    dispatch(fetchAllProducts());

  },[dispatch]);


 
  
  return (
   <Fragment >
    <div className='mb-5 w-full flex justify-end '>
      <Button className="text-white bg-black" onClick={()=> setopenCreateProductDialog(true)}>
        Add New Product
      </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length> 0 ?
          productList.map((productItem)=>(<AdminProductTile setFormData={setFormData}  setopenCreateProductDialog={setopenCreateProductDialog} setCurrentEditedId={setCurrentEditedId} product={productItem}
          handleDelete={handleDelete}/> )): null}



      </div>

 
    <Sheet open={openCreateProductDialog} onOpenChange={()=> {setopenCreateProductDialog(false);
      setCurrentEditedId(null);
      setFormData(initialFormData);
    }}>
      <SheetContent side="right" className="overflow-auto bg-white">
        <SheetHeader>
          <SheetTitle>
            {
              currentEditedid !==null ? "Edit Product" : "Add New Product"
            }
          </SheetTitle>
        </SheetHeader>
        <ProductImage imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedUrl={setUploadedUrl}
        setImageLoadingState= {setImageLoadingState}
        imageLoadingState={imageLoadingState}

        isEditMode={currentEditedid !==null}
        />
        <div className='py-6' >
          <Commonform  onSubmit={onSubmit}formData={formData}
          setFormData={setFormData} buttonText= {currentEditedid !==null ? 'Edit': 'Add'}
          formControls={addProductFormElements}
          isBtnDisabled= {!isFormValid()}
          />


        </div>
        

      </SheetContent>
     
    </Sheet>
   </Fragment>
  )
}

export default Products;

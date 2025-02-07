


import { Input } from '@/components/ui/input';
import { getSearchReasults, resetSearchResults } from '@/store/shop/search';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ShoppingProductTile from './Product-tile';
import { Item } from '@radix-ui/react-dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { addToCart, fetchCartItem } from '@/store/shop/cart-slice';
import { fetchProductDetails } from '@/store/shop/products-slice';
import ProductDetailsDialog from '@/component/shopping_view/product-details';

const SearchProducts = () => {

  const [keyword, setKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams(); 
  const dispatch = useDispatch();
  const searchResults = useSelector(state=> state.shopSearch);
  const {user}= useSelector((state)=> state.auth);
  const cartItems = useSelector(state=> 
  state.shoppingCart);
  
  const { productDetails } = useSelector((state) => state.shopProducts);

  const [openDetailsDialog, setOpenDetailsDialog]= useState(false)

  const {toast}= useToast()

  useEffect(() => {
    const storedKeyword = localStorage.getItem('sendKeyword');
    if (storedKeyword) {
        setKeyword(storedKeyword);
    }
});
  
  useEffect(()=>{
     
     
    

      
    if(keyword && keyword.trim() !== '' && keyword.trim().length >3){
      setTimeout(()=>{
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(getSearchReasults(keyword))
    
        
      }, 1000)
    } else{
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults())
    }
  },[keyword])

  function handleAddToCart(getCurrentId, getTotalStock ){
   
  
    let getCartItems = cartItems.items ||[];
  
    if(getCartItems.length){
      const indexOfCurrentIitem = getCartItems.findIndex(item=> item?.productId?._id === getCurrentId);
     
      if(indexOfCurrentIitem > -1){
        const getQuantity = getCartItems[indexOfCurrentIitem].quantity;
        
        if(getQuantity + 1 > getTotalStock)
        {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant : 'destructive'
          }
          )
          return;
        }
      }
      
    }
  
  
  
    dispatch(addToCart({ userId: user?.id, productId: getCurrentId, quantity : 1})).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchCartItem(user?.id));
        toast({
          title: "Product Added to Cart",
        })
      }
    })
    
  
   }

   function handleGetProductDetails(getCurrentId){
    
    dispatch(fetchProductDetails(getCurrentId));
    
   }
   
   useEffect(()=>{
    if(productDetails !==null) setOpenDetailsDialog(true)

  },[productDetails]);



  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className='flex justify-center mb-8'>
        <div className='w-full flex items-center'>
         

        </div>

      </div>
      {
        !searchResults?.searchResults.length ? <h1 className='text-xl font-extrabold'> No result found</h1>: null
      }
      <div className='grid grid-cols-1 sm:grid col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
           searchResults?.searchResults.map(item=> <ShoppingProductTile handleAddToCart={handleAddToCart} product={item}
            handleGetProductDetails={handleGetProductDetails}
           />)
        }
        
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog }productDetails={productDetails}/>
    </div>
  )
}

export default SearchProducts;

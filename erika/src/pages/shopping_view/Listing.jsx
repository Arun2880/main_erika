import Filter from "@/component/shopping_view/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./Product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/component/shopping_view/product-details";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function createSearchParamsHelper(filterParams){
  const queryParams = [];

  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length>0){
      const paramValue = value.join(',')
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }

  }



  return queryParams.join('&')
}


const Listing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [filters, setFilters]=useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams ] = useSearchParams();
const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
const {user}= useSelector((state)=> state.auth);
const {toast} = useToast();
const categorySearchParam = searchParams.get("category");
const {cartItems} = useSelector(state=> state.shoppingCart)



  function handleSort(value){
   setSort(value);
  }

  function handleFilter(getSectionId, getCurrentId){
    

    let cpyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters). indexOf(getSectionId);

    if(indexOfCurrentSection === -1){
      cpyFilters={
        ...cpyFilters,
      [getSectionId]: [getCurrentId],
      };

    }
    else{
      const indexOfCurrentId = cpyFilters[getSectionId].indexOf(getCurrentId);
      if(indexOfCurrentId === -1){
        cpyFilters[getSectionId].push(getCurrentId);

      }
      else{
        cpyFilters[getSectionId].splice(indexOfCurrentId, 1);
      }
    }
    
      
      setFilters(cpyFilters);
      sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
  }


 function handleGetProductDetails(getCurrentId){

  dispatch(fetchProductDetails(getCurrentId));
  
 }


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
 

 useEffect(()=>{
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
 },[categorySearchParam]);

 useEffect(()=>{
  if(filters && Object.keys(filters).length > 0){
    const createQueryString = createSearchParamsHelper(filters)
    setSearchParams(new URLSearchParams(createQueryString))

  }

 },[filters])



  useEffect(() => {
    if(filters!== null && sort !==null){

    }

    dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams : sort}));
  }, [dispatch, sort, filters]);

  useEffect(()=>{
    if(productDetails !==null) setOpenDetailsDialog(true)

  },[productDetails]);



 
  

 

  return (
    <div className="grid grid-cols md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6  relative">
      <Filter filters={filters} handleFilter={handleFilter}  />
      <div className="bg-background w-full rounded-lg shadow-sm overflow-y-auto h-[600px] ">
        <div className="p-3 border-b flex items-center justify-between font-serif ">
          <h2 className="text-xl font-extrabold  ">All Products</h2>
          <div className="flex items-center gap-3 ">
            <span className="text-muted-foreground">{ productList?.length}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 border-black border-2"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-sm">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile 
                handleGetProductDetails={handleGetProductDetails} product={productItem} handleAddToCart={handleAddToCart} />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog }productDetails={productDetails}/>
    </div>
  );
};

export default Listing;

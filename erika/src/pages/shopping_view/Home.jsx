import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/SERUM1212-02.jpg'

import { Button } from '@/components/ui/button'
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Image, ShieldEllipsis, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import ShoppingProductTile from './Product-tile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItem } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import ProductDetailsDialog from '@/component/shopping_view/product-details'
import { getFeatureImage } from '@/store/common'
import { motion } from 'framer-motion'
import {fadeIn} from "../../variants"
import icon1 from "../../assets/mehndi.png"
import icon2 from "../../assets/hair-care (1).png"
import icon3 from "../../assets/shampoo.png"
import icon4 from "../../assets/serum.png"
import logo from "../../assets/logo erika.png"
import logo2 from "../../assets/mamta gold logo.png"
import MarketingBanner from './marketing'

const categoriesWithIcon = [
  {id: "mehendi", label: "Mehendi" , icon : icon1 },
  {id: "harecare", label: "Hair Care", icon: icon2},
  {id: "shampoo", label: "Shampoo" ,icon: icon3},
  {id: "seerum", label: "Seerum" , icon: icon4},
  

];

const brandsWithIcon= [
  { id:"erika", label: "Erika", icon : logo},
  // { id:"mamta", label: "Mamta Gold", icon : logo2 },
];


const Home = () => {
  const {productList, productDetails} = useSelector(state=> state.shopProducts);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const {user} = useSelector(state=> state.auth);

  const dispatch = useDispatch();

  const [currentSlide, setCurrentSlide]= useState(0);

  const navigate = useNavigate();

  

  const {toast} =useToast();
  const {featureImageList} = useSelector(state=>state.commonFeature);


  function handleNavigateToListingPage(getCurrentItem, section){
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    navigate(`/shop/listing`);
    window.scrollTo(0, 0);

  }


  function handleGetProductDetails(getCurrentId){
    
    
    dispatch(fetchProductDetails(getCurrentId));
    
   }

   function handleAddToCart(getCurrentId){
    
    if(user?.id){
    dispatch(addToCart({ userId: user?.id, productId: getCurrentId, quantity : 1})).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchCartItem(user?.id));
        toast({
          title: "Product Added to Cart",
        })
      }
    })
  }
  else{
    toast({
      title: "Please Login to Add Product to Cart",
    })
  }
    
  
   }

   useEffect(()=>{
    if(productDetails !==null) setOpenDetailsDialog(true)

  },[productDetails]);


  useEffect(() => {
    const timer = setInterval(() => {
      if (featureImageList.length > 0) {
        setCurrentSlide(prevSlide => (prevSlide + 1) % featureImageList.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams : {},sortParams : 'price-lowtohigh'}))
  },[dispatch]);

  useEffect(()=>{
    dispatch(getFeatureImage())
  },[dispatch]);
 
 
 

 
  return (
   
    <div className='flex flex-col min-h-screen'>
       <div className='w-full p-3 bg-[#007000]'> 
        <marquee><h1 className='text-white font-semibold text-[20px]'> Flash Deals Grab it</h1></marquee>

      </div>
      <div className='relative w-full h-[500px] overflow-hidden '>
      {
          featureImageList && featureImageList.length > 0 
            ? featureImageList.map((slide, index) => (
                <img 
                  src={slide?.image} 
                  key={index} 
                  className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                />
              ))
            : <p>Loading...</p>
        }

        <Button variant = "outline"
        onClick={()=> setCurrentSlide(prevSlide=>(prevSlide -1 + featureImageList.length) % featureImageList.length)} size="icon" className="absolute top-1/2 left-4 transform-translate-y-1/2 bg-white/80">
          <ChevronLeftIcon className='w-4 h-4'/>
        </Button>
        <Button variant = "outline" 
         onClick={()=> setCurrentSlide(prevSlide=>(prevSlide + 1 ) % featureImageList.length)}  size="icon" className="absolute top-1/2 right-4 transform-translate-y-1/2 bg-white/80">
          <ChevronRightIcon className='w-4 h-4'/>
        </Button>
      </div>

      <div className='flex flex-col sm:flex-row lg:flex-row mt-[50px]'>
        <div 
         variants={fadeIn("right", 0.2)}
         initial="hidden"
         whileInView={"show"}
         viewport={{ once: false, amount:0.7 }}
         className='flex flex-col sm:w-full lg:w-1/2 px-5 py-5 '>
         <img src={bannerOne} alt="" className='w-full aspect-square rounded-lg'/>
        </div>
        <div className='flex flex-col sm:w-full lg:w-1/2 py-7 mx-6 mt-5'>
        <p className='font-serif'>Welcome to</p>
        <h1 className='font-extrabold text-[40px] font-serif '> Sampat Raj & Company - Since 1988</h1>
        <p className='font-serif'>
        Welcome to Sampat Raj & Company, a name synonymous with trust and excellence in the realm of natural beauty and cosmetic manufacturing. Established in 1988 in the picturesque town of Sojat, Rajasthan, we are the most trusted Indian cultivator, manufacturer, and exporter of<span className='font-bold font-serif'> Mamta Gold</span> (known as mehendi in India) and <span className='font-bold font-serif'>Herbal Henna-Based Hair Color. </span>
        </p>
        <p className='mt-5 font-serif'>
        In 2024, we expanded our horizons with the establishment of Erika Henna Herbal, a dedicated marketing company under the umbrella of Sampat Raj & Company. Erika Henna Herbal was founded to enhance our market presence and bring our exceptional products closer to our customers worldwide.
        </p>

        <Button className="bg-[#007000] shadow-2xl shadow-green-500 text-white w-1/4 my-10 py-4 font-serif" onClick= {()=>navigate('/shop/about')}> More About</Button>
        </div>

      </div>




      <section className='py-12 bg-gray-50 '>
        <div className='container mx-auto px-4 font-serif'>
          <h2
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount:0.7 }}
           className='text-3xl font-bold text-center mb-8 '>Shop By Category</h2>
          <div 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount:0.7 }}
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'

          >
            {
              categoriesWithIcon.map(categoryItem=> 
              <Card  key={categoryItem.id} onClick={()=>handleNavigateToListingPage(categoryItem,'category')} className=" cursur-pointer hover:shadow-lg transition-shadow ">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  
                  <img src={categoryItem.icon} className=' w-[70px] h-[70px] mb-4 ' alt=" image.png" />
                  
                  <span className='font-bold '>
                    {categoryItem.label}
                  </span>

                </CardContent>
              </Card>
              )
            }
          </div>


        </div>

      </section>

      {/* <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4 font-serif'>
          <h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount:0.7 }}
           className='text-3xl font-bold text-center mb-8  '>Shop By Brand</h2>
          <div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount:0.7 }}
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
            {
              brandsWithIcon.map((brandItem)=> 
              <Card onClick={()=>handleNavigateToListingPage(brandItem,'brand')} className=" cursur-pointer hover:shadow-lg transition-shadow ">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  < img src={brandItem.icon} className='w-[200px] h-[70px] mb-4 text-primary filter grayscale ' alt='image.png'/>
                  <span className='font-bold '>
                    {brandItem.label}
                  </span>

                </CardContent>
              </Card>
              )
            }
          </div>


        </div>

      </section> */}
      
      <section className='py-12'>
        <div
        
         className='container mx-auto px-4'>
          
          <MarketingBanner/>
         

        </div>

      </section>

      <section className='py-12 '>
        <div
        
         className='container mx-auto px-4 '>
          
          <h2
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount:0.7 }}
           className='text-3xl font-bold text-center mb-8 '>Feature Product</h2>
          <div 
          
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length >0 ?
              productList.map(productItem=> <ShoppingProductTile 
                
                handleGetProductDetails={handleGetProductDetails}
                product= {productItem}
                handleAddToCart={handleAddToCart}
                />)
              :null
            }
          </div>

        </div>

      </section>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog }productDetails={productDetails}/>
    
    </div>
  )
}

export default Home

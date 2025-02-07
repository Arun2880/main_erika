import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { brandOptionMap, categoryOptionMap } from '@/config'
import React from 'react'
import {motion} from 'framer-motion'
import { fadeIn } from '@/variants'

const ShoppingProductTile = ({product, handleGetProductDetails, handleAddToCart}) => {
  return (
   <Card 
   
   className="w-full max-w-sm mx-auto relative group p-3 shadow-xl  transition-all duration-900 border-0 hover:shadow-xl" 
   style={{
    boxShadow: '0 10px 15px rgb(224, 224, 224)',
    transition: 'box-shadow 0.3s',
    borderRadius: '8px',
    padding: '16px',
  }}
  onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 15px 20px rgba(29, 226, 12, 0.4)')}
  onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 10px 15px rgb(224, 224, 224)')}>
    <div onClick = {()=>handleGetProductDetails(product?._id)} className='' >
      <div className='relative overflow-hidden'>
          <img
          src={product?.image[0]}
          alt={product?.title}
          className='w-full h-[300px] object-cover rounded-lg transition-transform duration-150 ease-out hover:scale-105 md:ease-in hover:rounded-lg '
          />
          {
            product?.totalStock ===0?
            (<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 ">
                Out Of Stock
            </Badge>) : product?.totalStock <10 ? (<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 ">
                {`Only ${product?.totalStock} items left`}
            </Badge> ): 
            product?.salePrice>0 ?(<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 ">
                Sale
            </Badge>)
            :null
          }
      </div>
      <CardContent className="p-4">
        <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
        <div className='flex justify-between items-center mb-2'>
         <span className='text-sm text-muted-foreground'>{categoryOptionMap [product?.category]}</span>
         <span className='text-sm text-muted-foreground'>{brandOptionMap [product?.brand]}</span>
        </div>

        <div className='flex justify-between items-center mb-2'>
        <span className={`${product?.salePrice>0 ? 'line-through': ''} text-lg font-semibold text-primary`}>
              ₹{product?.price}
            </span>
         {
          product?.salePrice > 0 ?<span className='text-lg font-semibold text-primary'>₹{product?.salePrice}</span>
           : null
         }
         
        </div>

      </CardContent>
      
      </div>
      <CardFooter className="  ">
        {
          product?.totalStock === 0 ?
          <Button className="w-full bg-black text-white opacity-60 cursor-not-allowed group-hover:opacity-100   opacity-0 transition-opacity duration-500  ">
          Out Of Stock
        </Button>:
        <Button onClick={()=>handleAddToCart(product?._id, product?.totalStock)} className="w-full bg-black text-white   group-hover:opacity-100   opacity-0 transition-opacity duration-500 ">
        Add to cart
      </Button>
        }
        
      </CardFooter>

   </Card >
  )
}

export default ShoppingProductTile

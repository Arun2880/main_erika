import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";
import details1 from "../../assets/detail1.png";
import details2 from "../../assets/detail2.png";
import details3 from "../../assets/detail3.png";
import details4 from "../../assets/detail4.png";
import details5 from "../../assets/detail5.png";
import detailss1 from "../../assets/1.png";
import detailss2 from "../../assets/2.png";
import detailss3 from "../../assets/3.png";
import detailss4 from "../../assets/4.png";
import detailss5 from "../../assets/5.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const images = productDetails?.image || [];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { reviews } = useSelector((state) => state.shopReview);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);


  console.log("productDetails",productDetails);

  const details = [
    { id: "detail1", image: details1, label: "Ready to use Mehendi cone" },
    { id: "detail2", image: details2, label: "Skin-friendly" },
    {
      id: "detail3",
      image: details3,
      label: "essential oils such as eucalyptus & clove",
    },
    { id: "detail4", image: details4, label: "Gives rich dark stain" },
    { id: "detail5", image: details5, label: "Long lasting henna stain" },
  ];

  const detailss = [
    {
      id: "details1",
      image: detailss1,
      label: "It moisturizes and nourishes your hair",
    },
    {
      id: "details2",
      image: detailss2,
      label: "Strengthen hair & repairs split",
    },
    {
      id: "details3",
      image: detailss3,
      label: "100% natural henna powder free from artificial ingredient",
    },
    {
      id: "details4",
      image: detailss4,
      label:
        "It is multipurpose, it can be used for mehendi designs on hands & feet, or can colour your hair too",
    },
    {
      id: "details5",
      image: detailss5,
      label: "Conditions hair & Makes them soft and silky",
    },
  ];

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);  // Set first image when available
      setCurrentIndex(0);
    }
  }, [images]);





  function handleAddToCart(getCurrentId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentIitem = getCartItems.findIndex(
        (item) => item?.productId?._id === getCurrentId
      );

      if (indexOfCurrentIitem > -1) {
        const getQuantity = getCartItems[indexOfCurrentIitem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({ userId: user?.id, productId: getCurrentId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItem(user?.id));
        toast({
          title: "Product Added to Cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review Added Successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

      const handleThumbnailClick = (index) => {
        setSelectedImage(images[index]);
        setCurrentIndex(index);
      };
    
      const handlePrev = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
      };
    
      const handleNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
      };



  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[80vw] lg:max-w-[70vw] bg-white text-black  max-h-[80vh] max-w-[90vw]  overflow-y-auto">
        <div className="grid grid-cols-1 gap-8 sm:p-12 md:grid-cols-2 lg:grid-cols-2  ">
          <div className="relative overflow-hidden rounded-lg">
          <img
          src={selectedImage}
          alt="Product"
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
        {/* Thumbnail Gallery */}
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {images.map((img, index) => ( 
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
              index === currentIndex ? "border-black" : "border-gray-300"
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      
          </div>
          <div className="  sm:max-w-[80vw] lg:max-w-[70vw] bg-white text-black">
            <div>
              <h1 className="text-3xl font-extrabold">
                {productDetails?.title}
              </h1>
              <p className="text-muted-foreground text-2xl mb-5 mt-4">
                {productDetails?.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p
                className={`text-3xl line-through font-bold text-primary ₹{productDetails?.salePrice > 0 ? "":""}`}
              >
                ₹{productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-muted-foreground">
                  ₹{productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview} />
              </div>
              <span className="text-muted-foreground">
                ({averageReview.toFixed(1)})
              </span>
            </div>
            <div className="mt-5 mb-5">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full bg-black text-white opacity-60 cursor-not-allowed">
                  Out Of Stock
                </Button>
              ) : (
                <Button
                  className="w-full bg-black text-white"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>

            <Separator />
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="grid gap-6">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div className="flex gap-4" key={reviewItem.id}>
                      <Avatar>
                        <AvatarFallback className="w-10 h-10 border">
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent
                            rating={reviewItem?.reviewValue}
                          />
                        </div>
                        <p className="text-muted-foreground">
                          {reviewItem?.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No Reviews</h1>
                )}
              </div>
              <div className="mt-10 flex-col flex gap-1">
                <Label>Write a review</Label>
                <div className="flex">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                />
                <Button
                  onClick={handleAddReview}
                  className="bg-black text-white"
                  disabled={reviewMsg.trim() === ""}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultValue='ProductDetails'>
        
              <TabsList>
              
                <TabsTrigger value="ProductDetails">
                  Product Details
                </TabsTrigger>

               
                <TabsTrigger value="ProductFeature">
                 How To Use
                </TabsTrigger>
               
              </TabsList>
              <TabsContent value ="ProductDetails">
              <div className="px-3 border-2 border-black rounded-2xl py-3">
          {productDetails?.category === "mehendi" ? (
            <h1 className="text-[20px] font-bold  bg-white text-center ">
              Product Details
            </h1>
          ) : productDetails?.category === "harecare" ? (
            <h1 className="text-[20px] font-bold  bg-white text-center ">
              Product Details
            </h1>
          ) : null}
          <p>{productDetails?.detail}</p>
        </div>
              </TabsContent>
              
              <TabsContent value ="ProductFeature">
              <div className="px-3 border-2 border-black rounded-2xl py-3">
          {productDetails?.category === "mehendi" ? (
            <h1 className="text-[20px] font-bold  bg-white text-center ">
              How to Use
            </h1>
          ) : productDetails?.category === "harecare" ? (
            <h1 className="text-[20px] font-bold  bg-white text-center ">
              How to Use
            </h1>
          ) : null}
          <p>{productDetails?.benefits}</p>
        </div>

              </TabsContent>
            </Tabs>

        <div className="border-2 border-black rounded-2xl py-3">
          {productDetails?.category === "mehendi" ? (
            <h1 className="text-[20px] font-bold  bg-white text-center ">
              Product Feature
            </h1>
          ) : productDetails?.category === "harecare" ? (
            <h1 className="text-[20px] font-bold  bg-white text-center ">
              Product Feature
            </h1>
          ) : null}
          <div className="flex flex-wrap w-full bg-white px-3  ">
            {productDetails?.category === "mehendi"
              ? details.map((detail) => (
                  <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mt-4 mb-4">
                    <div className=" flex flex-col items-center justify-center w-full ">
                      <img
                        src={detail.image}
                        alt=""
                        className="h-[50px] w-[50px]"
                      />
                    </div>
                    <p className="text-center">{detail.label}</p>
                  </div>
                ))
              : productDetails?.category === "harecare"
              ? detailss.map((details) => (
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4  mt-4 mb-4">
                    <div className=" flex flex-col items-center justify-center w-full ">
                      <img
                        src={details.image}
                        alt=""
                        className="h-[50px] w-[50px]"
                      />
                    </div>
                    <p className="text-center">{details.label}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;

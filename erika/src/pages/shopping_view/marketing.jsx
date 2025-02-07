import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const MarketingBanner = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleClick = () => {
    navigate("/shop/Listing"); // Correct path for navigation
    window.scrollTo(0, 0);
  };
  
  const handleClick2  = ()=>{
    navigate( "/shop/about");
    window.scrollTo(0, 0);
  }

  return (
    <div className="bg-[#007000] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:flex lg:items-center lg:justify-between">
        {/* Left Section: Title and Description */}
        <div className="mb-6 lg:mb-0 mx-3">
          <h2 className="text-4xl font-bold mb-4">
            Elevate Your Haircare and Skincare Routine with Our Expert Solutions.
          </h2>
          <p className="text-lg text-green-200">
            Discover expert-crafted tools and strategies to enhance your  care and skincare routine, attract more confidence, and achieve radiant results effortlessly.
          </p>
        </div>

        {/* Right Section: Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Button with navigate functionality */}
          <Button
            onClick={handleClick}
            className="px-6 py-3 bg-white text-green-600 font-medium rounded-md shadow hover:bg-green-100 transition"
          >
            Get Started
          </Button>
          {/* Learn More Anchor */}
          <Button
            
            className="px-6 py-3 bg-green-700 font-medium rounded-md hover:bg-green-800 transition" onClick={handleClick2}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketingBanner;

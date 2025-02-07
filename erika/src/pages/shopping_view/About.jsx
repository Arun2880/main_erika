import React, { useEffect, useState } from "react";
import about from "../../assets/ran 01.jpg";
import about2 from "../../assets/shampoo-01.jpg";
import about3 from "../../assets/bna 01.png";
import about4 from "../../assets/an 2.jpg";
import about5 from "../../assets/bna03.png";
import about6 from "../../assets/b 1.jpg";
import about7 from "../../assets/an3.png";
import about8 from "../../assets/bn 4 (1).jpg";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { flip } from "@/variants";
const About = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const testimonials = [
    { 
      id: 1,
      name: "John Doe",
      text: "This product changed my life! Highly recommend it to everyone.",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Jane Smith",
      text: "Amazing quality and fantastic customer service. Will buy again!",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Sam Wilson",
      text: "A game-changer in the industry. I can’t imagine my life without it.",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "Lisa Brown",
      text: "Exceptional experience! The team went above and beyond to help me.",
      image: "https://via.placeholder.com/100",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Product 1",
      image: about3,
      price: "$10.00",
    },
    {
      id: 2,
      name: "Product 2",
      image: about4,
      price: "$20.00",
    },
    {
      id: 3,
      name: "Product 3",
      image: about5,
      price: "$30.00",
    },
    {
      id: 4,
      name: "Product 4",
      image: about6,
      price: "$40.00",
    },
    {
      id: 5,
      name: "Product 5",
      image: about7,
      price: "$50.00",
    },
    {
      id: 6,
      name: "Product 6",
      image: about8,
      price: "$50.00",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4; // Number of items to show at a time

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= products.length ? 0 : prevIndex + itemsToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsToShow < 0
        ? Math.max(products.length - itemsToShow, 0)
        : prevIndex - itemsToShow
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  const [currentIndex1, setCurrentIndex1] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000); // Change testimonials every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="relative w-full h-[auto] lg:h-[500px] overflow-hidden  bg-no-repeat bg-center">
        <img src={about} alt="" className="w-full h-full object-cover " />
      </div>

      <div className="flex lg:flex-row flex-col justify-center align-items-center mt-5 pt-6 mb-5 pb-6 px-3">
        <div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className=" flex-auto  mt-6 justify-center p-5"
        >
          <img src={about2} alt="" className="bg-contain w-[90%] mx-auto rounded-lg" />
        </div>
        <div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="flex-auto  mt-6"
        >
          <h1 className="text-3xl font-bold font-serif">About Us</h1>
          <p className="mt-8 font-serif">
            <h2 className="text-xl font-medium font-serif">
              Erika Heena Herbal & Mamta Gold Natural Products
            </h2>
            At Sampat Raj and Company, our commitment to quality is unwavering.
            We prioritize excellence in every aspect of our business, from the
            careful selection of 100% natural ingredients to our innovative
            research and development, and meticulous manufacturing processes.
            This dedication ensures that every product we offer is of the
            highest standard, providing our customers with the best natural hair
            color and mehendi cones.
          </p>
          <p className="mt-5 font-serif">
            Our flagship products, Mamta Gold and Erika Henna Herbal Hair Color,
            are celebrated for their purity and effectiveness. Mamta Gold
            mehendi is a traditional favorite, known for its rich color and
            natural ingredients. Erika Henna Herbal Hair Color is a
            revolutionary product that offers a safe, natural, and vibrant
            alternative to chemical hair dyes.
          </p>

          <p className="mt-5 font-serif">
            As we look to the future, Sampat Raj and Company is excited about
            expanding our product range and further establishing ourselves as
            leaders in the industry. Our vision is to continue providing natural
            beauty solutions that are not only effective but also
            environmentally friendly and sustainable.
          </p>
        </div>
      </div>
      <div className="relative w-full  mx-auto">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-none w-1/3 p-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full  object-cover bg-contain"
                />
               
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>
      <div className="mx-5 my-6">
        <h2 className="text-3xl font-bold mt-5 justify-center text-center">
          Why Choose Us
        </h2>
        <div className="flex lg:flex-row flex-col gap-6">
          <div
            variants={flip}
            initial="initial"
            whileInView={"animate"}
            exit="exit"
            className="flex-auto mt-6 lg:w-1/2 sm:w-full rounded-2xl bg-green-200 px-4 py-6 shadow-2xl transition-all duration-300 hover:bg-green-500 hover:shadow-3xl hover:scale-105"
          >
            <h2 className="text-2xl font-md">
              Inspiring Confidence through Natural Beauty
            </h2>
            <p className="mt-8">
              Our vision revolves around inspiring confidence through natural
              beauty. Mamta Gold and our herbal henna-based hair color empower
              individuals to embrace their natural beauty. Committed to quality
              and innovation, we redefine beauty standards and foster a sense of
              confidence in our users.
            </p>
          </div>
          <div
            variants={flip}
            initial="initial"
            whileInView={"animate"}
            exit="exit"
            className=" flex-auto mt-6 lg:w-1/2 sm:w-full rounded-2xl bg-green-200 px-4 py-6 shadow-2xl transition-all duration-300 hover:bg-green-500 hover:shadow-3xl hover:scale-105"
          >
            <h2 className="text-2xl font-md">
              Cultivating Excellence & Efficiency
            </h2>
            <p className="mt-8">
              Nurtured by the rich soil of Sojat, Rajasthan, our cultivation of
              Mamta Gold and the development of herbal henna-based hair color
              are synonymous with excellence. Erika Henna Herbal Pvt. Ltd. has
              become a trusted name, offering premium products that celebrate
              the beauty of natural ingredients. Equally important is
              efficiency. Time is a valuable resource, and maximizing
              productivity is key to achieving our goals effectively.
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col  gap-6">
          <div 
        variants={flip}
        initial="initial"
        whileInView={ 'animate'}
        exit="exit" className=" flex-auto mt-6 lg:w-1/2 sm:w-full rounded-2xl bg-green-200 px-4 py-6 shadow-2xl transition-all duration-300 hover:bg-green-500 hover:shadow-3xl hover:scale-105">
            <h2 className="text-2xl font-md">Sustainability Initiatives</h2>
            <p className="mt-8">
              We highlight our commitment to sustainability through eco-friendly
              packaging and environmentally responsible practices. Our marketing
              efforts emphasize the natural and ethical aspects of our products,
              appealing to conscientious consumers.
            </p>
          </div>
          <div
  variants={flip}
  initial="initial"
  whileInView="animate"
  exit="exit"
  className="flex-auto mt-6 lg:w-1/2 sm:w-full rounded-2xl bg-green-200 px-4 py-6 shadow-2xl transition-all duration-300 hover:bg-green-500 hover:shadow-3xl hover:scale-105"
>
  <h2 className="text-2xl font-md">Customer Engagement</h2>
  <p className="mt-8">
    Our focus on customer engagement involves interactive campaigns,
    loyalty programs, and personalized experiences. We listen to our
    customers' feedback and continuously adapt our strategies to meet
    their evolving needs.
  </p>
</div>

        </div>
      </div>

      <div className="relative w-full lg:max-w-3xl sm:mx-w-lg mx-auto mt-10">
        <h1 className="text-center font-bold text-4xl">Testimonials</h1>
        <div className="flex transition-transform duration-500 ease-in-out mt-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex-none w-full p-4 ${
                index === currentIndex1 ? "block" : "hidden"
              }`}
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default About;

import React, { useState } from "react";
import logo from "../../assets/logo erika.png";
import { Facebook, FacebookIcon, Instagram, InstagramIcon } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { shoppingViewHeaderMenuItems } from "@/config";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newKeyword, setNewKeyword] = useState("");

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search" &&
      getCurrentMenuItem.id !== "about" &&
      getCurrentMenuItem.id !== "contact"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("Listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
      window.scrollTo(0, 0);
  }

  return (
    <div className="conatainer   bg-white py-7 px-7 ">
      <div className="w-[calc(100%_-_32px)] h-auto bg-opacity-10 bg-green-700  mx-4 px-auto lg:justify-between px-10 py-[30px] rounded-2xl">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex align-items-center justify-center mt-20">
            <img
              src={logo}
              alt=""
              className="h-50 w-200 lg:h-[130px] lg:w-[350px] md:w-[250px] md:h-[125px]"
            />
          </div>
          <div className="w-full lg:w-1/2 mt-20">
            <p className="font-serif">
              "Since our inception in{" "}
              <span className="font-bold">1988, Sampat Raj & Company </span> has
              flourished as a distinguished cultivator, manufacturer, and
              exporter of Mamta Gold and herbal henna-based hair color. Rooted
              in the vibrant town of{" "}
              <span className="font-bold">Sojat, Rajasthan, </span> our journey
              is a testament to our deep passion for natural beauty."
            </p>
            <div className="flex gap-6 mt-8">
              <h1 className="font-bold text-[30px]">Follow Us</h1>
              <div className="flex h-12 w-12 rounded-full border-[2px] justify-center items-center bg-white  hover:bg-[#007000] hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <a
                  href={"https://www.facebook.com/..."}
                  className="shadow-2xl shadow-green-600"
                  target="blank"
                >
                  <FacebookIcon />
                </a>
              </div>
              <div className="flex h-12 w-12 rounded-full border-[2px] justify-center items-center bg-white shadow-2xl hover:bg-[#007000] hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <a
                  href={"https://www.instagram.com/..."}
                  className="shadow-2xl shadow-green-600"
                  target="blank"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-5">
          <div className="w-full lg:w-1/2 justify-between px-2 lg:px-10 flex flex-col lg:flex-row">
            <div className="mt-4 flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Quick Links</h1>
              {shoppingViewHeaderMenuItems.map((menuItem) => (
                <p
                  onClick={() => handleNavigate(menuItem)}
                  className="text-[15px] cursor-pointer hover:text-[#007000]"
                  key={menuItem.id}
                >
                  {menuItem.label}
                </p>
              ))}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold">Contact Us</h1>
              <ul>
                <li>
                  <a
                    href="mailto:erikahennaherbal@gmail.com"
                    className="hover:text-[#007000] active:text-[#007000]"
                  >
                    Erikahennaherbal@gmail.com
                  </a>
                </li>
                <li>
                  SH-58, Dhinawas Road,
                  <br /> Sojat, Rajasthan Zip Code-306104
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2 justify-between px-2 pb-5">
            <hr className="h-[2px] w-full mt-6 bg-black" />
            <h5 className="text-center">
              © 2024 Powered by{" "}
              <a
                className="active:text-white hover:text-[#007000] font-bold"
                href="https://dreambytesolution.com"
                target="blank"
              >
                Dream Byte Solutions
              </a>{" "}
              Private Limited
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

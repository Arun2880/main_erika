import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Logout } from "@/store/auth-slice";
import logo from "../../assets/logo erika.png";
import {
  CircleUserRound,
  HousePlug,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import UserCartWrapper from "./cart-wrappper";
import { fetchCartItem } from "@/store/shop/cart-slice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function MenuItems({ closeMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter = ![
      "home",
      "products",
      "search",
      "about",
      "contact",
    ].includes(getCurrentMenuItem.id)
      ? { category: [getCurrentMenuItem.id] }
      : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("Listing") && currentFilter !== null) {
      setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      );
    } else {
      navigate(getCurrentMenuItem.path);
      window.scrollTo(0, 0);
      closeMenu(); // Close the menu after navigation
    }
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row flex-col-reverse">
      <div className="flex flex-col gap-4 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Label
            key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer hover:text-[#007000] text-black"
          >
            {menuItem.label}
          </Label>
        ))}
      </div>
    </nav>
  );
}

function HeaderRightContent({closeMenu}) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // State to control search input visibility
  const [newKeyword, setNewKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItem(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (newKeyword && newKeyword.trim().length > 3) {
      localStorage.setItem("sendKeyword", newKeyword);
      navigate("/shop/search");
      window.scrollTo(0, 0);
    }
  }, [newKeyword]);

  function handleLogout() {
    dispatch(Logout());
    navigate("/shop/home");
    window.scrollTo(0, 0);
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-row justify-around gap-4">
      {/* Search Section */}
      <div className="relative">
        {showSearch ? (
          <div className="flex items-center bg-[#007000] px-1 py-1 rounded-md">
            <Input
              value={newKeyword}
              className="border-none"
              name="keyword"
              onChange={(event) => setNewKeyword(event.target.value)}
              placeholder="Search Products..."
              autoFocus
            />
            <Search
              className="w-8 h-8 mx-2 text-white font-bold cursor-pointer flex items-center justify-center"
              onClick={() => setShowSearch(false)} // Hide search input on clicking the icon
            />
          </div>
        ) : (
          <Search
            className="w-8 h-8 text-[#007000] cursor-pointer font-bold cursor-pointer flex items-center justify-center"
            onClick={() => setShowSearch(true)} // Show search input on clicking the icon
          />
        )}
      </div>

      {/* Cart Section */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          className="relative border-none"
          variant="outline"
          size="icon"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className="w-6 h-6 text-[#007000] border-none"  />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm text-[#007000]">
            {user?.id ? cartItems?.items?.length || 0 : 0}
          </span>
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      {/* User Section */}
      {user?.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarFallback className="bg-[#007000] text-white font-extrabold font-serif cursor-pointer">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 bg-white">
            <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/shop/account");
                window.scrollTo(0, 0);
              }}
            >
              <User className="mr-2 h-4 w-4" /> Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 lg:hidden" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="text-white bg-[#007000] shadow-2xl shadow-green-500"
          onClick={() => {navigate("/auth/login")
            window.scrollTo(0, 0);
          }}
        >
          LogIn
        </Button>
      )}
    </div>
  );
}

const Shop_header = () => {
  
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track the menu's open state

 
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:py-6">
        {/* Logo Section */}
        <Link
          to="/shop/home"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)} // Close menu on logo click
        >
          <img src={logo} alt="logo" className="h-[55px] w-[155px]" />
        </Link>

        {/* Mobile/Tablet View Sheet */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(true)} // Open the menu
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs bg-white text-black flex flex-col h-full"
          >
            {/* Top Section: Search and Cart Icons */}
            <div className="flex flex-col gap-4">
              <HeaderRightContent className="flex" closeMenu={() => setIsMenuOpen(false)} />
            </div>

            {/* Middle Section: Menu Items */}
            <MenuItems closeMenu={() => setIsMenuOpen(false)} />

            {/* Bottom Section: Login Button */}
          </SheetContent>
        </Sheet>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default Shop_header;

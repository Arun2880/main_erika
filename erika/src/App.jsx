import { Route, Routes } from 'react-router-dom';
import Layout from './component/auth/Layout';
import Login from './pages/auth/login'; // Ensure the filename matches case sensitivity
import Register from './pages/auth/register';
import Admin_view from './component/admin_view/layout';
import Dashboard from './pages/auth/admin_View/Dashboard';
import Products from './pages/auth/admin_View/Products';
import Order from './pages/auth/admin_View/Order';
import Features from './pages/auth/admin_View/Features';
import Shop_Layout from './component/shopping_view/layout';
import Not_found from './pages/auth/not_found';
import Home from './pages/shopping_view/Home';
import Account from './pages/shopping_view/Account';
import Listing from './pages/shopping_view/Listing';
import Checkout from './pages/shopping_view/Checkout';
import Check_auth from './component/common/Check_auth';
import Unauth_page from './pages/auth/unauth_page/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from './pages/shopping_view/paypal-return';
import PaymentSuccess from './pages/shopping_view/payment-success';
import SearchProducts from './pages/shopping_view/search';
import About from './pages/shopping_view/about';
import Contact from './pages/shopping_view/Contact';
import Influencer from './pages/auth/admin_View/Influencer';
import Show_Influencer from './pages/auth/admin_View/Show_Influencer';
import CancelOrder from './pages/auth/admin_View/CancelOrder';





function App() {
 

  const {user , isAuthenticated, isLoading} =useSelector((state)=> state.auth);
  

console.log(" dgdfgft", isAuthenticated,user);
 
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);


  if(isLoading)
    return <Skeleton className="w-[800px] bg-black h-[600px] " />
  ;

  console.log("glkkl;kl",isLoading, user);
    
  return (
    <div className=' flex flex-col  bg-white-foregroung'>
    <Routes>
      <Route
      path='/'
      element={<Check_auth  isAuthenticated={isAuthenticated} user={user}></Check_auth>}
      
      />
    
      <Route path="/auth" element={<Check_auth  isAuthenticated={isAuthenticated} user={user}><Layout/></Check_auth>}>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register/>} />
      </Route>
      <Route path="/admin" element={<Check_auth isAuthenticated={isAuthenticated} user={user}><Admin_view/></Check_auth>}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="roduct" element={<Products />} />
      <Route path="order" element={<Order />} />
      <Route path="features" element={<Features />} />
      <Route path="influencer" element={<Influencer />} />
      <Route path="showinfluencer" element={<Show_Influencer />} />
      <Route path="cancel" element={<CancelOrder />} />
      
      </Route>
      <Route path="/shop" element={<Shop_Layout/>}>
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="account" element={<Account />} />
      <Route path="listing" element={<Listing />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="paypal-return" element={<PaypalReturnPage />} />
      <Route path="payment-success" element={<PaymentSuccess/>} />
      <Route path="search" element={<SearchProducts/>} />
      <Route path="contact" element={<Contact/>} />
      </Route>
      <Route path="*" element={<Not_found/>}></Route>
      <Route path="/unauth-page" element={<Unauth_page/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
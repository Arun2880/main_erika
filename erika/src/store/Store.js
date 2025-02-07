import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import AdminProductSlice from './admin/products-slice'
import AdminOrderSlice from './admin/orders-slice'
import shopProductSlice from './shop/products-slice'
import ShoppingCartSlice from './shop/cart-slice'
import addressSlice from './shop/address-slice';
import shoppingOrderSlice from './shop/order-slice';
import searchSlice from "./shop/search"
import reviewSlice from './shop/review-slice';
import commonSlice from "./common"
import influencerSlice from "./admin/influencer"



// Create and configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : AdminProductSlice,
    adminOrder : AdminOrderSlice,
    shopProducts : shopProductSlice,
    shoppingCart : ShoppingCartSlice ,
    shopAddress :  addressSlice,
    shopOrder : shoppingOrderSlice,
    shopSearch : searchSlice,
    shopReview : reviewSlice,
    commonFeature : commonSlice,
    influencer : influencerSlice,

  }
});

export default store;
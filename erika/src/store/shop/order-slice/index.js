import axios from "axios";

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalURL : null,
  isLoading: false,
  orderId: null,
  orderList : [],
  orderDetails : null,
  cancelReason: null,

};

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async(orderData)=>{
 const response = await axios.post(`http://localhost:5000/api/shop/order/create`, orderData);

 console.log("orderrr dataa:", orderData);

 return response.data;
})


export const CapturePayment = createAsyncThunk('/order/CapturePayment', async({payerId,paymentId, orderId})=>{
  const response = await axios.post(`http://localhost:5000/api/shop/order/capture`, {payerId,paymentId, orderId,});
 
 
  return response.data;
 })
 
export const getAllOrdersByUser = createAsyncThunk('/order/getAllOrdersByUser', async(UserId)=>{
  const response = await axios.get(`http://localhost:5000/api/shop/order/list/${UserId}`);

  console.log("get all orders by user", UserId);
   


 
 
 
  return response.data;
 })

 export const getOrderDetails = createAsyncThunk('/order/getOrderDetails', async(id)=>{
  const response = await axios.get(`http://localhost:5000/api/shop/order/details/${id}`);
 
 
  return response.data;
 })

 export const deleteOrder = createAsyncThunk('/order/delete', async(id)=>{
  const response = await axios.delete(`http://localhost:5000/api/shop/order/delete/${id}`);
  return response.data;

 })

 export const cancellReason = createAsyncThunk('/order/reason', async({userId, reason, payementStatus})=>{
 const response = await axios.post ('http://localhost:5000/api/shop/order/delete/reason',{userId, reason, payementStatus})
 return response.data;
 })

 

const shoppingOrderSlice = createSlice({
  name : 'shoppingOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state)=>{
      state.orderDetails = null;
    }
  },
  extraReducers: (builder)=>{ 
    builder.addCase(createNewOrder.pending, (state)=>{
      state.isLoading = true;
    }).addCase(createNewOrder.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.approvalURL = action.payload.approvalURL;
      state.orderId = action.payload.orderId;
      sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId));
    }).addCase(createNewOrder.rejected, (state)=>{
      state.isLoading = false;
      state.approvalURL = null;
      state.orderId = null;
    }).addCase(getAllOrdersByUser.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(getAllOrdersByUser.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.orderList = action.payload.data;
    })
    .addCase(getAllOrdersByUser.rejected, (state)=>{
      state.isLoading = false;
      state.orderList= [];
    }).addCase(getOrderDetails.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(getOrderDetails.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.orderDetails = action.payload.data;
    })
    .addCase(getOrderDetails.rejected, (state)=>{
      state.isLoading = false;
      state.orderDetails= null;
    }).addCase(cancellReason.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(cancellReason.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.cancelReason = action.payload.data;
    })
    .addCase(cancellReason.rejected, (state)=>{
      state.isLoading = false;
      state.cancelReason= null;
    })
  },
 
});

export const {resetOrderDetails} = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
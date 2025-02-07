import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews : []
}



export const addReview = createAsyncThunk('/order/addReview', async({productId, userId,userName,reviewMessage, reviewValue})=>{
  const response = await axios.post(`https://erikahennaherbal.com/api/shop/review/add`, {productId, userId,userName,reviewMessage, reviewValue}); 
 
  return response.data;
 })

 export const getReviews = createAsyncThunk('/order/getReviews', async(id)=>{
  const response = await axios.get(`https://erikahennaherbal.com/api/shop/review/${id}`); 
 
  return response.data;
 })
 
 


const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{

    builder.addCase(getReviews.pending, (state)=> {
      state.isLoading = true;
    }).addCase(getReviews.fulfilled, (state,action)=> {
      state.isLoading = false;
      state.reviews = action.payload.data
    }).addCase(getReviews.rejected, (state)=> {
      state.isLoading = false;
      state.reviews = [];
    });
  }
})


export default reviewSlice.reducer;
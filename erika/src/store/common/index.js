import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { useEffect } from "react";


const initialState = {
  isLoading : false,
  featureImageList: []
}


export const getFeatureImage = createAsyncThunk('/order/getFeatureImage', async()=>{
  const response = await axios.get(`http://localhost:5000/api/common/feature/get`); 
 
  return response.data;
 })
 

 export const addFeatureImage = createAsyncThunk('/order/addFeatureImage', async(image)=>{
  const response = await axios.post(`http://localhost:5000/api/common/feature/add`, {image}); 
 
  return response.data;
 })

 export const fetureImageDelete = createAsyncThunk('/order/fetureImageDelete', async(_id)=>{
  const response = await axios.delete(`http://localhost:5000/api/common/feature/delete/${_id}`, {_id}); 
 
  return response.data;
 })



const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getFeatureImage.pending,(state)=>{
      state.isLoading = true;
    }).addCase(getFeatureImage.fulfilled,(state, action)=>{
      state.isLoading = false;
      state. featureImageList= action.payload.data;
    }).addCase(getFeatureImage.rejected,(state)=>{
      state.isLoading = false;
      state.getFeatureImage = []
    })
  }

})




export default commonSlice.reducer;
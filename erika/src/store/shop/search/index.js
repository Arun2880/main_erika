import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { useEffect } from "react";


const initialState = {
  isLoading : false,
  searchResults: []
}


export const getSearchReasults = createAsyncThunk('/order/getSearchReasults', async(keyword)=>{
  const response = await axios.get(`https://erikahennaherbal.com/api/shop/search/${keyword}`); 
 
  return response.data;
 })
 


const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    resetSearchResults:(state)=>{
      state.searchResults = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchReasults.pending,(state)=>{
      state.isLoading = true;
    }).addCase(getSearchReasults.fulfilled,(state, action)=>{
      state.isLoading = false;
      state. searchResults= action.payload.data;
    }).addCase(getSearchReasults.rejected,(state)=>{
      state.isLoading = false;
      state.searchResults = []
    })
  }

})

export const {resetSearchResults} =  searchSlice.actions;


export default searchSlice.reducer;
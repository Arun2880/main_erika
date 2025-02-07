import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  isLoading: false,
  influencerList: [],
  influencerProfit: [],
  influencerDetails: null,
  error: null, 
  refferalDetail: null,
  verifyEmail: null,
  fetchReason: null,  
};
 
// Async thunk to add an influencer
export const addInfluencer = createAsyncThunk(
  'influencer/add', // Updated action name for clarity
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://erikahennaherbal.com/api/admin/influencer/add', formData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle missing response gracefully
    }
  }
);

export const getInfluencerList = createAsyncThunk('influencer/get', async()=>{
  try {
    const response = await axios.get('https://erikahennaherbal.com/api/admin/influencer/get')
    return response.data;
  
  }
  catch(error){
    return error.message
  }
} )

export const singleInfluencer= createAsyncThunk('singleInflueincer/details', async(influencerId)=>{
  try{
    const response = await axios.get(`https://erikahennaherbal.com/api/admin/influencer/details/${influencerId}`);
 
    return response.data;
  }
  catch(error){
    return error.message
  }
})

export const verifyrefferal = createAsyncThunk('verify/refferal', async(refferal)=>{
  
  try{
 const response = await axios.post('https://erikahennaherbal.com/api/shop/refferal/verify',{ refferal});
 return response.data;
   
  }
  catch(error){
    return error.message
  }
})

export const verifyEmailInFluencer = createAsyncThunk('verify/email', async(email)=>{
  
  try{
 const response = await axios.post('https://erikahennaherbal.com/api/shop/refferal/verify/email',{ email});
 return response.data;
   
  }
  catch(error){
    return error.message
  }
})


export const fetchRefferal = createAsyncThunk('fetch/refferal', async(referral)=>{
  
  try{
 const response = await axios.post('https://erikahennaherbal.com/api/shop/refferal/fetch',{referral});
 return response.data;
   
  }
  catch(error){
    return error.message
  }
})

export const fetchReason = createAsyncThunk('influencer/reason', async()=>{
  try {
    const response = await axios.get('https://erikahennaherbal.com/api/admin/influencer/get/reason')
    return response.data;
  
  }    
  catch(error){
    return error.message
  }
} )



// Create the slice
const influencerSlice = createSlice({
  name: 'influencer',
  initialState,
  reducers: {
    resetInfluencerDetails:(state)=>{
      state.influencerDetails= null
    },
    resetRefferalDetails:(state)=>{
      state.influencerDetails= null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addInfluencer.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(addInfluencer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.influencerList.push(action.payload); 
      })
      .addCase(addInfluencer.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
        console.error("Failed to add influencer:", action.payload); 
      })
      .addCase(getInfluencerList.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(getInfluencerList.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.influencerList = action.payload.data; 
      })
      .addCase(getInfluencerList.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
        
      })
      .addCase(singleInfluencer.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(singleInfluencer.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.influencerDetails = action.payload.data; 
      })
      .addCase(singleInfluencer.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
        
      }).addCase(verifyrefferal.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(verifyrefferal.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.refferalDetail = action.payload.data; 
      })
      .addCase(verifyrefferal.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
        
      }).addCase(verifyEmailInFluencer.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(verifyEmailInFluencer.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.verifyEmail = action.payload.data; 
      })
      .addCase(verifyEmailInFluencer.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
        
      }).addCase(fetchRefferal.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(fetchRefferal.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.influencerProfit = action.payload.data; 
      })
      .addCase(fetchRefferal.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
        
      }).addCase(fetchReason.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(fetchReason.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.fetchReason = action.payload.data; 
      })
      .addCase(fetchReason.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
        
      });
  },
});

// Export actions (none in this case, but you could add any other reducers if needed)
export const {resetInfluencerDetails,resetRefferalDetails} = influencerSlice.actions;

// Export the reducer to be used in the store
export default influencerSlice.reducer;  

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  profile: [],
};

// Fetch user profile
export const getUserProfile = createAsyncThunk(
  '/order/getUserProfile',
  async (_id) => {
    const response = await axios.get(`http://localhost:5000/api/common/profile/${_id}`);
    return response.data;
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  '/order/updateUserProfile',
  async ({ _id, username, email }) => {  // Corrected parameter destructuring
    const response = await axios.put(`http://localhost:5000/api/common/profile/update/${_id}`, {
      username, // Use the correct object structure
      email,
    });
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload; // Adjusted to directly assign payload
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.profile = [];
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true; // Optional: handle loading state for update
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // You can update the profile directly here if needed
        state.profile = action.payload; // Or merge with existing profile
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false; // Optional: handle errors here
      });
  },
});

export const { resetProfileSlice } = profileSlice.actions;

export default profileSlice.reducer;

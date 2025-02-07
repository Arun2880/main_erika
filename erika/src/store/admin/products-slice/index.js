import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import  axios  from "axios"



const initialState = {
  isLoading : false,
  products : [],
};

export const addProduct = createAsyncThunk('/products/addnewproduct', async (FormData) =>{
  const result = await axios.post(`https://erikahennaherbal.com/api/admin/products/add`, FormData,{
    headers:{
      'Content-Type' : 'application/json'
    }

  } )
  return result?.data;
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () =>{
  const result = await axios.get(`https://erikahennaherbal.com/api/admin/products/get` );
  return result?.data;
})

export const editProduct = createAsyncThunk('/products/editProduct', async ({id, formData}) =>{
  const result = await axios.put(`https://erikahennaherbal.com/api/admin/products/edit/${id}`, formData,{
    headers:{
      'Content-Type' : 'application/json'
    }

  } )
  
  return result?.data;
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) =>{
 
  const result = await axios.delete(`https://erikahennaherbal.com/api/admin/products/delete/${id}`, FormData,{
    headers:{
      'Content-Type' : 'application/json'
    }

  } )
  return result?.data;
})


const AdminProductSlice = createSlice({
  name: 'adminProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchAllProducts.pending, (state)=>{
      state.isLoading = true;
    }).addCase(fetchAllProducts.fulfilled, (state, action)=>{

      

      state.isLoading = false
      state.productList = action.payload.data;
    }).addCase(fetchAllProducts.rejected, (state, action)=>{


      state.isLoading = false
      state.productList = []
    })

  },
})


export default AdminProductSlice.reducer;
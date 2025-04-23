import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const sendCategoryForm = createAsyncThunk(
  '/send/category', 
  async (formData) => {
    try {
      const response = await axios.post('https://northwind.vercel.app/api/categories', formData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    formStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendCategoryForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.formStatus = 'loading';
      })
      .addCase(sendCategoryForm.fulfilled, (state, action) => {
        state.loading = false;
        state.formStatus = 'success';
      })
      .addCase(sendCategoryForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.formStatus = 'error';
      });
  },
});

export default productSlice.reducer;

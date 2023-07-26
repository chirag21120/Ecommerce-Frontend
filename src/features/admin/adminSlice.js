import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllAdminProducts, fetchProductById, createProduct, updateProduct, fetchAdminProductsByFilters } from './adminAPI';


const initialState = {
  products: [],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
  orders: [],
  totalOrders: 0,
};


export const fetchAllAdminProductsAsync = createAsyncThunk(
  'admin/fetchAllAdminProducts',
  async () => {
    
    const response = await fetchAllAdminProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByIdAsync = createAsyncThunk(
  'admin/fetchProductById',
  async (id) => {
    
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAdminProductsByFiltersAsync = createAsyncThunk(
  'admin/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    
    const response = await fetchAdminProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'admin/createProduct',
  async (product) => { 
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'admin/updateProduct',
  async (update) => {
    
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdminProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAdminProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        const index =  state.products.findIndex(
          (product)=>product.id === action.payload.id
        )
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      });
  },
});

export const {clearSelectedProduct } = adminSlice.actions;

export const selectAllProducts = (state) => state.admin.products;
export const selectTotalItems = (state)=> state.admin.totalItems;
export const selectAdminStatus = (state)=> state.admin.status;
export const selectedProduct = (state)=>state.admin.selectedProduct;
export default adminSlice.reducer;

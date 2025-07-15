import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      return data.map(category =>
        typeof category === 'string'
          ? { slug: category, name: category.replace(/-/g, ' ') }
          : category
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    decreaseStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product && product.stock >= quantity) {
        product.stock -= quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { decreaseStock } = productSlice.actions;
export const selectProducts = (state) => state.products.products;
export const selectCategories = (state) => state.products.categories;
export const selectProductLoading = (state) => state.products.loading;
export const selectProductError = (state) => state.products.error;

export default productSlice.reducer;
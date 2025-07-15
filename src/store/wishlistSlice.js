// store/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  loadWishlistFromLocalStorage,
  saveWishlistToLocalStorage,
} from '../utils/localStorage';

const initialState = {
  items: loadWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      if (!exists) {
        state.items.push({
          id: product.id,
          title: product.title || product.name || 'Untitled',
          price: product.price || 0,
          color: product.color || 'N/A',
          size: product.size || 'N/A',
          image: product.image || product.thumbnail || 'https://via.placeholder.com/300',
        });
        saveWishlistToLocalStorage(state);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToLocalStorage(state);
    },
    setWishlist: (state, action) => {
      state.items = action.payload.map((item) => ({
        ...item,
        image: item.image || item.thumbnail || 'https://via.placeholder.com/300',
      }));
      saveWishlistToLocalStorage(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
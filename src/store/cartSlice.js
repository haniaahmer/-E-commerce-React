// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add or update item in cart
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          color: product.color || 'N/A',
          size: product.size || 'N/A',
          quantity,
          image: product.image || product.thumbnail || 'https://via.placeholder.com/300',
        });
      }
    },

    // Set cart items manually (e.g. from localStorage)
    setCart: (state, action) => {
      state.items = action.payload.map(item => ({
        ...item,
        // Ensure backward compatibility if items were saved with 'thumbnail'
        image: item.image || item.thumbnail || 'https://via.placeholder.com/300'
      }));
    },

    // Update quantity of specific item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    // Remove item by id
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Clear all items
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  setCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
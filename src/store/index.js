// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import productReducer from './productSlice';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Let reducers initialize the state
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state from localStorage', e);
    return undefined; // Let reducers initialize the state
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn('Could not save state', e);
  }
};

// Load persisted state
const persistedState = loadState();

// Create store with persisted state
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  // You might want to throttle this for performance
  saveState(store.getState());
});

export default store;
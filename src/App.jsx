import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories } from './store/productSlice';
import store from './store';
import Home from './pages/Home';
import Products from './pages/Products';
import Product_Detail from './pages/Product_Detail';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import OrderConfirmation from './pages/OrderConfirmation';

// Create a child component to handle dispatch logic
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product_Detail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
       <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
import React from 'react'
import { Search, MapPin, Package, User, Heart, ShoppingCart, Import } from 'lucide-react';
import TopBar from '../components/Bars/TopBar';
import Header from '../components/Bars/Header';
import NavigationMenu from '../components/Bars/NavigationMenu';
import Footer from '../components/Bars/Footer';
import Order from '../components/Order'
const OrderConfirmation = () =>  {
  return (
     <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
     <div className="max-w-7xl mx-auto px-4 py-5 mt-4">
      <Order/></div>
      <Footer/>
    </div>
  );
};

export default OrderConfirmation;
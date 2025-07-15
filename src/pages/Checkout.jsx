import React from 'react'
import { Search, MapPin, Package, User, Heart, ShoppingCart, Import } from 'lucide-react';
import TopBar from '../components/Bars/TopBar';
import Header from '../components/Bars/Header';
import NavigationMenu from '../components/Bars/NavigationMenu';
import Footer from '../components/Bars/Footer';
import Checkout_Form from '../components/Checkout_Form';
const Checkout = () =>  {
  return (
     <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <NavigationMenu/>
      <Checkout_Form/>
      <Footer/>
    </div>
  );
};

export default Checkout;
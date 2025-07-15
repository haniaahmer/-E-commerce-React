import React from 'react';
import { Search, MapPin, Package, User, Heart, ShoppingCart, Import, Sidebar } from 'lucide-react';
import TopBar from '../components/Bars/TopBar';
import Header from '../components/Bars/Header';
import NavigationMenu from '../components/Bars/NavigationMenu';
import Footer from '../components/Bars/Footer';
import LaptopSaleBanner from '../components/Others/LaptopSaleBanner';
import BelowBar from '../components/Bars/BelowBar';
import ProductFilter from '../components/ProductsDetails/ProductFilter';


const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <NavigationMenu />
      <BelowBar />
      <ProductFilter />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <LaptopSaleBanner />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
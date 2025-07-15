import React from 'react'
import { Search, MapPin, Package, User, Heart, ShoppingCart, Import } from 'lucide-react';
import TopBar from '../components/Bars/TopBar';
import Header from '../components/Bars/Header';
import NavigationMenu from '../components/Bars/NavigationMenu';
import Footer from '../components/Bars/Footer';
import LaptopSaleBanner from '../components/Others/LaptopSaleBanner';
import CameraBanner from '../components/Others/CameraBanner';
import ProductCarousel from '../components/ProductsDetails/ProductCarousel';
import PopProducts from '../components/ProductsDetails/PopProducts';
import ProductShowcase from '../components/ProductsDetails/ProductShowcase';
import PromoBanner from '../components/Others/PromoBanner';
import Testimonials from '../components/Others/Testimonials';
import Brands from '../components/Others/Brands';
import NewsCarousel from '../components/Others/NewsCarousel';
const Home = () =>  {
  return (
     <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <NavigationMenu/>
      <CameraBanner/>
       <div className="max-w-7xl mx-auto px-4 py-5 mt-4"><ProductCarousel/></div>
      <div className="max-w-7xl mx-auto px-4 py-6 mt-2"><PopProducts/></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
              <LaptopSaleBanner/>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 mt-2"><ProductShowcase/></div>
      <div className="max-w-7xl mx-auto px-4 py-6 mt-2"><PromoBanner/></div>
      <div className="max-w-7xl mx-auto px-4 py-6 mt-2"><Testimonials/></div>
       <div className="max-w-7xl mx-auto px-4 py-6 mt-2"><Brands/></div>
       <div className="max-w-7xl mx-auto px-4 py-6 mt-2"><NewsCarousel/></div>
      <Footer/>
    </div>
  );
};

export default Home;
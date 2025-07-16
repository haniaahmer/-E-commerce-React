import React from 'react';
import TopBar from '../components/Bars/TopBar';
import Header from '../components/Bars/Header';
import NavigationMenu from '../components/Bars/NavigationMenu';
import Footer from '../components/Bars/Footer';
import BelowBar from '../components/Bars/BelowBar';
import ProductDetail from '../components/ProductsDetails/ProductDetail';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <NavigationMenu />
      <BelowBar />
      <ProductDetail />    
      <Footer />
    </div>
  );
};

export default ProductDetails;

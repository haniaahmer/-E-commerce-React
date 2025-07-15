import React from 'react'
import TopBar from '../components/Bars/TopBar'
import Header from '../components/Bars/Header'
import NavigationMenu from '../components/Bars/NavigationMenu'
import BelowBar from '../components/Bars/BelowBar'
import Footer from '../components/Bars/Footer'
import WishlistComponent from '../components/WishlistComponent'
export function Wishlist() {
  return (
     <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      
      <NavigationMenu/>
     <BelowBar />
     <WishlistComponent/>
      <Footer/>
    </div>
  );
};

export default Wishlist;
import React from 'react'
import { Search, MapPin, Package, User, Heart, ShoppingCart } from 'lucide-react';
function TopBar() {
  return (
   <div className="bg-gray-100 px-4 py-2 text-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Need help? Call us:</span>
          <a href="tel:+98023456789" className="text-gray-800 hover:text-blue-600">
            (+98) 0234 456 789
          </a>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 cursor-pointer">
            <MapPin className="w-4 h-4" />
            <span>Our store</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 cursor-pointer">
            <Package className="w-4 h-4" />
            <span>Track your order</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
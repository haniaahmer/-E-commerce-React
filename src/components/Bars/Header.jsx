import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get total cart quantity from Redux
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Catalog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-sky-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between space-y-4 sm:space-y-0">
          {/* Logo and Hamburger Menu */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#EDA415] rounded transform rotate-12 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold">Electon</span>
            </Link>
            {/* Hamburger Icon (Mobile Only) */}
            <button
              className="sm:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar (Hidden on mobile when menu is open, optional) */}
          <div className="hidden sm:flex flex-1 w-full sm:max-w-md sm:mx-4">
            <div className="relative flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any things"
                className="w-full h-12 sm:h-14 pl-6 pr-32 bg-white rounded-[20px] text-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 h-12 sm:h-14 w-24 sm:w-32 bg-[#EDA415] rounded-[20px] flex justify-center items-center gap-2 text-sm sm:text-base"
              >
                Search <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* User Actions (Always visible) */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={toggleSignIn}
              className="flex items-center space-x-1 hover:text-orange-300 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm sm:text-base">{isSignedIn ? 'Account' : 'Sign in'}</span>
            </button>
            {/* Wishlist */}
            <div className="relative">
              <Link to="/Wishlist" className="flex items-center space-x-1 hover:text-orange-300 transition-colors">
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-[#EDA415] text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                    {wishlistCount}
                  </span>
                </div>
                <span className="sm:inline text-sm sm:text-base">Wishlist</span>
              </Link>
            </div>
            {/* Cart */}
            <div className="relative">
              <Link to="/Cart" className="flex items-center space-x-1 hover:text-orange-300 transition-colors">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-[#EDA415] text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                    {cartCount}
                  </span>
                </div>
                <span className="sm:inline text-sm sm:text-base">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Visible when isMenuOpen is true) */}
        {isMenuOpen && (
          <div className="sm:hidden bg-sky-900 text-white absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center space-y-6 z-50">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-xl font-medium hover:text-orange-300 transition-colors "
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Search Bar */}
            <div className="w-full max-w-md px-4">
              <div className="relative flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any things"
                  className="w-full h-12 pl-6 pr-32 bg-white rounded-[20px] text-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  onClick={() => {
                    handleSearch();
                    toggleMenu();
                  }}
                  className="absolute right-0 h-12 w-24 bg-[#EDA415] rounded-[20px] flex justify-center items-center gap-2 text-sm"
                >
                  Search <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Mobile User Actions */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => {
                  toggleSignIn();
                  toggleMenu();
                }}
                className="flex items-center space-x-1 hover:text-orange-300 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-base">{isSignedIn ? 'Account' : 'Sign in'}</span>
              </button>
              <Link
                to="/Wishlist"
                className="flex items-center space-x-1 hover:text-orange-300 transition-colors"
                onClick={toggleMenu}
              >
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-[#EDA415] text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                    {wishlistCount}
                  </span>
                </div>
                <span className="text-base">Wishlist</span>
              </Link>
              <Link
                to="/Cart"
                className="flex items-center space-x-1 hover:text-orange-300 transition-colors"
                onClick={toggleMenu}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-[#EDA415] text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                    {cartCount}
                  </span>
                </div>
                <span className="text-base">Cart</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
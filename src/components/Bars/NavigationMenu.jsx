import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavigationMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Updated menuItems with route paths
  const menuItems = [
    { name: 'Home', key: 'home', hasDropdown: false, path: '/' },
    { name: 'Catalog', key: 'catalog', hasDropdown: false, path: '/products' },
    { name: 'Blog', key: 'blog', hasDropdown: false, path: '/blog' },
    { name: 'About us', key: 'about', hasDropdown: false, path: '/about' },
  ];

  const categories = [
    'Electronics',
    'Clothing & Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
    'Health & Beauty'
  ];

  return (
    <nav className="bg-zinc-100 border-t border-gray-200 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between min-h-14 py-2">
          {/* Left Side - Browse Categories and Menu */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center w-full md:w-auto md:justify-center">
            {/* Browse Categories Button */}
            <div className="relative mb-2 md:mb-0 md:mr-8">
              <button
                onClick={() => toggleDropdown('categories')}
                className="bg-[#EDA415] hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors w-full md:w-auto justify-center"
                aria-expanded={activeDropdown === 'categories'}
                aria-haspopup="true"
              >
                <span className="font-medium">Browse categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Categories Dropdown */}
              {activeDropdown === 'categories' && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link 
                        key={category} 
                        to={`/products?category=${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-400 border-b border-gray-100 last:border-b-0"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Navigation Menu */}
            <div className="hidden md:flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-8 w-full md:w-auto">

              {menuItems.map((item) => (
                <div key={item.key} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.key)}
                        className="flex items-center justify-between md:justify-center space-x-1 text-gray-700 hover:text-orange-400 transition-colors py-2 px-2 md:px-0 w-full md:w-auto"
                        aria-expanded={activeDropdown === item.key}
                        aria-haspopup="true"
                      >
                        <span className="font-medium">{item.name}</span>
                        {item.hasDropdown && (
                          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.key ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                      
                      {item.hasDropdown && activeDropdown === item.key && (
                        <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                          <div className="py-2">
                            {[1, 2, 3].map((num) => (
                              <Link 
                                key={num} 
                                to={`${item.path}/subpage-${num}`}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-400"
                                onClick={() => setActiveDropdown(null)}
                              >
                                Item {num}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      to={item.path}
                      className="flex items-center text-gray-700 hover:text-orange-400 transition-colors py-2 px-2 md:px-0 w-full md:w-auto"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden xl:block text-gray-700 font-medium text-right py-2 md:py-0">
            30 Days Free Return
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
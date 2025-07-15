import React from 'react';
import { ChevronRight } from 'lucide-react';

const BelowBar = () => {
  const menuItems = [
    { label: 'Home' },
    { label: 'All category' },
    // Add more items if needed
  ];

  return (
    <div className="w-full bg-white shadow-sm">
      <nav className="flex flex-wrap sm:flex-nowrap items-center h-10 gap-x-2 sm:gap-x-6 px-4 sm:px-6 lg:px-10 overflow-x-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-1 group px-2 sm:px-3 py-1 transition-colors"
          >
            <span className="text-neutral-700 text-sm sm:text-base font-medium font-['Poppins'] group-hover:text-blue-600">
              {item.label}
            </span>
            <ChevronRight
              className="w-4 h-4 text-neutral-700 group-hover:text-blue-600 transition-transform group-hover:rotate-90"
              strokeWidth={2.5}
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BelowBar;

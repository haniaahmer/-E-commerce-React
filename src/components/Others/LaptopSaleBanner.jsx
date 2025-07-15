import React from 'react';
import laptopbanner from '../../assets/laptopbanner.png';

function LaptopSaleBanner() {
  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden">
      {/* Background Image */}
      <img
        src={laptopbanner}
        alt="Laptop Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center pr-16 items-end">
        {/* Top-right badge */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-[#EDA415] rounded-full mb-4  mr-38">
          <span className="text-white text-sm font-medium">New laptop</span>
        </div>

        {/* Main Text Centered Horizontally but aligned right */}
        <div className="text-right mb-4  mr-18">
          <div className="text-cyan-400 text-4xl font-bold font-poppins mb-1">
            Sale up to 50% off
          </div>
          <div className="text-white text-lg font-medium font-poppins mr-19">
            12 inch HD display
          </div>
        </div>

        {/* Shop Now Button */}
       {/* Shop Now Button */}
<button className="bg-[#EDA415] hover:bg-orange-500 text-white px-7 py-3 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mr-32">
  Shop now
</button>

      </div>
    </div>
  );
}

export default LaptopSaleBanner;

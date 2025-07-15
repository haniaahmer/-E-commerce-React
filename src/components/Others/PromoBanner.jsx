import React from 'react';
import { FaTruck, FaStar, FaShieldAlt } from 'react-icons/fa';

const PromoBanner = () => {
  return (
    <div className="w-full max-w-[1328px] h-auto min-h-[100px] bg-sky-100 rounded-[20px] flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-12 lg:gap-24 p-3 sm:p-4 md:p-6">
      {/* Free Delivery Section */}
      <div className="flex justify-start items-center gap-2 sm:gap-4 md:gap-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 relative">
          <FaTruck className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-amber-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="flex flex-col justify-center items-start gap-0.5 sm:gap-1 md:gap-1.5">
          <div className="text-sky-900 text-lg sm:text-xl md:text-2xl font-semibold font-['Poppins']">Free Delivery</div>
          <div className="text-sky-900 text-sm sm:text-base md:text-lg font-normal font-['Poppins']">On orders above $50.00</div>
        </div>
      </div>

      {/* Best Quality Section */}
      <div className="flex justify-start items-center gap-3 sm:gap-4 md:gap-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 relative">
          <FaStar className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-amber-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="flex flex-col justify-center items-start gap-0.5 sm:gap-1 md:gap-1.5">
          <div className="text-sky-900 text-lg sm:text-xl md:text-2xl font-semibold font-['Poppins']">Top Quality</div>
          <div className="text-sky-900 text-sm sm:text-base md:text-lg font-normal font-['Poppins']">Premium quality at affordable prices</div>
        </div>
      </div>

      {/* Warranty Section */}
      <div className="flex justify-start items-center gap-3 sm:gap-4 md:gap-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 relative">
          <FaShieldAlt className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-amber-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="flex flex-col justify-center items-start gap-0.5 sm:gap-1 md:gap-1.5">
          <div className="text-sky-900 text-lg sm:text-xl md:text-2xl font-semibold font-['Poppins']">1-Year Warranty</div>
          <div className="text-sky-900 text-sm sm:text-base md:text-lg font-normal font-['Poppins']">Comprehensive coverage provided</div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
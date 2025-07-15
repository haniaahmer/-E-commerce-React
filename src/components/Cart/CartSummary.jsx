import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COUNTRIES = [
  "Pakistan", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Japan", "India", "Brazil", "Mexico",
];

const VALID_COUPONS = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME15: 15,
  H12: 12,
};

const CartSummary = ({
  subtotal,
  total,
  couponCode,
  setCouponCode,
  selectedCountry,
  onCountryChange,
  onApplyCoupon,
}) => {
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();
  const isCartEmpty = subtotal === 0;

  const handleProceedToCheckout = () => {
    navigate('/Checkout');
  };

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (VALID_COUPONS[code]) {
      const discountPercent = VALID_COUPONS[code];
      const discountAmount = (subtotal * discountPercent) / 100;
      const newTotal = subtotal - discountAmount;
      onApplyCoupon({ code, discount: discountPercent, newTotal });
      setDiscountApplied(true);
    } else {
      onApplyCoupon({ code: '', discount: 0, newTotal: subtotal });
      setDiscountApplied(false);
    }
  };

  return (
    <div className="w-full lg:w-80">
      <div className="bg-gray-100 p-3 sm:p-4 rounded-t-lg text-center font-medium text-gray-700 text-sm sm:text-base">
        Cart total
      </div>

      <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-b-lg">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <span className="text-gray-700 text-sm sm:text-base">Subtotal</span>
          <span className="font-semibold text-sm sm:text-base">$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm sm:text-base"
              onClick={handleApplyCoupon}
            >
              Apply
            </button>
          </div>

          {discountApplied && (
            <p className="text-green-600 text-xs sm:text-sm font-medium mt-1">🎉 Discount applied successfully!</p>
          )}
        </div>

        <div className="mb-4 sm:mb-6 relative">
          <select
            className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded bg-white focus:outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            value={selectedCountry}
            onChange={onCountryChange}
          >
            <option value="Select Country" disabled>Select Country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-200 mb-4 sm:mb-6">
          <span className="text-gray-700 text-sm sm:text-base">Total amount</span>
          <span className="text-base sm:text-lg font-semibold">$ {total.toFixed(2).replace('.', ',')}</span>
        </div>

        <button
          className={`w-full px-4 py-2 sm:px-6 sm:py-3 bg-[#EDA415] text-white rounded-full transition-colors font-medium text-sm sm:text-base ${
            isCartEmpty ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-300'
          }`}
          onClick={handleProceedToCheckout}
          disabled={isCartEmpty}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
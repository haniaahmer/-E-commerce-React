import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartActions = ({ onClear }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 lg:gap-10 my-4 sm:my-6">
      <button
        className="px-4 py-2 sm:px-6 sm:py-3 bg-[#EDA415] text-white rounded-full hover:bg-orange-300 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto"
        onClick={() => navigate('/products')}
      >
        Continue shopping
      </button>
      <button
        className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto"
        onClick={() => alert('Cart updated')}
      >
        Update cart
      </button>
      <button
        className="px-4 py-2 sm:px-6 sm:py-3 border border-red-500 text-red-500 rounded-full hover:border-red-600 hover:text-red-600 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto"
        onClick={onClear}
      >
        Clear cart
      </button>
    </div>
  );
};

export default CartActions;
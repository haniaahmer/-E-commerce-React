import React from 'react';
import { CheckCircle, Truck, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Order() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const total = state?.total || 0;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="mb-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You for Your Order!
        </h2>
        <p className="text-gray-600 text-lg">
          Your order has been successfully placed
        </p>
        <p className="text-gray-600 text-lg mt-2">
          Order Total: ${total.toFixed(2).replace('.', ',')}
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center mb-2">
          <Truck className="w-5 h-5 text-blue-500 mr-2" />
          <span className="font-semibold text-gray-700">Delivery Update</span>
        </div>
        <p className="text-gray-600">
          You will get updated soon regarding delivery
        </p>
      </div>
      
      <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
        <Clock className="w-4 h-4 mr-1" />
        <span>We'll notify you via email and SMS</span>
      </div>
      
      <div className="space-y-2">
       
        <button
          className="px-6 py-3 bg-[#EDA415] text-white rounded-r-2xl hover:bg-orange-300 transition-colors font-medium"
          onClick={() => navigate('/products')}
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}

export default Order;
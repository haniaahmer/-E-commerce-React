import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  removeFromWishlist,
  clearWishlist
} from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { selectWishlistItems } from '../store/selectors';

export function WishlistComponent() {
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (item) => {
    dispatch(addToCart({ product: item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.title} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const removeFromWishlistHandler = (id) => {
    const item = wishlistItems.find(item => item.id === id);
    dispatch(removeFromWishlist(id));
    toast.error(`${item?.title} removed from wishlist`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const addAllToCart = () => {
    if (wishlistItems.length === 0) {
      toast.warning('Your wishlist is empty', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    
    wishlistItems.forEach(item => dispatch(addToCart({ product: item, quantity: 1 })));
    dispatch(clearWishlist());
    toast.success(`All ${wishlistItems.length} items added to cart!`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const getTotalPrice = () => {
    return wishlistItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Toast Container - should be at the root level */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500" />
            My Wishlist
          </h1>
          <div className="text-xs sm:text-sm text-gray-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">Your wishlist is empty</p>
            <p className="text-gray-400 text-xs sm:text-sm">Add items you love to save them for later</p>
          </div>
        ) : (
          <>
            <div className="hidden sm:grid grid-cols-12 gap-2 pb-3 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Price</div>
              <div className="col-span-3 text-center">Actions</div>
            </div>

            {/* Wishlist Items */}
            <div className="space-y-4 mt-2 sm:mt-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center py-3 sm:py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="col-span-7 sm:col-span-6 flex items-center gap-2">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300';
                        }}
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">Color: {item.color}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">Size: {item.size}</p>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3 text-center">
                    <span className="text-sm sm:text-lg font-semibold text-gray-800">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="col-span-3 flex items-center justify-end sm:justify-center gap-1 sm:gap-2">
                    <button
                      onClick={() => addToCartHandler(item)}
                      aria-label="Add to cart"
                      className="flex items-center gap-1 sm:gap-2 bg-blue-200 text-black text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-400 transition-colors"
                    >
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="bg-yellow-400 text-white rounded-full p-1">
                        <ShoppingCart className="w-2 h-2 sm:w-3 sm:h-3" />
                      </span>
                    </button>
                    <button
                      onClick={() => removeFromWishlistHandler(item.id)}
                      className="p-1 sm:p-2 text-red-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-4 sm:gap-0">
              <div className="text-base sm:text-lg font-semibold text-gray-800">
                Total: ${getTotalPrice().toFixed(2)}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-[#EDA415] text-white rounded-full hover:bg-orange-300 transition-colors font-medium text-sm sm:text-base"
                  onClick={() => navigate('/products')}
                >
                  Continue shopping
                </button>
                <button
                  onClick={addAllToCart}
                  className="px-4 py-2 sm:px-6 sm:py-2 bg-green-600 rounded-full text-white hover:bg-green-700 text-sm sm:text-base"
                >
                  Add All to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WishlistComponent;
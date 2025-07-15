import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import { selectWishlistItems } from '../../store/selectors';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-toastify';

const getStockStatus = (stock) => {
  if (stock === 0) return { text: `Out of Stock (${stock} items)`, className: 'text-red-600' };
  if (stock <= 10) return { text: `Low Stock (${stock} items)`, className: 'text-orange-500' };
  return { text: `In Stock (${stock} items)`, className: 'text-green-600' };
};

const ProductCard = ({ product, variant = 'default', onStockUpdate }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock <= 0) {
      toast.error('This product is out of stock', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return;
    }

    const updatedProduct = { ...product, stock: product.stock - 1 };
    dispatch(addToCart({ product: updatedProduct, quantity: 1 }));
    const stockData = JSON.parse(localStorage.getItem('productStock') || '{}');
    stockData[product.id] = updatedProduct.stock;
    localStorage.setItem('productStock', JSON.stringify(stockData));
    if (onStockUpdate) onStockUpdate(updatedProduct);
    toast.success(`${product.title} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info('Removed from wishlist', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 ${
        variant === 'showcase' ? 'lg:scale-105' : ''
      } cursor-pointer hover:shadow-md transition-shadow relative`}
      onClick={() => window.location.href = `/product/${product.id}`}
    >
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 p-2 rounded-full bg-blue-200 shadow-sm hover:bg-gray-100 transition-all z-10"
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500 scale-110' : 'text-black scale-100'} transition-transform duration-200`}
        />
      </button>
      <div className="flex justify-center mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`object-contain ${variant === 'showcase' ? 'w-64 h-64' : 'w-32 h-32'}`}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
        />
      </div>
      <h3 className="text-lg font-semibold text-blue-900 truncate">{product.title}</h3>
      <p className="text-sm text-gray-600 truncate">{product.description.slice(0, 50) + '...'}</p>
      <p className="text-xl font-bold text-blue-900 my-2">${product.price.toFixed(2)}</p>
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className={`text-sm ${stockStatus.className} mb-3`}>{stockStatus.text}</p>
      <div className="flex justify-start">
        <button
          className={`bg-blue-200 text-black py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition-colors ${
            product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          Add to cart
          <span className="bg-yellow-400 rounded-full p-1">
            <ShoppingCart className="w-5 h-5 text-white" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
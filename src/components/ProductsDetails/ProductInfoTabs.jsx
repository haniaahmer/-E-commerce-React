import React, { useState } from 'react';
import { Heart, Star, StarHalf, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import { selectWishlistItems } from '../../store/selectors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const renderStars = (rating, size = 'w-4 h-4') => {
  const full = Math.floor(rating || 0);
  const half = rating % 1 !== 0;
  const empty = 5 - Math.ceil(rating || 0);

  return [
    ...Array(full).fill().map((_, i) => (
      <Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />
    )),
    ...(half ? [<StarHalf key="half" className={`${size} fill-yellow-400 text-yellow-400`} />] : []),
    ...Array(empty).fill().map((_, i) => (
      <Star key={`empty-${i}`} className={`${size} text-gray-300`} />
    )),
  ];
};

const ProductInfoTabs = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [localStock, setLocalStock] = useState(product?.stock || 0);
  const isOutOfStock = localStock === 0;

  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  const updateQuantity = (type) => {
    if (isOutOfStock || !product) return;
    setQuantity((prev) =>
      type === 'increment'
        ? Math.min(prev + 1, localStock)
        : Math.max(prev - 1, 1)
    );
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (!product) {
      toast.error('Product data is missing');
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      toast.error('Product data is missing');
      return;
    }
    if (isOutOfStock) {
      toast.error('This product is out of stock');
      return;
    }

    setLocalStock((prev) => prev - quantity);
    onAddToCart({ ...product, stock: localStock - quantity }, quantity);
    setQuantity(1);
  };

  const handleBuyItNow = () => {
    if (!product) {
      toast.error('Product data is missing');
      return;
    }
    if (isOutOfStock) {
      toast.error('This product is out of stock');
      return;
    }

    // Calculate total price for the selected quantity
    const total = product.price * quantity;

    // Navigate to checkout with product and total
    navigate('/checkout', {
      state: {
        buyItNowProduct: { ...product, quantity, stock: localStock - quantity },
        total,
      },
    });
  };

  const renderImageGallery = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
        <img
          src={product?.images?.[selectedImage] || 'https://via.placeholder.com/300'}
          alt={product?.title || 'Product image'}
          className="max-w-full max-h-96 object-contain"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
        />
      </div>
      <div className="flex space-x-2">
        {product?.images?.map((image, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`w-20 h-20 rounded-lg border-2 ${selectedImage === i ? 'border-blue-500' : 'border-gray-200'} overflow-hidden`}
          >
            <img
              src={image}
              alt={`${product?.title || 'Product'} ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const renderPriceSection = () => (
    <div className="flex items-center space-x-4">
      <span className="text-3xl font-bold text-gray-900">${product?.price?.toFixed(2) || '0.00'}</span>
      {product?.discountPercentage > 0 && (
        <span className="text-lg text-gray-500 line-through">
          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
        </span>
      )}
    </div>
  );

  const renderDetailsSection = () => (
    <div className="space-y-2 text-sm">
      <div className="flex items-center space-x-2">
        <span className="font-medium">Availability:</span>
        <span className={isOutOfStock ? 'text-red-600' : 'text-green-600'}>
          {isOutOfStock ? 'Out of Stock' : `${localStock} In Stock`}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-medium">SKU:</span>
        <span>{product?.sku || 'N/A'}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-medium">Category:</span>
        <span className="uppercase">{product?.category || 'N/A'}</span>
      </div>
    </div>
  );

  const renderQuantitySelector = () => (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium">Quantity:</span>
      <div className="flex items-center border rounded-lg">
        <button
          onClick={() => updateQuantity('decrement')}
          className="p-2 hover:bg-gray-100"
          disabled={quantity <= 1 || isOutOfStock}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="px-4 py-2 border-l border-r">{quantity}</span>
        <button
          onClick={() => updateQuantity('increment')}
          className="p-2 hover:bg-gray-100"
          disabled={quantity >= localStock || isOutOfStock}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="flex space-x-8 border-b">
      {['description', 'reviews'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-3 px-1 text-sm font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  const renderTabContent = () => {
    if (!product) {
      return <p className="text-gray-500">Product data is missing.</p>;
    }
    if (activeTab === 'description') {
      return (
        <div className="prose max-w-none text-gray-700">
          <p>{product.description || 'No description available'}</p>
          <div className="mt-4 space-y-2">
            <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
            <p><strong>Weight:</strong> {product.weight ? `${product.weight}g` : 'N/A'}</p>
            <p>
              <strong>Dimensions:</strong>{' '}
              {product.dimensions
                ? `${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth}cm`
                : 'N/A'}
            </p>
            <p><strong>Warranty:</strong> {product.warrantyInformation || 'N/A'}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation || 'N/A'}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="font-medium">{review.reviewerName || 'Anonymous'}</span>
                <span className="text-gray-500 text-sm">
                  {review.date ? new Date(review.date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <p className="text-gray-700">{review.comment || 'No comment'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    );
  };

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white text-center">
        <p className="text-red-600">Error: Product data is missing</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderImageGallery()}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title || 'Untitled Product'}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">({product.rating?.toFixed(1) || '0.0'})</span>
              <span className="text-sm text-gray-500">• {product.reviews?.length || 0} reviews</span>
            </div>
          </div>
          {renderPriceSection()}
          {renderDetailsSection()}
          {renderQuantitySelector()}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className={`bg-blue-200 text-black py-2 px-4 rounded-lg flex items-center gap-2 transition-colors ${
                isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
              }`}
              disabled={isOutOfStock}
            >
              Add to cart
              <span className="bg-yellow-400 rounded-full p-1">
                <ShoppingCart className="w-5 h-5 text-white" />
              </span>
            </button>
            <button
              onClick={handleBuyItNow}
              className={`bg-yellow-400 text-white py-3 px-6 rounded-lg transition-colors ${
                isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700'
              }`}
              disabled={isOutOfStock}
            >
              Buy It Now
            </button>
            <button
              onClick={toggleWishlist}
              className={`p-3 rounded-lg shadow-sm transition-colors ${
                isInWishlist ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-200 hover:bg-blue-400'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'text-white fill-white' : 'text-black'}`} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        {renderTabs()}
        <div className="mt-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProductInfoTabs;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import useProductDetails from '../../hooks/useProductDetails';
import ProductInfoTabs from './ProductInfoTabs';
import RelatedProducts from './RelatedProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, related, loading } = useProductDetails(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`Added ${quantity} x ${product.title} to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <ProductInfoTabs product={product} onAddToCart={handleAddToCart} />
      <RelatedProducts products={related} />
    </div>
  );
};

export default ProductDetail;
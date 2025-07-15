import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products = [] }) => {
  const navigate = useNavigate();
  const uniqueProducts = useMemo(() => {
    const uniqueMap = new Map();
    products.forEach(product => {
      if (product?.id && !uniqueMap.has(product.id)) {
        uniqueMap.set(product.id, product);
      }
    });
    return Array.from(uniqueMap.values());
  }, [products]);

  const handleStockUpdate = (updatedProduct) => {
    // Note: Since RelatedProducts receives products as props, it doesn't manage its own state.
    // If stock updates need to persist, consider passing a callback to the parent (ProductDetail).
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uniqueProducts.length > 0 ? (
          uniqueProducts.map((product) => (
            <ProductCard
              key={`product-${product.id}`}
              product={product}
              onStockUpdate={handleStockUpdate}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No related products available.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(RelatedProducts);
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from './ProductCard';

const PRODUCTS_API = 'https://dummyjson.com/products?limit=100';
const CATEGORIES_API = 'https://dummyjson.com/products/categories';

const PopProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(PRODUCTS_API),
          fetch(CATEGORIES_API),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.products || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Data fetching error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const filterProductsByCategory = (productList, category) =>
    category
      ? productList.filter((product) => product.category?.toLowerCase() === category.toLowerCase())
      : productList;

  const getPaginatedProducts = (productList, pageIndex, perPage = 8) => {
    const start = pageIndex * perPage;
    return productList.slice(start, start + perPage);
  };

  const handleStockUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const filteredProducts = filterProductsByCategory(products, selectedCategory);
  const totalPages = Math.ceil(filteredProducts.length / 8);
  const currentProducts = getPaginatedProducts(filteredProducts, page);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 md:mb-0">Popular Products</h1>
          <div className="flex gap-4 flex-wrap">
            {categories.slice(0, 4).map((category, index) => (
              <button
                key={`category-${index}`}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-blue-950 rounded-full text-sm sm:text-base capitalize ${
                  selectedCategory === category.slug
                    ? 'bg-blue-800 border-blue-800 text-black'
                    : 'text-gray-900 bg-white border-blue-950 hover:bg-blue-800 hover:text-white hover:border-blue-800'
                } transition-colors duration-200`}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.name}
              </button>
            ))}
            <button
              className={`px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-blue-950 rounded-full text-sm sm:text-base ${
                selectedCategory === ''
                  ? 'bg-blue-800 border-blue-800 text-black'
                  : 'text-gray-900 bg-white border-blue-950 hover:bg-blue-800 hover:text-white hover:border-blue-800'
              } transition-colors duration-300`}
              onClick={() => handleCategoryClick('')}
            >
              All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={`product-${product.id}`}
              product={product}
              onStockUpdate={handleStockUpdate}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={`page-${idx}`}
                onClick={() => setPage(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  page === idx ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopProducts;
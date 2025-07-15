import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from './ProductCard';

const PRODUCTS_API = 'https://dummyjson.com/products?limit=1000';
const CATEGORIES_API = 'https://dummyjson.com/products/categories';
const INITIAL_FILTERS = {
  category: '',
  brands: [],
  availability: 'all',
  priceRange: [0, 1000],
};

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [priceLimits, setPriceLimits] = useState([0, 1000]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(PRODUCTS_API),
          fetch(CATEGORIES_API),
        ]);

        if (!prodRes.ok || !catRes.ok) throw new Error('API fetch failed');

        const prodJson = await prodRes.json();
        const catJson = await catRes.json();

        const validProducts = Array.isArray(prodJson.products) ? prodJson.products : [];
        const validCategories = Array.isArray(catJson)
          ? catJson.map(c =>
              typeof c === 'string' ? { slug: c, name: c.replace(/-/g, ' ') } : c
            )
          : [];

        setProducts(validProducts);
        setCategories(validCategories);

        if (validProducts.length > 0) {
          const range = getPriceRange(validProducts);
          setFilters(prev => ({ ...prev, priceRange: range }));
          setPriceLimits(range);
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPriceRange = (items) => {
    const prices = items.map(p => p.price || 0);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  };

  const handleStockUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const getBrands = () => [...new Set(products.map(p => p.brand).filter(Boolean))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const toggleBrand = (brand) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange('brands', updatedBrands);
  };

  const resetFilters = () => {
    setFilters({
      ...INITIAL_FILTERS,
      priceRange: getPriceRange(products),
    });
    setPage(0);
  };

  const filterProducts = () => {
    return products.filter(product => {
      const { category, brands, availability, priceRange } = filters;
      const matchesCategory = !category || product.category?.toLowerCase() === category.toLowerCase();
      const matchesBrand = brands.length === 0 || brands.includes(product.brand);
      const matchesAvailability =
        availability === 'all' ||
        (availability === 'in-stock' && product.stock > 0) ||
        (availability === 'out-of-stock' && product.stock === 0);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesBrand && matchesAvailability && matchesPrice;
    });
  };

  const brands = getBrands();
  const filteredProducts = filterProducts();
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(page * productsPerPage, (page + 1) * productsPerPage);

  if (loading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className={`text-lg ${error ? 'text-red-600' : 'text-gray-600'}`}>{error || 'Loading products...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">Categories</h3>
                <div className="flex gap-2 flex-wrap">
                  {categories.slice(0, 4).map((category, index) => (
                    <button
                      key={`category-${index}`}
                      className={`px-4 py-2 bg-white border border-blue-950 rounded-full text-sm capitalize ${
                        filters.category === (category.slug || category)
                          ? 'bg-blue-800 border-blue-800 text-black'
                          : 'text-gray-900 bg-white border-blue-950 hover:bg-blue-800 hover:text-white hover:border-blue-800'
                      } transition-colors duration-200`}
                      onClick={() => handleFilterChange('category', category.slug || category)}
                    >
                      {category.name || category.replace(/-/g, ' ')}
                    </button>
                  ))}
                  <button
                    className={`px-4 py-2 bg-white border border-blue-950 rounded-full text-sm ${
                      filters.category === ''
                        ? 'bg-blue-800 border-blue-800 text-black'
                        : 'text-gray-900 bg-white border-blue-950 hover:bg-blue-800 hover:text-white hover:border-blue-800'
                    } transition-colors duration-200`}
                    onClick={() => handleFilterChange('category', '')}
                  >
                    All
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="all"
                      checked={filters.availability === 'all'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">All</span>
                    <span className="ml-auto text-xs text-gray-500">{products.length}</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="in-stock"
                      checked={filters.availability === 'in-stock'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">In stock</span>
                    <span className="ml-auto text-xs text-gray-500">
                      {products.filter(p => p.stock > 0).length}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="out-of-stock"
                      checked={filters.availability === 'out-of-stock'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Out of stock</span>
                    <span className="ml-auto text-xs text-gray-500">
                      {products.filter(p => p.stock === 0).length}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">${filters.priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${filters.priceRange[1]}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={priceLimits[0]}
                      max={filters.priceRange[1]}
                      value={filters.priceRange[0]}
                      onChange={(e) => {
                        const val = Math.max(priceLimits[0], Math.min(Number(e.target.value) || 0, filters.priceRange[1]));
                        handleFilterChange('priceRange', [val, filters.priceRange[1]]);
                      }}
                      className="w-1/2 p-2 border border-gray-200 rounded-md text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min={filters.priceRange[0]}
                      max={priceLimits[1]}
                      value={filters.priceRange[1]}
                      onChange={(e) => {
                        const val = Math.min(priceLimits[1], Math.max(Number(e.target.value) || 0, filters.priceRange[0]));
                        handleFilterChange('priceRange', [filters.priceRange[0], val]);
                      }}
                      className="w-1/2 p-2 border border-gray-200 rounded-md text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min={priceLimits[0]}
                    max={priceLimits[1]}
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const val = Math.min(priceLimits[1], Math.max(Number(e.target.value), filters.priceRange[0]));
                      handleFilterChange('priceRange', [filters.priceRange[0], val]);
                    }}
                    className="w-full"
                  />
                </div>
              </div>

              {brands.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Brand</h3>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                    {brands.map((brand) => {
                      const isSelected = filters.brands.includes(brand);
                      return (
                        <button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className={`flex items-center px-3 py-1.5 text-sm rounded-full border transition-colors duration-200 ${
                            isSelected
                              ? 'bg-blue-800 text-white border-blue-800'
                              : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-500'
                          }`}
                        >
                          {brand}
                          <span
                            className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-white text-blue-800' : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {products.filter(p => p.brand === brand).length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                onClick={resetFilters}
                className="w-full bg-blue-200 text-black py-2 rounded-lg hover:bg-blue-400 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-900">Products</h2>
              <p className="text-gray-600 text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={`product-${product.id}`}
                    product={product}
                    onStockUpdate={handleStockUpdate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500">No products found matching your filters.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-blue-200 text-black px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

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
      </div>
    </div>
  );
};

export default ProductFilter;
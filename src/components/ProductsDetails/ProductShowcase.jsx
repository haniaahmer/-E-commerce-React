import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import { selectWishlistItems } from '../../store/selectors';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';

const ProductShowcase = ({ onStockUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 5;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${page * productsPerPage}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Load stock from localStorage
        const stockData = JSON.parse(localStorage.getItem('productStock') || '{}');

        const formattedProducts = (data.products || []).map(product => ({
          id: product.id,
          title: product.title || 'Untitled Product',
          description: product.description || 'No description',
          price: product.price || 0,
          rating: product.rating || 0,
          stock: stockData[product.id] ?? product.stock ?? 0,
          thumbnail: product.thumbnail || 'https://via.placeholder.com/300',
          discountPercentage: product.discountPercentage || 0,
        }));

        const totalCount = data.total || 100;
        setTotalPages(Math.ceil(totalCount / productsPerPage));
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(Math.max(0, Math.min(newPage, totalPages - 1)));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-md mx-auto">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 relative">
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mb-4 z-20">
          <button
            onClick={() => handlePageChange(page - 1)}
            className={`p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all border border-gray-200 ${
              page === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className={`p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all border border-gray-200 ${
              page === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={page === totalPages - 1}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-5">
        {products[0] && (
          <div className="lg:col-span-2">
            <ProductCard
              product={products[0]}
              variant="showcase"
              onStockUpdate={(updatedProduct) => {
                setProducts(prev =>
                  prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
                );
                const stockData = JSON.parse(localStorage.getItem('productStock') || '{}');
                stockData[updatedProduct.id] = updatedProduct.stock;
                localStorage.setItem('productStock', JSON.stringify(stockData));
                if (onStockUpdate) onStockUpdate(updatedProduct);
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {products.slice(1, 3).map(product => (
            <ProductCard
              key={`product-${product.id}`}
              product={product}
              variant="default"
              onStockUpdate={(updatedProduct) => {
                setProducts(prev =>
                  prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
                );
                const stockData = JSON.parse(localStorage.getItem('productStock') || '{}');
                stockData[updatedProduct.id] = updatedProduct.stock;
                localStorage.setItem('productStock', JSON.stringify(stockData));
                if (onStockUpdate) onStockUpdate(updatedProduct);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
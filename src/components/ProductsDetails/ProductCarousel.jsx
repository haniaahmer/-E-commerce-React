import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_API = 'https://dummyjson.com/products?limit=100';
const CATEGORIES_API = 'https://dummyjson.com/products/categories';

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch(CATEGORIES_API),
          fetch(PRODUCTS_API),
        ]);

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        const carouselData = categoriesData.map((category) => {
          const categoryProducts = productsData.products.filter(
            (product) => product.category === category.slug
          );
          return {
            slug: category.slug,
            name: category.name,
            count: `${categoryProducts.length} items`,
            image: categoryProducts[0]?.thumbnail || 'https://via.placeholder.com/64',
          };
        });

        setCategories(carouselData);
        setVisibleCategories(carouselData.slice(0, itemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
        setCategories([]);
        setVisibleCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setVisibleCategories(
      categories.slice(
        currentIndex * itemsPerPage,
        currentIndex * itemsPerPage + itemsPerPage
      )
    );
  }, [currentIndex, itemsPerPage, categories]);

  const nextSlide = () => {
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const nextIndex = currentIndex + 1;
    if (nextIndex < totalPages) {
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    } else {
      setCurrentIndex(totalPages - 1);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!visibleCategories.length) return <div className="text-center py-8">No categories found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 relative">
      <button
        onClick={prevSlide}
        className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
      </button>

      <div className="overflow-hidden">
        <div className="flex gap-x-4 sm:gap-x-6">
          {visibleCategories.map((category) => (
            <div
              key={category.slug}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 bg-white rounded-lg border border-gray-200 p-4 sm:p-5 flex items-center space-x-4 sm:space-x-6"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/76')}
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-base sm:text-lg capitalize">
                  {category.name}
                </h3>
                <p className="text-sm sm:text-base text-blue-600">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default ProductCarousel;
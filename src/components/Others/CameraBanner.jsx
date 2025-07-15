import React, { useState, useEffect } from 'react';
import cam from '../../assets/cam.png'; 

export function CameraBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      title: "Canon\ncamera",
      price: "$89",
      image: cam, // Canon camera with transparent bg
      alt: "Canon Camera"
    },
    {
      title: "Gaming\nlaptop",
      price: "$799",
      image:"https://www.freepnglogos.com/uploads/laptop-png/laptop-transparent-png-pictures-icons-and-png-40.png",
      alt: "Gaming Laptop"
    },
    {
      title: "Wireless\nheadphones",
      price: "$149",
      image:"https://png.pngtree.com/png-vector/20250124/ourmid/pngtree-a-red-headphone-png-image_15320037.png", 
      alt: "Wireless Headphones"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 50000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[currentSlide];

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left side - Text content */}
        <div className="flex-1 md:pr-8 order-2 md:order-1">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-950  mb-6 whitespace-pre-line">
            {currentProduct.title}
          </h1>
          
          {/* Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="bg-[#EDA415] hover:bg-orange-500 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 shadow-md">
              Shop now
            </button>
            <button className="bg-transparent border-2 border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-colors duration-300">
              View more
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === currentSlide ? 'bg-[#EDA415]' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Right side - Product image */}
        <div className="flex-1 order-1 md:order-2 mb-6 md:mb-0 relative">
          <div className="relative">
            {/* Product image with transparent background */}
            <img 
              src={currentProduct.image}
              alt={currentProduct.alt}
              className="w-full h-auto max-w-xs mx-auto transition-opacity duration-500"
              key={currentSlide}
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
            
            {/* Circular price badge */}
            <div className="absolute -bottom-4 -right-0 bg-[#EDA415] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center font-bold shadow-lg">
              <span className="text-xs">only</span>
              <span className="text-lg">{currentProduct.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraBanner;
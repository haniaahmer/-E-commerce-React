import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Savannah Nguyen",
    image: "https://images.unsplash.com/photo-1677005142678-d141a1eabbe9?w=150&h=150&fit=crop&crop=faces&auto=format",
    text: "Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus bibendum ullamcorper. Phasellus tristique aenean at lorem sed scelerisque."
  },
  {
    name: "Esther Howard",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus bibendum ullamcorper. Phasellus tristique aenean at lorem sed scelerisque."
  },
  {
    name: "Tom Wilson",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus bibendum ullamcorper. Phasellus tristique aenean at lorem sed scelerisque."
  },
  {
    name: "John Smith",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus bibendum ullamcorper. Phasellus tristique aenean at lorem sed scelerisque."
  },
  {
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    text: "Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus bibendum ullamcorper. Phasellus tristique aenean at lorem sed scelerisque."
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const slideIndexWrap = (index) => {
    if (index < 0) return totalSlides - 1;
    if (index >= totalSlides) return 0;
    return index;
  };

  const nextTestimonial = () => {
    if (itemsPerView === 1) {
      setCurrentIndex((prev) => slideIndexWrap(prev + 1));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  const prevTestimonial = () => {
    if (itemsPerView === 1) {
      setCurrentIndex((prev) => slideIndexWrap(prev - 1));
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index) => {
    if (itemsPerView === 1) {
      setCurrentIndex(slideIndexWrap(index));
    } else {
      setCurrentIndex(Math.min(index, maxIndex));
    }
  };

  const getVisibleTestimonials = () => {
    if (itemsPerView === 1) {
      return [testimonials[currentIndex]];
    }
    const start = currentIndex * itemsPerView;
    return testimonials.slice(start, start + itemsPerView);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header with title and arrows */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-sky-950">Testimonials</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevTestimonial}
            disabled={itemsPerView !== 1 && currentIndex === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            disabled={itemsPerView !== 1 && currentIndex >= maxIndex}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        <div
          className={`flex ${
            itemsPerView === 1 ? 'flex-col' : 'md:flex-row'
          } transition-transform duration-300 ease-in-out space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-8`}
          style={
            itemsPerView === 1
              ? {}
              : {
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  width: `${testimonials.length * (100 / itemsPerView)}%`,
                }
          }
        >
          {(itemsPerView === 1 ? getVisibleTestimonials() : testimonials).map((testimonial, index) => (
            <div
              key={index}
              className={`w-full ${itemsPerView !== 1 ? 'md:flex-1' : ''} bg-white hover:bg-gray-50 transition-colors duration-200 border border-gray-200 rounded-lg overflow-hidden flex flex-col`}
              style={itemsPerView !== 1 ? { width: `${100 / itemsPerView}%` } : {}}
            >
              <div className="w-full p-4 md:p-6 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-amber-500 p-1">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-sky-900 font-medium text-base md:text-lg font-['Poppins']">
                    {testimonial.name}
                  </h3>
                </div>
                <div className="bg-sky-100 rounded-2xl p-3 md:p-4">
                  <p className="text-sky-900 text-sm leading-relaxed font-['Poppins']">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
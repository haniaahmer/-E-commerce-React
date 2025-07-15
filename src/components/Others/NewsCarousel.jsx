import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER_IMAGE = (id) => `https://via.placeholder.com/400x300?text=News+${id}`;

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const newsArticles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      date: 'July 1, 2025',
      title: 'Breaking News: Local Economy Surges',
      excerpt:
        'The local economy has shown unprecedented growth in the second quarter, exceeding all expert predictions. Analysts attribute this surge to increased consumer confidence and robust industrial output.',
      author: 'By John Doe',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop',
      date: 'June 28, 2025',
      title: 'New Study Reveals Health Benefits of Daily Exercise',
      excerpt:
        'A groundbreaking study published today highlights the significant long-term health benefits associated with even moderate daily exercise. Researchers recommend at least 30 minutes of activity.',
      author: 'By Jane Smith',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      date: 'June 25, 2025',
      title: 'Tech Innovations Transforming Education',
      excerpt:
        'Innovative technologies are rapidly reshaping the educational landscape, offering personalized learning experiences and making knowledge more accessible than ever before. This marks a new era.',
      author: 'By Alex Johnson',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      date: 'June 20, 2025',
      title: 'Global Leaders Discuss Climate Change Solutions',
      excerpt:
        'World leaders convened at the annual summit to address urgent climate change issues, proposing new policies and international collaborations aimed at reducing carbon emissions and promoting sustainability.',
      author: 'By Maria Garcia',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=400&h=300&fit=crop',
      date: 'June 15, 2025',
      title: 'Art Exhibition Draws Record Crowds',
      excerpt:
        "The city's annual art exhibition has shattered attendance records, showcasing a diverse collection of contemporary and classical works. Visitors praised the curatorial selection and interactive displays.",
      author: 'By David Lee',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
      date: 'June 10, 2025',
      title: 'Future of Remote Work Explored in New Report',
      excerpt:
        'A comprehensive report examines the evolving trends and challenges of remote work, predicting a hybrid model will become the norm for many industries post-pandemic. Flexibility and technology are key.',
      author: 'By Sarah Chen',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
      date: 'June 10, 2025',
      title: 'Future of Remote Work Explored in New Report',
      excerpt:
        'A comprehensive report examines the evolving trends and challenges of remote work, predicting a hybrid model will become the norm for many industries post-pandemic. Flexibility and technology are key.',
      author: 'By Sarah Chen',
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=400&h=300&fit=crop',
      date: 'June 15, 2025',
      title: 'Art Exhibition Draws Record Crowds',
      excerpt:
        "The city's annual art exhibition has shattered attendance records, showcasing a diverse collection of contemporary and classical works. Visitors praised the curatorial selection and interactive displays.",
      author: 'By David Lee',
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      date: 'June 20, 2025',
      title: 'Global Leaders Discuss Climate Change Solutions',
      excerpt:
        'World leaders convened at the annual summit to address urgent climate change issues, proposing new policies and international collaborations aimed at reducing carbon emissions and promoting sustainability.',
      author: 'By Maria Garcia',
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=400&h=300&fit=crop',
      date: 'June 15, 2025',
      title: 'Art Exhibition Draws Record Crowds',
      excerpt:
        "The city's annual art exhibition has shattered attendance records, showcasing a diverse collection of contemporary and classical works. Visitors praised the curatorial selection and interactive displays.",
      author: 'By David Lee',
    },
  ];

  const totalSlides = Math.ceil(newsArticles.length / itemsPerPage);

  const getVisibleArticles = () => {
    const start = currentSlide * itemsPerPage;
    return newsArticles.slice(start, start + itemsPerPage);
  };

  const slideIndexWrap = (index) => {
    if (index < 0) return totalSlides - 1;
    if (index >= totalSlides) return 0;
    return index;
  };

  const goToPrevSlide = () => setCurrentSlide((prev) => slideIndexWrap(prev - 1));
  const goToNextSlide = () => setCurrentSlide((prev) => slideIndexWrap(prev + 1));
  const goToSlide = (index) => setCurrentSlide(slideIndexWrap(index));

  const handleImageError = (e, id) => {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMAGE(id);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-sky-950">Latest News</h2>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={goToNextSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-8">
          {getVisibleArticles().map((article) => (
            <div
              key={article.id}
              className="w-full md:flex-1 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
                  onError={(e) => handleImageError(e, article.id)}
                />
              </div>
              <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-sm text-sky-950 border border-gray-500 rounded-full p-1">
                    {article.date}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 mb-2 text-gray-900">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                </div>
                <span className="text-sm text-gray-500">{article.author}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
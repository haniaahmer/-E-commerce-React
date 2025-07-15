import { useState, useEffect } from 'react';

const useProductDetails = (id) => {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);

        const relatedResponse = await fetch(
          `https://dummyjson.com/products/category/${data.category}?limit=4`
        );
        const relatedData = await relatedResponse.json();
        setRelated(relatedData.products.filter(p => p.id !== Number(id)));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, related, loading };
};

export default useProductDetails;
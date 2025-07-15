

// ---------- CART ----------
export const saveCartToLocalStorage = (cartState) => {
  try {
    // Ensure cartState.items is an array before saving
    const items = Array.isArray(cartState.items) ? cartState.items : [];
    localStorage.setItem('cartItems', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('cartItems');
    // Check if data is valid JSON and not "undefined"
    if (!data || data === 'undefined') {
      return { items: [] };
    }
    const parsed = JSON.parse(data);
    return { items: Array.isArray(parsed ? parsed : []) };
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return { items: [] };
  }
};

// ... rest of the file (wishlist functions) remains unchanged ...
// ---------- WISHLIST ----------
// ---------- WISHLIST ----------
export const saveWishlistToLocalStorage = (wishlistState) => {
  try {
    // Ensure wishlistState.items is an array before saving
    const items = Array.isArray(wishlistState.items) ? wishlistState.items : [];
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save wishlist to localStorage:', error);
  }
};

export const loadWishlistFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('wishlist');
    // Check if data is valid JSON and not "undefined"
    if (!data || data === 'undefined') {
      return [];
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load wishlist from localStorage:', error);
    return [];
  }
};



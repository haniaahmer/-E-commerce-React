import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItemRow from './CartItemRow';
import CartActions from './CartActions';
import CartSummary from './CartSummary';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  setCart,
} from '../../store/cartSlice';
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from '../../utils/localStorage';

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [couponCode, setCouponCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [total, setTotal] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Update total when subtotal changes
  useEffect(() => {
    setTotal(subtotal); // Reset total to subtotal when cart changes
  }, [subtotal]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = loadCartFromLocalStorage();
    if (storedCart.length > 0) {
      dispatch(setCart(storedCart));
    }
  }, [dispatch]);

  // Save to localStorage on update
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  // Handlers
  const handleQuantityChange = useCallback((id, quantity) => {
    const clamped = Math.max(1, quantity);
    dispatch(updateQuantity({ id, quantity: clamped }));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleApplyCoupon = useCallback(({ code, discount, newTotal }) => {
    setCouponCode(code);
    setTotal(newTotal);
    if (discount > 0) {
      alert(`Coupon applied! ${discount}% discount.`);
    } else {
      alert('Invalid coupon code');
    }
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left side - Cart items */}
        <div className="flex-1">
          {/* Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 py-2 sm:py-4 px-2 sm:px-4 bg-gray-100 text-xs xs:text-sm sm:text-base font-medium text-gray-700 rounded-t-lg">
  <span className="sm:col-span-1">Product</span>
  <span className="hidden sm:block text-center">Price</span>
  <span className="hidden sm:block text-center">Quantity</span>
  <span className="hidden sm:block text-center">Subtotal</span>
</div>


          {/* Cart items */}
          <div className="overflow-x-auto">
            <div className="bg-white border border-gray-200 rounded-b-lg">
              {cartItems.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm sm:text-base">Your cart is empty</div>
              ) : (
                cartItems.map((item, index) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    isLast={index === cartItems.length - 1}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))
              )}
            </div>
          </div>

          {/* Action buttons */}
          <CartActions onClear={handleClearCart} />
        </div>

        {/* Right side - Cart Summary */}
        <CartSummary
          subtotal={subtotal}
          total={total}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
          onApplyCoupon={handleApplyCoupon}
        />
      </div>
    </div>
  );
};

export default CartItems;
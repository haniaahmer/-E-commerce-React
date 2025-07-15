import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import InputField from './InputField';
import { useFormLocalStorage } from '../hooks/useFormLocalStorage';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, setCart } from '../store/cartSlice';
import { saveCartToLocalStorage } from '../utils/localStorage';

const LOCAL_STORAGE_KEY = 'checkoutFormData';

const INITIAL_FORM = {
  name: '', email: '', address: '', city: '', state: '', zip: '',
  cardNumber: '', expiry: '', cvv: '',
};

const REQUIRED_FIELDS = ['name', 'email', 'address', 'city', 'state', 'zip', 'cardNumber', 'expiry', 'cvv'];

const CheckoutForm = () => {
  const [formData, setFormData, resetForm] = useFormLocalStorage(LOCAL_STORAGE_KEY, INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Get total and product data from navigation state (for Buy It Now) or cart
  const buyItNowProduct = state?.buyItNowProduct;
  const total = buyItNowProduct
    ? state?.total || 0
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // If coming from Buy It Now, update cart with the single product
  useEffect(() => {
    if (buyItNowProduct) {
      dispatch(setCart([buyItNowProduct]));
      saveCartToLocalStorage([buyItNowProduct]);
    }
  }, [buyItNowProduct, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    REQUIRED_FIELDS.forEach((field) => {
      if (!formData[field]) newErrors[field] = 'Required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Clear cart in Redux store and localStorage
    dispatch(clearCart());
    saveCartToLocalStorage([]);

    // Navigate with form data and total
    navigate('/OrderConfirmation', { state: { orderData: formData, total } });
  };

  useEffect(() => {
    return () => {
      // This will run when component unmounts
      // resetForm(); // Uncomment if you want to clear form when leaving the page
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Lock className="w-5 h-5" /> Checkout
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
          <InputField label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
        </div>
        <InputField label="ZIP Code" name="zip" value={formData.zip} onChange={handleChange} error={errors.zip} />

        <hr className="my-4" />
        <h2 className="text-lg font-semibold">Payment Info</h2>
        <InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} error={errors.cardNumber} />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Expiry" name="expiry" value={formData.expiry} onChange={handleChange} error={errors.expiry} />
          <InputField label="CVV" name="cvv" value={formData.cvv} onChange={handleChange} error={errors.cvv} />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
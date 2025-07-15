import React from 'react';

const CartItemRow = ({ item, isLast, onQuantityChange, onRemove }) => (
  <div
    className={`relative grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-center p-2 sm:p-4 ${
      !isLast ? 'border-b border-gray-200' : ''
    }`}
  >
    {/* ❌ Mobile Remove Button - Top Right */}
    <button
      className="absolute top-2 right-2 sm:hidden text-red-500 hover:text-red-700 z-10"
      onClick={() => onRemove(item.id)}
      aria-label="Remove item"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    {/* Product Info */}
    <div className="flex items-start gap-3 sm:gap-4 col-span-1 pr-10 sm:pr-0">
      <img
        src={item.image || 'https://via.placeholder.com/80'}
        alt={item.title}
        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded border"
      />
      <div className="flex flex-col max-w-[calc(100%-3.5rem)] sm:max-w-full">
        <p className="text-blue-600 font-medium text-sm sm:text-sm">{item.title}</p>
        <p className="text-xs text-gray-600">Color: {item.color}</p>
        <p className="text-xs text-gray-600">Size: {item.size}</p>
        <p className="text-xs text-gray-500 mt-1 sm:hidden">Price: ${item.price.toFixed(2).replace('.', ',')}</p>
      </div>
    </div>

    {/* Desktop Price */}
    <div className="hidden sm:block text-center font-medium text-sm sm:text-base">
      ${item.price.toFixed(2).replace('.', ',')}
    </div>

    {/* Quantity Controls */}
    <div className="flex items-center justify-start sm:justify-center mt-1 sm:mt-0">
      <button
        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded-l border border-gray-300 text-xs sm:text-base"
        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
      >
        -
      </button>
      <span className="w-8 h-7 sm:w-12 sm:h-8 flex items-center justify-center border-y border-gray-300 bg-white text-xs sm:text-base">
        {item.quantity}
      </span>
      <button
        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded-r border border-gray-300 text-xs sm:text-base"
        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
      >
        +
      </button>
    </div>

    {/* Subtotal + Desktop Remove Button */}
    <div className="hidden sm:flex items-center justify-center gap-30">
      <p className="font-medium text-sm sm:text-base">
        ${(item.price * item.quantity).toFixed(2).replace('.', ',')}
      </p>
      <button
        className="text-red-500 hover:text-red-700 text-sm"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default CartItemRow;
import React from 'react';

const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '', error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;

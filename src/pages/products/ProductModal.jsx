import React from 'react';

const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button 
          type='button'
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 text-gray-800 transition-colors shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {/* Upper Section: Image */}
        <div className="h-64 sm:h-80 bg-white w-full relative border-b border-gray-100 flex-shrink-0 flex items-center justify-center p-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-xl"
          />
        </div>

        {/* Lower Section */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">{product.name} - Details</h2>
          <ul className="space-y-4">
            {product.features.map((feature, idx) => (
              <li key={idx+"idx"} className="flex items-start">
                <span className="text-[#d82b2b] mr-3 mt-0.5 font-bold text-lg">✔</span>
                <p className="text-gray-700 leading-relaxed">
                  <strong>{feature.title}:</strong> {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

import React, { useState } from 'react';
import { services } from '../../../constants/services';
import { PRODUCTS } from '../../../constants/products';

const ItemCard = ({ item, type }) => {
  const isService = type === 'service';
  const title = isService ? item.title : item.name;
  const description = isService 
    ? (item.description || "Description not available.") 
    : (item.features && item.features[0] ? item.features[0].description : "Premium quality product for your walls.");
  const imageWrapperClass = isService 
    ? "h-80 w-full bg-gray-100 overflow-hidden" 
    : "h-64 w-full p-4 flex items-center justify-center bg-gray-50 overflow-hidden";
  const imageClass = isService 
    ? "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
    : "h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer h-full">
      {/* Base View */}
      <div className={imageWrapperClass}>
        {item.image ? (
          <img src={item.image} alt={title} className={imageClass} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 pr-2">{title}</h3>
          {!isService && item.category && (
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded whitespace-nowrap">
              {item.category}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-red-50 text-red-600 rounded-full">
            Active
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 transition-colors">
            View details
            <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      {/* Hover Overlay (Slides from Right to Left) */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col transition-transform duration-500 ease-in-out z-10 border border-gray-200 translate-x-full group-hover:translate-x-0">
        <div className="flex flex-col h-full items-center text-center">
          <div className="flex-1 flex flex-col justify-center items-center w-full overflow-y-auto">
            <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-3 leading-snug">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          {!isService && (
            <button className="w-full py-2.5 border border-red-600 text-red-600 font-bold text-sm uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors duration-300 mt-4 shrink-0 rounded-md">
              Edit Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ServicesAndProducts = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    keyFeatures: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]) {
       setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting new product:", formData);
    // In a real app, you would send this to your API
    setIsModalOpen(false);
    // Reset form
    setFormData({ productName: '', description: '', keyFeatures: '', image: null });
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services & Products</h1>
          <p className="text-gray-600">View and manage all your active services and products showcased on the landing page.</p>
        </div>
        {activeTab === 'products' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors shadow-sm"
          >
            + Add New Product
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('services')}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'services'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Services ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Products ({PRODUCTS.length})
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'services' && services.map((service) => (
            <ItemCard 
              key={service.id}
              item={service} 
              type="service" 
            />
          ))}
          {activeTab === 'products' && PRODUCTS.map((product) => (
            <ItemCard 
              key={product.id}
              item={product} 
              type="product" 
            />
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="productName"
                    required 
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="e.g. WallX Pro Texture"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea 
                    name="description"
                    required 
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Brief description of the product..."
                  ></textarea>
                </div>

                {/* Key Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Features <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="keyFeatures"
                    required 
                    value={formData.keyFeatures}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Comma separated (e.g. Water Resistant, Long Lasting)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple features with commas.</p>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-400 transition-colors bg-gray-50">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 px-1">
                          <span>Upload a file</span>
                          <input type="file" name="image" className="sr-only" onChange={handleFileChange} accept="image/*" />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesAndProducts;

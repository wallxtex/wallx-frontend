import { useState, useEffect, useCallback } from 'react';
import { services } from '../../../constants/services';
import { addProducts, getAllProducts, deleteProduct, editProduct, addServices, getAllServices, editServices, deleteServices } from '../../../services/admin/admin.services';

const ItemCard = ({ item, type, onDelete, onEdit }) => {
  const [isActive, setIsActive] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!item) return null;
  
  const isService = type === 'service';
  const title = item.title || item.name || item.productName || item.serviceName || "Untitled";
  const description = item.description || (item.features && item.features[0] ? item.features[0].description : "Description not available.");
  const imageWrapperClass = isService 
    ? "h-80 w-full bg-gray-100 overflow-hidden" 
    : "h-64 w-full p-4 flex items-center justify-center bg-gray-50 overflow-hidden";
  const imageClass = isService 
    ? "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
    : "h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105";

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer h-full"
      onClick={() => setIsActive(!isActive)}
    >
      {/* Base View */}
      <div className={imageWrapperClass}>
        {item.image || item.imageUrl ? (
          <img src={item.image || item.imageUrl} alt={title} className={imageClass} />
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
      <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col transition-transform duration-500 ease-in-out z-10 border border-gray-200 translate-x-full ${isActive ? 'translate-x-0' : 'group-hover:translate-x-0'}`}>
        <div className="flex flex-col h-full items-center text-center">
          <div className="flex-1 flex flex-col justify-center items-center w-full overflow-y-auto">
            <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-3 leading-snug">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="w-full flex flex-col gap-2 mt-4 shrink-0">
            {showDeleteConfirm ? (
              <>
                <p className="text-xs font-semibold text-gray-700 mb-1">Confirm delete?</p>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
                    className="flex-1 py-2 border border-gray-300 text-gray-700 font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 rounded-md"
                  >
                    No
                  </button>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (onDelete && (item._id || item.id)) {
                        onDelete(item._id || item.id);
                      }
                      setShowDeleteConfirm(false);
                    }}
                    className="flex-1 py-2 bg-red-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-colors duration-300 rounded-md shadow-sm"
                  >
                    Yes
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3 w-full">
                <button 
                  onClick={(e) => { e.stopPropagation(); if (onEdit) onEdit(item); }}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 rounded-md"
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setShowDeleteConfirm(true);
                  }}
                  className="flex-1 py-2.5 bg-red-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-colors duration-300 rounded-md shadow-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const buildPayload = (isServiceMode, formData) => {
  const payload = new FormData();
  if (isServiceMode) {
    payload.append('serviceName', formData.productName);
    payload.append('description', formData.description);
  } else {
    payload.append('productName', formData.productName);
    payload.append('description', formData.description);
    payload.append('keyFeatures', formData.keyFeatures);
  }
  if (formData.image) {
    payload.append('image', formData.image);
  }
  return payload;
};

const saveItemData = async (isServiceMode, editingItem, payload) => {
  if (editingItem) {
    const id = editingItem._id || editingItem.id;
    return isServiceMode ? await editServices(id, payload) : await editProduct(id, payload);
  }
  return isServiceMode ? await addServices(payload) : await addProducts(payload);
};

const renderItems = (items, type, isLoading, fallback, onDelete, onEdit) => {
  if (isLoading) return <div className="col-span-full py-12 text-center text-gray-500">Loading {type}s...</div>;
  const list = items.length > 0 ? items : fallback;
  if (list.length === 0) return <div className="col-span-full py-12 text-center text-gray-500">No {type}s found. Add a new {type} to see it here.</div>;
  
  return list.map((item, index) => (
    <ItemCard 
      key={item._id || item.id || index}
      item={item} 
      type={type} 
      onDelete={(id) => onDelete(id, type)}
      onEdit={(item) => onEdit(item, type)}
    />
  ));
};

const ServicesAndProducts = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ productName: '', description: '', keyFeatures: '', image: null });
  };

  const fetchServicesData = useCallback(async () => {
    try {
      const response = await getAllServices();
      if (response && response.success) {
        let fetchedData = response.data;
        if (fetchedData?.data) fetchedData = fetchedData.data;
        if (fetchedData?.services) fetchedData = fetchedData.services;
        setServicesList(Array.isArray(fetchedData) ? fetchedData : []);
      }
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllProducts();
      if (response && response.success) {
        let fetchedData = response.data;
        if (fetchedData?.data) fetchedData = fetchedData.data;
        if (fetchedData?.products) fetchedData = fetchedData.products;

        setProductsList(Array.isArray(fetchedData) ? fetchedData : []);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchServicesData();
  }, [fetchProducts, fetchServicesData]);

  const handleDeleteItem = async (id, type) => {
    try {
      let response;
      if (type === 'service') {
        response = await deleteServices(id);
      } else {
        response = await deleteProduct(id);
      }
      
      if (response && response.success !== false) {
        if (type === 'service') fetchServicesData();
        else fetchProducts();
      } else {
        console.error(`Failed to delete ${type}`, response);
      }
    } catch (error) {
      console.error(`Error deleting ${type}`, error);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    keyFeatures: '',
    image: null
  });

  const handleEditClick = (item, type) => {
    setEditingItem({ ...item, type });
    setFormData({
      productName: item.serviceName || item.productName || item.name || item.title || '',
      description: item.description || '',
      keyFeatures: item.keyFeatures || (item.features && item.features[0] ? item.features[0].description : ''),
      image: null
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]) {
       setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isServiceMode = editingItem ? editingItem.type === 'service' : activeTab === 'services';
    const payload = buildPayload(isServiceMode, formData);
    const response = await saveItemData(isServiceMode, editingItem, payload);
    
    if (response && response.success !== false) {
      closeModal();
      if (isServiceMode) fetchServicesData();
      else fetchProducts();
    }
  };

  const isServiceMode = editingItem ? editingItem.type === 'service' : activeTab === 'services';
  const typeName = isServiceMode ? 'Service' : 'Product';

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services & Products</h1>
          <p className="text-gray-600">View and manage all your active services and products showcased on the landing page.</p>
        </div>
        <button
          onClick={() => { closeModal(); setIsModalOpen(true); }}
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors shadow-sm"
        >
          + Add New {activeTab === 'services' ? 'Service' : 'Product'}
        </button>
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
          Services ({servicesList.length > 0 ? servicesList.length : services.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Products ({productsList.length})
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'services' 
            ? renderItems(servicesList, 'service', isLoading, services, handleDeleteItem, handleEditClick)
            : renderItems(productsList, 'product', isLoading, [], handleDeleteItem, handleEditClick)}
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">{editingItem ? `Edit ${typeName}` : `Add New ${typeName}`}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{typeName} Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="productName"
                    required 
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder={`e.g. WallX Pro ${isServiceMode ? 'Service' : 'Texture'}`}
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
                    placeholder={`Brief description of the ${typeName.toLowerCase()}...`}
                  ></textarea>
                </div>

                {/* Key Features */}
                {!isServiceMode && (
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
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{typeName} Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-400 transition-colors bg-gray-50">
                    {formData.image ? (
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none px-1">
                            <span>Change image</span>
                            <input type="file" name="image" className="sr-only" onChange={handleFileChange} accept="image/*" />
                          </label>
                        </div>
                        <p className="text-xs text-green-600 font-medium truncate max-w-[200px] mx-auto">
                          {typeof formData.image === 'object' && formData.image.name ? formData.image.name : 'Image selected'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none px-1">
                            <span>Upload a file</span>
                            <input type="file" name="image" className="sr-only" onChange={handleFileChange} accept="image/*" />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
                >
                  {editingItem ? 'Update' : 'Save'} {typeName}
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

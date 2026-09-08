import React, { useState } from 'react';
import { IoShieldCheckmarkOutline, IoLeafOutline, IoColorPaletteOutline } from 'react-icons/io5';
import wallxImage from '../../assets/webp/wallx-removebg-preview.webp';
import ProductModal from './ProductModal';
import FooterSection from '../../components/landing-pages/FooterSection';

// --- Product Data Array ---
const PRODUCTS = [
  {
    id: 1,
    name: "WallX Exterior & Interior Textures",
    category: "Textures",
    weight: "25kg",
    price: "500",
    image: wallxImage, // Placeholder for all for now
    quickFeatures: [
      { icon: "💧", label: "Water Resistance" },
      { icon: "🔗", label: "Excellent Bonding" },
      { icon: "⏳", label: "Long Lasting" },
      { icon: "🛡️", label: "Anti-Fungal" },
    ],
    features: [
      { title: "Water Resistance", description: "Specially formulated with advanced rusting materials to provide exceptional wall water restriction, preventing dampness." },
      { title: "Excellent Bonding", description: "Superior adhesion ensures the texture bonds perfectly with the wall surface for long-lasting durability." },
      { title: "Long Lasting Performance", description: "High-quality composition crafted to withstand tough environmental conditions and maintain aesthetics." },
      { title: "Anti-Fungal Properties", description: "Actively resists mold, algae, and fungal growth to keep the walls hygienic and clean." },
      { title: "Excellent Coverage", description: "Economical 25kg packaging offers extensive spreadability, minimizing the overall material requirement." },
    ]
  },
  {
    id: 2,
    name: "WallX Interior Emulsion (Luxury)",
    category: "Interior",
    weight: "20 L",
    price: "4500",
    image: wallxImage,
    quickFeatures: [
      { icon: "✨", label: "Rich Finish" },
      { icon: "🧼", label: "Washable" },
      { icon: "🌱", label: "Low VOC" },
      { icon: "🛡️", label: "Anti-Fungal" },
    ],
    features: [
      { title: "Rich Finish", description: "Provides a luxurious, smooth, and rich finish that elevates your interior spaces." },
      { title: "Washable", description: "Highly washable surface making it easy to wipe off everyday stains." },
      { title: "Low VOC", description: "Eco-friendly formulation ensuring a safe, low-odor environment during and after painting." },
      { title: "Anti-Fungal Properties", description: "Keeps walls safe from harmful microbes and fungal growth." },
    ]
  },
  {
    id: 3,
    name: "WallX Weather Shield (Exterior)",
    category: "Exterior",
    weight: "20 L",
    price: "5200",
    image: wallxImage,
    quickFeatures: [
      { icon: "☀️", label: "UV Protection" },
      { icon: "💧", label: "Water Proof" },
      { icon: "🌬️", label: "Dust Repellent" },
      { icon: "⏳", label: "10 Yrs Warranty" },
    ],
    features: [
      { title: "UV Protection", description: "Prevents fading and chalking caused by harsh sunlight, keeping colors vibrant." },
      { title: "Water Proof", description: "Forms a tough elastomeric film that prevents water ingress during heavy monsoons." },
      { title: "Dust Repellent", description: "Advanced anti-dust technology ensures walls stay cleaner for longer." },
      { title: "10 Years Warranty", description: "Backed by our 10-year performance warranty for absolute peace of mind." },
    ]
  },
  {
    id: 4,
    name: "WallX Pro Smooth Primer",
    category: "Undercoats",
    weight: "10 L",
    price: "1200",
    image: wallxImage,
    quickFeatures: [
      { icon: "🔗", label: "Strong Adhesion" },
      { icon: "⚪", label: "High Opacity" },
      { icon: "⏳", label: "Quick Dry" },
      { icon: "🛡️", label: "Alkali Resistant" },
    ],
    features: [
      { title: "Strong Adhesion", description: "Provides an excellent foundation for topcoats to bind strongly to the surface." },
      { title: "High Opacity", description: "Exceptional hiding power that requires fewer coats for the perfect finish." },
      { title: "Quick Dry", description: "Fast-drying formula helps in completing projects faster." },
      { title: "Alkali Resistant", description: "Protects the topcoat from alkali attack, commonly found in fresh plaster." },
    ]
  }
];

const CATEGORIES = ["All", "Interior", "Exterior", "Textures", "Undercoats"];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 relative overflow-hidden border-b border-gray-100">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#d82b2b] opacity-10 blur-3xl"></div>
        <div className="max-w-6xl w-11/12 mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="text-[#d82b2b] font-bold tracking-widest uppercase text-sm mb-4">Premium Collection</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Discover the WallX Collection
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Elevate your spaces with our luxury paints and textures. Engineered for exceptional durability, unparalleled coverage, and a flawless finish.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl w-11/12 mx-auto py-16">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                activeCategory === category 
                  ? 'bg-[#d82b2b] text-white shadow-[#d82b2b]/30' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredProducts.map(product => (
            <div key={product.id} className="group relative bg-white border border-gray-100 overflow-hidden shadow-sm transition-shadow duration-300 w-full max-w-sm h-[26rem] flex flex-col items-center justify-center p-8">
              
              {/* Base View */}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-72 h-72 object-contain mb-6 drop-shadow-md group-hover:scale-95 transition-transform duration-700"
              />
              <h2 className="text-lg font-semibold text-gray-800 text-center px-4">{product.name}</h2>
              
              {/* Hover Overlay (Slides from Right to Left) */}
              <div className="absolute inset-0 bg-white/98 backdrop-blur-md p-8 flex flex-col translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-10 border border-gray-200">
                <div className="flex flex-col h-full items-center text-center justify-center">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 leading-snug">{product.name}</h3>
                  
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed px-2 line-clamp-3">
                    {product.features[0]?.description || "Premium quality finish for your walls."}
                  </p>
                  
                  <div className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">Key Features</div>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-600 mb-8">
                    {product.quickFeatures.slice(0, 3).map((qf, i) => (
                      <span key={i}>- {qf.label}</span>
                    ))}
                  </div>
                  
                  <div className="font-bold text-gray-900 text-xl mb-8 mt-auto">
                    MRP ₹{product.price} 
                    <span className="text-xs font-normal text-gray-500 block mt-1">(Inclusive of all taxes) per {product.weight}</span>
                  </div>
                  
                  <button 
                    onClick={() => openModal(product)}
                    className="w-full py-3 border border-[#d82b2b] text-[#d82b2b] font-bold text-sm uppercase tracking-wider hover:bg-[#d82b2b] hover:text-white transition-colors duration-300"
                  >
                    View Product
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-500">No products found in this category.</h3>
          </div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl w-11/12 mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Why Choose WallX?</h2>
            <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">Our products are scientifically formulated to deliver the perfect balance of aesthetics and long-lasting protection.</p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <IoShieldCheckmarkOutline className="text-2xl text-[#d82b2b]" />,
                title: "Unmatched Durability",
                description: "Advanced polymers and rusting materials provide extreme resistance against weather, water, and wear."
              },
              {
                icon: <IoLeafOutline className="text-2xl text-emerald-600" />,
                title: "Eco-Friendly & Safe",
                description: "Low VOC, lead-free formulations with robust anti-fungal properties ensure a safe environment for your family."
              },
              {
                icon: <IoColorPaletteOutline className="text-2xl text-blue-600" />,
                title: "Vibrant Shades",
                description: "Superior color retention and high opacity guarantee a flawless finish that stays brighter for longer."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gray-50/70 border border-gray-200/80 hover:border-red-200 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-[#d82b2b] transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default ProductsPage;

import wallxImage from '../assets/webp/wallx-removebg-preview.webp';
import wallBucketImage from '../assets/webp/wall-bucket.webp';

export const PRODUCTS = [
  {
    id: 1,
    name: "WallX Exterior & Interior Textures",
    category: "Textures",
    weight: "25kg",
    price: "500",
    image: wallxImage,
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
    image: wallBucketImage,
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
